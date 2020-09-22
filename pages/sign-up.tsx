import Button from "../components/Form/Button";
import Input from "../components/Form/Input";
import Layout from "../components/Layout";
import { Title } from "../components/HomePage/HomeScreen";
import NavLink from "../components/NavBar/NavLink";
import {
    MeDocument,
    MeQuery,
    useCreateUserMutation,
    useMeQuery,
} from "../generated/graphql";
import { ChangeEvent, FormEvent, useState } from "react";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";

const SignUp = () => {
    const router = useRouter()
    const [createUser] = useCreateUserMutation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {data, loading} = useMeQuery()
    

    if(data?.me){
        router.push('/')
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
            <div
                style={{
                    margin: "100px auto",
                    width: "50%",
                }}
            >
                <Title>Sign Up und start your first Article</Title>
                <form onSubmit={handleSubmit}>
                    <Input
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <Input
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                    />
                    <Input
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <Button type="submit">Sign Up</Button>
                </form>
                <div
                    style={{
                        margin: "15px auto",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <NavLink color="black" href="/sign-in">
                        You have An Account go Sign In
                    </NavLink>
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ ssr: false })(SignUp);
