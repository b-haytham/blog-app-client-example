import { Box, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Layout from "../../components/NavBar/Layout";
import {
    useCreateCommentMutation,
    useGetPublicPostByIdQuery,
    useMeQuery,
} from "../../generated/graphql";

import draftjsToHtml from "draftjs-to-html";
import { fromBase64ToObject } from "../../utils/fromBase64ToObject";
import { withApollo } from "../../utils/withApollo";

import Editor from "../../components/Editor/DynamicLoadedEditor";
import PostComments from "../../components/PostComments/PostComments";

const Post = () => {
    const router = useRouter();
    const { data: meData, loading: meLoading } = useMeQuery();

    const { data, loading, error } = useGetPublicPostByIdQuery({
        variables: {
            postId: +router.query.id!,
        },
    });

    const [createComment] = useCreateCommentMutation();

    if (loading || meLoading) {
        return (
            <Typography variant="h4" align="center">
                --------Loading--------
            </Typography>
        );
    }

    const html = draftjsToHtml(
        //@ts-ignore
        fromBase64ToObject(data?.getPublicPostById.content!)
    );

    const handleSave = async (data: any) => {
        console.log(data);

        const result = await createComment({
            variables: {
                postId: +router.query.id!,
                content: data.content,
            },
        });
        console.log(result);
    };

    return (
        <Layout>
            <Typography variant="h2" align="center">
                {data?.getPublicPostById.title}
            </Typography>
            <Typography variant="h4" align="center">
                {data?.getPublicPostById.description}
            </Typography>

            <Box
                margin="80px 0"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                dangerouslySetInnerHTML={{ __html: html }}
            />

            {meData?.me && <Editor isComment onSave={handleSave} />}

            {data?.getPublicPostById.comments.length == 0 && (
                <Typography variant="h3" align="center">
                    Be the first to Comment
                </Typography>
            )}

            {data?.getPublicPostById && (
                <PostComments
                    meId={+meData?.me?.id!}
                    postId={+data.getPublicPostById.id}
                />
            )}
        </Layout>
    );
};

export default withApollo({ ssr: true })(Post);
