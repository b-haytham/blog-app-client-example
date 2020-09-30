import { Typography } from "@material-ui/core"
import Layout from "../../components/NavBar/Layout"

import Editor from '../../components/Editor/DynamicLoadedEditor'
import { useCreatePostMutation } from "../../generated/graphql"
import { withApollo } from "../../utils/withApollo"
import { NextPage } from "next"
import { gql } from "@apollo/client"
import { fromBase64ToObject } from "../../utils/fromBase64ToObject"


const NewPost: NextPage = ({}) => { 

    const [createPost] = useCreatePostMutation()



    const handleSave =async (data: any) => {
        const result = await createPost({
            variables: {
                title: data.title as string,
                description: data.description as string,
                content: data.content as string
            }
        })

        const contentState = fromBase64ToObject(result.data?.createPost.content!)
        console.log(contentState)        
    }   

    return(
        <Layout>
            <Typography align='center' variant='h3' component='h3'>Create New Post</Typography>
            <Editor onSave={handleSave} />
        </Layout>
    );
}

// @ts-ignore
NewPost.getInitialProps = async ({    apolloClient,
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



    if(!result.data?.me || result.data?.me.username !== query.user ){
        res?.writeHead(301, {Location: '/'})
        res?.end()
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


export default withApollo({ssr:true})(NewPost)