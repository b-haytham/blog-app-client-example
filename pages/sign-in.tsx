
import {
    MeDocument,
    MeQuery,
    SignInMutation,
    useMeQuery,
    useSignInMutation,
} from "../generated/graphql";
import { FormEvent, useState } from "react";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";
import Layout from "../components/NavBar/Layout";
import { Typography } from "@material-ui/core";

const SignIn = () => {
    const router = useRouter();
    const { data, loading, error } = useMeQuery();
    const [signIn] = useSignInMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    if (data?.me) {
        router.push({
            pathname: "/[user]",
        }, `/${data.me.username}`);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn({
            variables: {
                email,
                password,
            },
            update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        __typename: "Query",
                        me: data?.signInUser,
                    },
                });
                cache.evict({ fieldName: "posts:{}" });
            },
        });
        router.push({
            pathname: "/[user]",
            query: {
                user: result.data?.signInUser.username
            },
        });
    };

    return (
        <Layout>
            <Typography align='center' variant='h1'> Sign In</Typography>

            
        </Layout>
    );
};

export default withApollo({ ssr: false })(SignIn);
