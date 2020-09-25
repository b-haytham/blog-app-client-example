import { Container, Typography } from "@material-ui/core";
import Layout from "../components/NavBar/Layout";

const Index = () => {
    return (
        <Layout>
            <Container>
                <Typography variant="h1" align="center" component="h2">
                    h1. Heading
                </Typography>
            </Container>
        </Layout>
    );
};

export default Index;
