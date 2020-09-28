import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/NavBar/Layout";
import { useGetUserByUsernameQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const UserIndex = () => {
    const router = useRouter()
    console.log(router)
    const {data, error, loading} = useGetUserByUsernameQuery({
        variables:{
            username: router.query.user as string
        }
    })

    useEffect(()=>{
        if((!data?.getUser && !loading) || error){
            router.replace('/')
        }

    },[data, error, loading, router])

    return <Layout>
        
    </Layout>;
};

export default withApollo({ssr: true})( UserIndex);
