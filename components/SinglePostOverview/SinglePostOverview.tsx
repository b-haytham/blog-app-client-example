import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import {
    Like,
    Post,
    User,
    Comment,
    useDeletePostMutation,
} from "../../generated/graphql";

interface Props {
    info:
        | ({ __typename?: "Post" } & Pick<
              Post,
              | "id"
              | "title"
              | "description"
              | "content"
              | "creatorId"
              | "thumbnail"
              | "tags"
              | "published"
              | "created_at"
              | "updated_at"
          > & {
                  creator: { __typename?: "User" } & Pick<
                      User,
                      "id" | "username" | "avatar"
                  >;
                  comments: Array<
                      { __typename?: "Comment" } & Pick<
                          Comment,
                          "id" | "content" | "creatorId"
                      >
                  >;
                  likes: Array<
                      { __typename?: "Like" } & Pick<Like, "id" | "creatorId">
                  >;
              } & { kind: "private" | "public" })
        | (({ __typename?: "Post" } & Pick<
              Post,
              | "id"
              | "title"
              | "thumbnail"
              | "tags"
              | "description"
              | "created_at"
          > & {
                  comments: Array<
                      { __typename?: "Comment" } & Pick<Comment, "id">
                  >;
                  likes: Array<{ __typename?: "Like" } & Pick<Like, "id">>;
              }) & {
              username: string;
              avatar: string | null | undefined;
              kind: "user";
          });
    //kind: "private" | "public"
}

const useStyles = makeStyles({
    root: {
        boxShadow: "3px 3px 3px 3px rgba(33,166,10,0.4)",
    },
    container: {
        width: "400px",
        margin: "15px",

        transition: "all 0.3s",
        "&:hover": {
            transform: "scale(1.1)",
        },
        minHeight: "410px",
    },
    media: {
        height: "200px",
    },
    button: {
        color: "#21a60a",
    },
    buttonEdit: {
        color: "#0aa19c",
    },
    buttonDelete: {
        color: "#d91009",
    },
    focusHighlight: {
        color: '#21a60a'
    }
});

const SinglePostOverview: React.FC<Props> = ({ info /*kind*/ }) => {
    const classes = useStyles();
    const router = useRouter();
    console.log(info);

    const [deletePost] = useDeletePostMutation();

    return (
        <Card elevation={3} className={classes.container}>
            <CardActionArea
                className={classes.focusHighlight}
                onClick={() =>
                    router.push(
                        "/[user]",
                        `/${
                            info.kind !== "user"
                                ? info.creator.username
                                : info.username
                        }`
                    )
                }
            >
                <CardHeader
                    avatar={
                        <Avatar
                            src={
                                (info.kind !== "user"
                                    ? info.creator.avatar
                                    : info.avatar) || "/logo.png"
                            }
                        />
                    }
                    title={`${
                        info.kind !== "user"
                            ? info.creator.username
                            : info.username
                    }`}
                />
            </CardActionArea>
            <CardActionArea
                onClick={() => router.push("/posts/[id]", `/posts/${info.id}`)}
            >
                <CardMedia
                    className={classes.media}
                    image={info.thumbnail || "/default-pic.png"}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {info.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {info.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {(info.kind === "public" || info.kind === "user") && (
                    <Button
                        size="small"
                        className={classes.button}
                        onClick={() =>
                            router.push("/posts/[id]", `/posts/${info.id}`)
                        }
                    >
                        Learn More
                    </Button>
                )}
                {info.kind === "private" && (
                    <>
                        <Button
                            size="small"
                            className={classes.button}
                            onClick={() =>
                                router.push("/posts/[id]", `/posts/${info.id}`)
                            }
                        >
                            See Post
                        </Button>
                        <Button
                            size="small"
                            className={classes.buttonEdit}
                            onClick={() =>
                                router.push(
                                    "/[user]/edit-post/[id]",
                                    `/${info.creator.username}/edit-post/${info.id}`
                                )
                            }
                        >
                            Edit
                        </Button>
                        <Button
                            size="small"
                            className={classes.buttonDelete}
                            onClick={async () => {
                                const result = await deletePost({
                                    variables: {
                                        postId: +info.id,
                                    },
                                });
                                console.log(result);
                            }}
                        >
                            Delete
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default SinglePostOverview;
