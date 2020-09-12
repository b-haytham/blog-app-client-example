import HomeScreen from "../components/HomePage/HomeScreen";
import Layout from "../components/Layout";

const Index = () => {
    return (
        <Layout>
            <HomeScreen/>
            <hr style={{
                border : '2px solid grey',
                width: '50%',
                margin: '0 auto',
            }}/>
        </Layout>
    );
};


export default Index;
