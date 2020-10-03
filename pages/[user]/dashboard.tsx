import { gql } from "@apollo/client";
import { Box, Button, Container, Typography } from "@material-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/NavBar/Layout";
import {
    useDeletePostMutation,
    useGetLoggedInUserPostsQuery,
    useMeQuery,
} from "../../generated/graphql";

import { withApollo } from "../../utils/withApollo";

const Dashboard: NextPage = () => {
    const router = useRouter();
    const { data, loading, error } = useMeQuery();

    const [deletePost] = useDeletePostMutation()
    
    const {
        data: postData,
        loading: postLoading,
        error: postError,
    } = useGetLoggedInUserPostsQuery();


    if (loading || postLoading) {
        return <Typography variant="h1">-------Loading</Typography>;
    }

    console.log(postData)    

    return (
        <Layout>
            <Typography align="center">Dashboard</Typography>

            <Container>
                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    flexWrap="wrap"
                >
                    {postData?.getLoggedInUserPosts.map((item) => (
                        <>
                            <Box key={item.id}>
                                <Typography align="center" variant="h5">
                                    {item.title} {item.id}
                                </Typography>
                                <Box display="flex">
                                    <Button
                                        onClick={() => {
                                            router.push(
                                                "/[user]/edit-post/[id]",
                                                `/${data?.me?.username}/edit-post/${item.id}`
                                            );
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button onClick={async() => {
                                        const result = await deletePost({
                                            variables: {
                                                postId: +item.id
                                            }

                                        })
                                        console.log(result)
                                    }}>Delete</Button>
                                </Box>
                            </Box>
                        </>
                    ))}
                </Box>
            </Container>
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
