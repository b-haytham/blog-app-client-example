import { Typography } from "@material-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/NavBar/Layout";
import { useGetUserByUsernameQuery, useMeQuery } from "../../generated/graphql";

import { withApollo } from "../../utils/withApollo";

const Dashboard: NextPage = () => {
    const router = useRouter();
    const { data, loading, error } = useMeQuery();

    if (loading) {
        return <Typography variant="h1">-------Loading</Typography>;
    }

    if (!data?.me && !loading) {
        router.replace("/sign-in");
    }

    return (
        <Layout>
            <Typography align="center">Dashboard</Typography>
        </Layout>
    );
};

export default withApollo({ ssr: true })(Dashboard);
