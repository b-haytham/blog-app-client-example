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
import { Like, Post, User, Comment, useDeletePostMutation } from "../../generated/graphql";

interface Props {
    info: { __typename?: "Post" } & Pick<
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
        };
    kind: "private" | "public";
}

const useStyles = makeStyles({
    container: {
        width: "400px",
        margin: "15px",
        "&:hover": {
            transform: "scale(1.1)",
            transitionDuration: "1s",
        },
    },
    media: {
        height: "200px",
    },
});

const SinglePostOverview: React.FC<Props> = ({ info, kind }) => {
    const classes = useStyles();
    const router = useRouter();


    const [deletePost] = useDeletePostMutation()

    return (
        <Card elevation={3} className={classes.container}>
            <CardActionArea
                onClick={() =>
                    router.push("/[user]", `/${info.creator.username}`)
                }
            >
                <CardHeader
                    avatar={
                        <Avatar>
                            <img src="/logo.png" alt="logo" />
                        </Avatar>
                    }
                    title={`${info.creator.username}`}
                />
            </CardActionArea>
            <CardActionArea
                onClick={() => router.push("/posts/[id]", `/posts/${info.id}`)}
            >
                <CardMedia
                    className={classes.media}
                    image="/default-pic.png"
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
                {kind === "public" && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={() =>
                            router.push("/posts/[id]", `/posts/${info.id}`)
                        }
                    >
                        Learn More
                    </Button>
                )}
                {kind === "private" && (
                    <>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() =>
                                router.push("/posts/[id]", `/posts/${info.id}`)
                            }
                        >
                            See Post
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            onClick={() =>
                                router.push(
                                    "/[user]/edit-post/[id]",
                                    `/${info.creator.username}/edit-post/${info.id}`
                                )
                            }
                        >
                            Edit
                        </Button>
                        <Button size="small" onClick={async() => {
                            const result = await deletePost({
                                variables: {
                                    postId: +info.id
                                }
                            })
                            console.log(result)
                        }}>
                            Delete
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default SinglePostOverview;
