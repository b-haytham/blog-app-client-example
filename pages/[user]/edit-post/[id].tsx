import { Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Layout from "../../../components/NavBar/Layout";
import { useGetPostByIdQuery, useMeQuery, useUpdatePostMutation } from "../../../generated/graphql";
import { withApollo } from "../../../utils/withApollo";
import Editor from '../../../components/Editor/DynamicLoadedEditor'
import { fromBase64ToObject } from "../../../utils/fromBase64ToObject";


const EditPost = () => {
    const router = useRouter();

    const {data: meData, loading: meLoading, error: meError} = useMeQuery()

    const {data, loading, error} = useGetPostByIdQuery({
        variables: {
            postId: +router.query.id! 
        }
    })

    const [updatePost] = useUpdatePostMutation()

    if(loading || meLoading) {
        return <Typography variant='h2' align='center'>------Loading------</Typography>
    }

    console.log(fromBase64ToObject( data?.getPostById.content!))

    const init = {
        title: data?.getPostById.title,
        description: data?.getPostById.description,
        content: fromBase64ToObject(data?.getPostById.content!)
    }


    const handleSave =async (data: any) => {
        const result =  await updatePost({
            variables: {
                postId: +router.query.id!,
                input: data
            }
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
            <Typography variant="h3" align="center">
                Edit Post
            </Typography>
            
            <Editor isEdit init={init} onSave={handleSave}/>
        </Layout>
    );
};

export default withApollo({ssr:true})(EditPost);
