import { Box, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useState } from "react";
import Loading from "../components/Loading";

import Layout from "../components/NavBar/Layout";
import PostsContainer from "../components/PostsContainer/PostsContainer";
import SearchBar from "../components/SearchBar/SearchBar";
import { useGetPublicPostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const useStyles = makeStyles({
    line: {
        margin: "20px auto 50px",
        color: "black",
        width: "50%",
    },
});

const ExplorePosts = () => {
    const classes = useStyles();
    const router = useRouter();


    const [searchTerm, setSearchTerm] = useState('')

    const { data, loading, error } = useGetPublicPostsQuery({
        variables: {
            query: searchTerm
        }
    });

    

    return (
        <Layout>
            <Box display="flex" flexDirection="column" justifyContent="center">
                <Box margin="50px auto 50px">
                    <SearchBar
                        onChange={(e)=> setSearchTerm(e.target.value)}
                        value={searchTerm}
                        placeholder="search .."
                    />
                </Box>

                <hr className={classes.line} />
                {loading && <Loading/>}
                {data?.getPublicPosts.length == 0 && (
                    <Typography  variant="h5" align="center">
                        No Posts
                    </Typography>
                )}
                {data?.getPublicPosts && (                   
                    <Box margin="20px auto">
                        <PostsContainer data={{...data, kind: 'public'}} />
                    </Box>
                )}
            </Box>
        </Layout>
    );
};

export default withApollo({ ssr: true })(ExplorePosts);
