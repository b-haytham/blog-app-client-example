import Button from "../components/Form/Button";
import Input from "../components/Form/Input";
import Layout from "../components/Layout";
import { Title } from "../components/HomePage/HomeScreen";
import NavLink from "../components/NavBar/NavLink";
import { useSignInMutation } from "../generated/graphql";
import { FormEvent, useState } from "react";
import { withApollo } from "../utils/withApollo";

const SignIn = () => {
    const [signIn] = useSignInMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await signIn({
            variables: {
                email,
                password
            }
        })
        console.log(result)
    };

    return (
        <Layout>
            <div
                style={{
                    margin: "100px auto",
                    width: "50%",
                }}
            >
                <Title>Sign In und start your first Article</Title>
                <form onSubmit={handleSubmit}>
                    <Input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="E-mail" />
                    <Input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" placeholder="Password" />
                    <Button>Sign Up</Button>
                </form>
                <div
                    style={{
                        margin: "15px auto",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <NavLink color="black" href="/sign-up">
                        Do not have An Account go Sign up
                    </NavLink>
                    <div
                        style={{
                            height: "20px",
                            width: "1px",
                            borderLeft: "10px solid black",
                        }}
                    ></div>
                    <NavLink color="black" href="/forget-password">
                        Forget Password? Request new One
                    </NavLink>
                </div>
            </div>
        </Layout>
    );
};

export default withApollo({ssr:false})(SignIn);
