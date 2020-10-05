import { gql } from "@apollo/client";
import { Box, Button, Container, makeStyles, Typography } from "@material-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/NavBar/Layout";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import SearchBar from "../../components/SearchBar/SearchBar";
import {
    useDeletePostMutation,
    useGetLoggedInUserPostsQuery,
    useMeQuery,
} from "../../generated/graphql";

import { withApollo } from "../../utils/withApollo";




const useStyles = makeStyles({
    line: {
        margin: "20px auto 50px",
        color: "black",
        width: "50%",
    },
})

const Dashboard: NextPage = () => {
    const classes = useStyles()
    const router = useRouter();


    const { data, loading, error } = useMeQuery();


    const {
        data: postData,
        loading: postLoading,
        error: postError,
    } = useGetLoggedInUserPostsQuery();

    if (loading || postLoading) {
        return <Typography variant="h1">-------Loading</Typography>;
    }

    console.log(postData);
    console.log(postError)

    return (
        <Layout>
            <Box display="flex" flexDirection="column" justifyContent="center">

            <Box margin="50px auto 50px">
                    <SearchBar
                        placeholder="search"
                    />
                </Box>

                <hr className={classes.line} />


                { postData?.getLoggedInUserPosts && (
                    <Box margin='20px auto'>
                        <PostsContainer data={{...postData, kind: 'private'}}/>
                    </Box>

                )}
            </Box>
        </Layout>
    );
};

Dashboard.getInitialProps = async ({
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

export default withApollo({ ssr: true })(Dashboard);
