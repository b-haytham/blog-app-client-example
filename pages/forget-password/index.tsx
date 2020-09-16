import Button from "../../components/Form/Button";
import Input from "../../components/Form/Input";
import { Title } from "../../components/HomePage/HomeScreen";
import Layout from "../../components/Layout";

const ForgetPassword = () => {
    return (
        <Layout>
            <div
                style={{
                    margin: "100px auto",
                    width: "50%",
                }}
            >
                <Title>Enter Your E-mail</Title>    
                <Input placeholder='E-mail' />
                <Button>Submit</Button>
            </div>
        </Layout>
    );
};

export default ForgetPassword;
