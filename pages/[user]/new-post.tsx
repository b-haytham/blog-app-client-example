import { Typography } from "@material-ui/core"
import Layout from "../../components/NavBar/Layout"

import Editor from '../../components/Editor/DynamicLoadedEditor'
import { useRouter } from "next/router"
import { useGetUserByUsernameQuery } from "../../generated/graphql"
import { useEffect } from "react"
import { withApollo } from "../../utils/withApollo"

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = ({}) => { 

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

    return(
        <Layout>
            <Typography align='center' variant='h1' >Create New Post</Typography>
            <Editor/>
        </Layout>
    );
}


export default withApollo({ssr:true})(NewPost)