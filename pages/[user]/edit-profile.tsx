import { gql } from "@apollo/client"
import { Typography } from "@material-ui/core"
import { NextPage } from "next"
import { useRouter } from "next/router"
import Layout from "../../components/NavBar/Layout"
import {  useMeQuery } from "../../generated/graphql"
import { withApollo } from "../../utils/withApollo"

const EditProfile: NextPage = () => {
    const router =  useRouter()
    const {data, loading, error} = useMeQuery()

    return (
        <Layout>
            <Typography>Edit Profile</Typography>
        </Layout>
    )
}


// @ts-ignore
EditProfile.getInitialProps = async ({    apolloClient,
    res,
    query,
    pathname,
    asPath,
}) => {
    const result = await apolloClient.query({
        query: gql`
            query me {
                me {
                    email
                    username
                    created_at
                    updated_at
                    avatar
                }
            }
        `,
    });



    if(!result.data?.me || result.data?.me.username !== query.user ){
        res?.writeHead(301, {Location: '/'})
        res?.end()
    }


    // console.log("asakllkandlk", result);
    // if (res) {
    //     res.writeHead(301, { Location: "/" });
    //     res.end();
    // }

    // console.log("query", query);
    // console.log("pathname", pathname);
    // console.log("asPath", asPath);

    return {};
};


export default withApollo({ssr: true})( EditProfile) 