import { Box, makeStyles } from "@material-ui/core";
import {
    GetLoggedInUserPostsQuery,
    GetPublicPostsQuery,
    Like,
    Post,
    Comment,
} from "../../generated/graphql";
import SinglePostOverview from "../SinglePostOverview/SinglePostOverview";

interface Props {
    data:
        | (GetPublicPostsQuery & { kind: "public" })
        | (GetLoggedInUserPostsQuery & { kind: "private" })
        | ({
              posts: Array<
                  { __typename?: "Post" } & Pick<
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
                          likes: Array<
                              { __typename?: "Like" } & Pick<Like, "id">
                          >;
                      }
              >;
          } & {
              kind: "user";
              username: string;
              avatar: string | null | undefined;
          });
}

const useStyles = makeStyles({
    container: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        padding: "25px",
        justifyContent: "center",
        alignItems: "center",
    },
});

const PostsContainer: React.FC<Props> = ({ data }) => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            {data.kind === "public" &&
                data.getPublicPosts.map((item) => (
                    <SinglePostOverview
                        key={item.id}
                        info={{ ...item, kind: data.kind }}
                    />
                ))}
            {data.kind === "private" &&
                data.getLoggedInUserPosts.map((item) => (
                    <SinglePostOverview
                        key={item.id}
                        info={{ ...item, kind: data.kind }}
                    />
                ))}
            {data.kind === "user" &&
                data.posts.map((item) => (
                    //@ts-ignore
                    <SinglePostOverview
                        key={item.id}
                        info={{
                            ...item,
                            kind: data.kind,
                            username: data.username,
                            avatar: data.avatar,
                        }}
                    />
                ))}
        </Box>
    );
};

export default PostsContainer;
