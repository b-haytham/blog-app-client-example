import {
    MeDocument,
    MeQuery,
    useCreateUserMutation,
    useMeQuery,
} from "../generated/graphql";
import { ChangeEvent, FormEvent, useState } from "react";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";
import Layout from "../components/NavBar/Layout";

const SignUp = () => {
    const router = useRouter();
    const [createUser] = useCreateUserMutation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { data, loading } = useMeQuery();

    if (data?.me) {
        router.push("/");
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const responce = await createUser({
            variables: {
                username,
                email,
                password,
            },
            update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                    query: MeDocument,

                    data: {
                        __typename: "Query",
                        me: data?.createUser,
                    },
                });
            },
        });
        console.log(responce);
    };

    return (
        <Layout>
            <h1>Sign Up</h1>
        </Layout>
    );
};

export default withApollo({ ssr: false })(SignUp);
