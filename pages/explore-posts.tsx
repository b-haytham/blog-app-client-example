import Layout from "../components/Layout";
import MyEditor from "../components/Editor/DynamicLoadedEditor";

const ExplorePosts = () => {
    return (
        <Layout>
            <div style={{
                padding: '50px 20px 50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                
            }}>
            <MyEditor />
            </div>
        </Layout>

    );
};

export default ExplorePosts;
