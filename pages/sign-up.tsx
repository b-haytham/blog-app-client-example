import Button from "../components/Form/Button";
import Input from "../components/Form/Input";
import Layout from "../components/Layout";
import { Title } from "../components/HomePage/HomeScreen";
import NavLink from "../components/NavBar/NavLink";

const SignUp = () => {
    return (
        <Layout>
            <div
                style={{
                    margin: "100px auto",
                    width: "50%",
                }}
            >
                <Title>Sign Up und start your first Article</Title>
                <Input placeholder="Usename" />
                <Input placeholder="E-mail" />
                <Input type="password" placeholder="Password" />
                <Button>Sign Up</Button>
                <div style={{
                    margin: '15px auto',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <NavLink color="black" href="/sign-in">
                        You have An Account go Sign In
                    </NavLink>
                </div>
            </div>
        </Layout>
    );
};

export default SignUp;