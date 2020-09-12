import Button from "../components/Form/Button";
import Input from "../components/Form/Input";
import Layout from "../components/Layout";
import { Title } from "../components/HomePage/HomeScreen";

const SignIn = () => {
    return (
        <Layout>
            <div style={{
                margin: '100px auto',
                width: '50%'
            }}>
                <Title>Sign Up und start your first Article</Title>
                <Input />
                <Input type='password' />
                <Button>Sign Up</Button>
            </div>
        </Layout>
    );
};

export default SignIn;
