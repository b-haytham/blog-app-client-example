import { Typography } from "@material-ui/core"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Layout from "../../components/NavBar/Layout"
import { useGetUserByUsernameQuery } from "../../generated/graphql"
import { withApollo } from "../../utils/withApollo"

const EditProfile = () => {
    const router =  useRouter()
    const {data, loading, error} = useGetUserByUsernameQuery({
        variables: {
            username: router.query.user as string
        }
    })

    useEffect(()=>{
        if((!data?.getUser && !loading) || error){
            router.replace('/')
        }

    },[data, error, loading, router])

    return (
        <Layout>
            <Typography>Edit Profile</Typography>
        </Layout>
    )
}

export default withApollo({ssr: true})( EditProfile) 