import { Box, Button } from "@material-ui/core";
import draftToHtml from "draftjs-to-html";
import {
    useDislikeMutation,
    useGetCommentsByPostIdQuery,
    useLikeMutation,
} from "../../generated/graphql";
import { fromBase64ToObject } from "../../utils/fromBase64ToObject";


interface Props {
    meId: number;
    postId: number;
}
const PostComments: React.FC<Props> = ({ postId }) => {
    const { data, loading, error } = useGetCommentsByPostIdQuery({
        variables: {
            postId,
        },
    });

    const [likeComment] = useLikeMutation();

    const [dislikeComment] = useDislikeMutation()


    const renderContentToHtml = (content: string) => {
        //@ts-ignore
        return draftToHtml(fromBase64ToObject(content))   
    }

    return (
        <div>
            {data?.getCommentsByPostId &&
                data.getCommentsByPostId.map((item) => (
                    <Box
                        border="1px solid black"
                        margin="20px"
                        padding="20px"
                        key={item.id}
                    >
                        <p style={{ margin: "20px" }}>
                            {item.creator.username}
                        </p>
                        <Box component='div' dangerouslySetInnerHTML={{__html: renderContentToHtml(item.content)}}/>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={async () => {
                                const result = await likeComment({
                                    variables: {
                                        parent: "COMMENT",
                                        parentId: +item.id,
                                    },
                                });
                                console.log(result);
                            }}
                        >
                            like
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={async () => {
                                const result = await dislikeComment({
                                    variables: {
                                        parent: "COMMENT",
                                        parentId: +item.id,
                                    },
                                });
                                console.log(result);
                            }}
                        >
                            dislike
                        </Button>
                    </Box>
                ))}
        </div>
    );
};

export default PostComments;
