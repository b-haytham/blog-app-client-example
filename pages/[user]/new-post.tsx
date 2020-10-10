import { Box, makeStyles, Typography } from "@material-ui/core";
import Layout from "../../components/NavBar/Layout";

import Editor from "../../components/Editor/DynamicLoadedEditor";
import {
    useCreatePostMutation,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";
import { NextPage } from "next";
import { gql } from "@apollo/client";
import Loading from "../../components/Loading";

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

    const [createPost, {error, loading}] = useCreatePostMutation({errorPolicy: 'all', onError: (err)=>console.error(err)});


    const handleSave = async (data: any) => {
        console.log(data);

        const result = await createPost({
            variables: {
                input: data,
            },
        })

        console.log(result)
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
