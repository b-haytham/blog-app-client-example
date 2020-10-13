import { Box, makeStyles, Typography } from "@material-ui/core";
import Layout from "../../components/NavBar/Layout";

import Editor from "../../components/Editor/DynamicLoadedEditor";
import {
    useCreatePostMutation, useMeQuery,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { NextPage } from "next";
import { gql } from "@apollo/client";
import Loading from "../../components/Loading";
import Axios from "axios";

const useStyles = makeStyles({
    container: {
        backgroundColor: "transparent",
    },
    title: {
        margin: '15px'
    }
});



const NewPost: NextPage = ({}) => {
    const classes = useStyles();

    const {data: meData,loading: meLoading,error: meError} = useMeQuery()

    const [createPost, {error, loading}] = useCreatePostMutation({errorPolicy: 'all', onError: (err)=>console.error(err)});


    const handleSave = async (data: any) => {
        console.log(data);

        
        if(data.thumbnail){

            const formData = new FormData()
            formData.append('avatar', data.thumbnail, data.thumbnail.name)
            formData.append('userId', meData?.me?.id!)    
            try {
                const result = await  Axios.post('http://localhost:8000/upload', formData) 
                data.thumbnail = result.data.path
            } catch (error) {
                console.log(error)
            }
        }



        const formData = new FormData()
        
        data.contentFiles.forEach((item: any, i: any)=> formData.append('assets', item, item.name))
        formData.append('userId', meData?.me?.id!)

        
        



        try {
            const result = await Axios.post('http://localhost:8000/uploads', formData)
            const entityMapKeys = Object.keys(data.content.entityMap)
            
            
            for (const key of entityMapKeys) {
                console.log(key)
                data.content.entityMap[key].data.src =  result.data.files[key].path 
            }


            console.log(result)

            
            
            delete data.contentFiles

            console.log(data)    


            const createPostResult = await createPost({
                variables: {
                    input: data                    
                }
            })

            console.log(createPostResult)
        } catch (error) {
            
            console.log(error)
        }

        // const result = await createPost({
        //     variables: {
        //         input: data,
        //     },
        // })

        // console.log(result)
    };

    console.log(error)

    return (
        <Layout>
            {loading && <Loading />}
            <Box className={classes.container}>
                <Typography className={classes.title} align="center" variant="h3" component="h3">
                    Create New Post
                </Typography>
                <Editor onSave={handleSave} />
            </Box>
        </Layout>
    );
};

NewPost.getInitialProps = async ({
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

export default withApollo({ ssr: true })(NewPost);
