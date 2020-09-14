import Button from "../components/Form/Button";
import Input from "../components/Form/Input";
import Layout from "../components/Layout";
import { Title } from "../components/HomePage/HomeScreen";
import NavLink from "../components/NavBar/NavLink";

const SignIn = () => {
    return (
        <Layout>
            <div
                style={{
                    margin: "100px auto",
                    width: "50%",
                }}
            >
                <Title>Sign In und start your first Article</Title>
                <Input placeholder="E-mail" />
                <Input type="password" placeholder="Password" />
                <Button>Sign Up</Button>
                <div style={{
                    margin: '15px auto',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <NavLink color="black" href="/sign-up">
                        Do not have An Account go Sign up
                    </NavLink>
                </div>
            </div>
        </Layout>
    );
};

export default SignIn;
