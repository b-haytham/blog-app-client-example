import { Box, Card, CardHeader, Typography } from "@material-ui/core";
import { useRouter } from "next/router";

import Layout from "../components/NavBar/Layout";
import { useGetPublicPostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const ExplorePosts = () => {
    const router = useRouter()

    const { data, loading, error } = useGetPublicPostsQuery();


    return (
        <Layout>
            <Typography align="center" variant="h1">
                Explore
            </Typography>
            {loading && (
                <Typography variant="h5" align="center">
                    -----Loading-----
                </Typography>
            )}
            {data?.getPublicPosts.length == 0 && (
                <Typography variant="h5" align="center">
                    No Posts
                </Typography>
            )}
            {data?.getPublicPosts &&
                data?.getPublicPosts.map((item) => (
                    <Box key={item.id} onClick={()=>{
                        router.push('/posts/[id]', `/posts/${item.id}`)
                    }}>
                        <Typography variant="h6" align="center">
                            {item.title}
                        </Typography>
                    </Box>
                ))}
        </Layout>
    );
};

export default withApollo({ ssr: true })(ExplorePosts);
