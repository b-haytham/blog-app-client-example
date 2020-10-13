import { Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Layout from "../../../components/NavBar/Layout";
import { GetPostByIdDocument, GetPublicPostsDocument, useGetPostByIdQuery, useMeQuery, useUpdatePostMutation } from "../../../generated/graphql";
import { withApollo } from "../../../utils/withApollo";
import Editor from '../../../components/Editor/DynamicLoadedEditor'
import { NextPage } from "next";
import { gql } from "@apollo/client";
import Loading from "../../../components/Loading";


const EditPost: NextPage = () => {
    const router = useRouter();

    const {data: meData, loading: meLoading, error: meError} = useMeQuery()

    const {data, loading, error} = useGetPostByIdQuery({
        variables: {
            postId: +router.query.id! 
        }
    })

    const [updatePost, {loading: updatePostLoading}] = useUpdatePostMutation()

    if(loading || meLoading) {
        return <Typography variant='h2' align='center'>------Loading------</Typography>
    }

    console.log(data)

    const init = {
        title: data?.getPostById.title,
        description: data?.getPostById.description,
        content: data?.getPostById.content!,
        tags: data?.getPostById.tags?.split(', ') || [],
        publish: data?.getPostById.published,
        category: data?.getPostById.category,
        thumbnail: data?.getPostById.thumbnail || '/default-pic.png'
    }


    const handleSave =async (postData: any) => {
        console.log(postData)
        const result =  await updatePost({
            variables: {
                postId: +router.query.id!,
                input: postData
            },
            refetchQueries: [
                { query: GetPostByIdDocument, variables: { postId: +data?.getPostById.id! } },
                { query: GetPublicPostsDocument, variables: { postId: +data?.getPostById.id! } },
            ]
        })

        console.log(result)

        if(result.data?.updatePost){

            router.push('/[user]/dashboard', `/${meData?.me?.username}/dashboard`)
        }else {
            alert(JSON.stringify(data))
        }
    }

    return (
        <Layout>
            {(loading || meLoading || updatePostLoading ) && <Loading/>}
            <Typography variant="h3" align="center">
                Edit Post
            </Typography>
            
            <Editor isEdit init={init} onSave={handleSave}/>
        </Layout>
    );
};

EditPost.getInitialProps = async ({
    // @ts-ignore
    apolloClient,
    res,
    query,
}) => {
    const result = await apolloClient.query({
        query: gql`
            query me {
                me {
                    email
                    username
                    created_at
                    updated_at
                    avatar
                }
            }
        `,
    });

    if (!result.data?.me || result.data?.me.username !== query.user) {
        res?.writeHead(301, { Location: "/" });
        res?.end();
    }

    // console.log("asakllkandlk", result);
    // if (res) {
    //     res.writeHead(301, { Location: "/" });
    //     res.end();
    // }

    // console.log("query", query);
    // console.log("pathname", pathname);
    // console.log("asPath", asPath);

    return {};
};



export default withApollo({ssr:true})(EditPost);
