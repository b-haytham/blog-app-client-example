import { gql } from "@apollo/client";
import { Box, Typography, FormControl, InputLabel, Input, FormHelperText, Button } from "@material-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Layout from "../../components/NavBar/Layout";
import { UpdateUserInputType, useMeQuery, useUpdateUserMutation } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const EditProfile: NextPage = () => {
    const router = useRouter();
    const { data, loading, error } = useMeQuery();

    const [updateUser] = useUpdateUserMutation()


    const [formData, setFormData] = useState({
        username: data?.me?.username,
        first_name: data?.me?.first_name || '',
        last_name: data?.me?.last_name || '',
        studied_at: data?.me?.studied_at || '',
        work_at: data?.me?.work_at || '',
        github: data?.me?.github || '',
        facebook: data?.me?.facebook || '',
        tweeter: data?.me?.tweeter || '',
        avatar: data?.me?.avatar || ''
    })

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(e.target.name, '-------', e.target.value)
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    return (
        <Layout>
            <Typography align='center' variant='h2' >Edit Profile</Typography>

            <Box width="80%" paddingX="20px">
                <FormControl fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        value={formData.username}
                        name='username'
                        onChange={handleChange}
                        id="username"
                        aria-describedby="my-username-text"
                    />
                    <FormHelperText id="my-username-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="first_name">Fist Name</InputLabel>
                    <Input
                        value={formData.first_name}
                        name='first_name'
                        onChange={handleChange}
                        id="first_name"
                        aria-describedby="my-first_name-text"
                    />
                    <FormHelperText id="my-first_name-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl  fullWidth>
                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                    <Input
                        value={formData.last_name}
                        name='last_name'
                        onChange={handleChange}
                        id="last_name"
                        aria-describedby="my-last_name-text"
                    />
                    <FormHelperText id="my-last_name-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl  fullWidth>
                    <InputLabel htmlFor="studied_at">Studied At</InputLabel>
                    <Input
                        value={formData.studied_at}
                        name='studied_at'
                        onChange={handleChange}
                        id="studied_at"
                        aria-describedby="my-studied_at-text"
                    />
                    <FormHelperText id="my-studied_at-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl  fullWidth>
                    <InputLabel htmlFor="work_at">Work At</InputLabel>
                    <Input
                        value={formData.work_at}
                        name='work_at'
                        onChange={handleChange}
                        id="work_at"
                        aria-describedby="my-work_at-text"
                    />
                    <FormHelperText id="my-work_at-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl  fullWidth>
                    <InputLabel htmlFor="github">Github</InputLabel>
                    <Input
                        value={formData.github}
                        name='github'
                        onChange={handleChange}
                        id="github"
                        aria-describedby="my-github-text"
                    />
                    <FormHelperText id="my-github-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl  fullWidth>
                    <InputLabel htmlFor="facebook">Facebook</InputLabel>
                    <Input
                        value={formData.facebook}
                        name='facebook'
                        onChange={handleChange}
                        id="facebook"
                        aria-describedby="my-facebook-text"
                    />
                    <FormHelperText id="my-facebook-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>

                <FormControl  fullWidth>
                    <InputLabel htmlFor="tweeter">Tweeter</InputLabel>
                    <Input
                        value={formData.tweeter}
                        name='tweeter'
                        onChange={handleChange}
                        id="tweeter"
                        aria-describedby="my-tweeter-text"
                    />
                    <FormHelperText id="my-tweeter-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>

                <Button onClick={async()=> {
                    const result = await updateUser({
                        variables: {
                            input: formData as UpdateUserInputType
                        }
                    })
                    console.log(result)
                }}>Submit</Button>
            </Box>

        </Layout>
    );
};

EditProfile.getInitialProps = async ({
    // @ts-ignore
    apolloClient,
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

    if (!result.data?.me || result.data?.me.username !== query.user) {
        res?.writeHead(301, { Location: "/" });
        res?.end();
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

export default withApollo({ ssr: true })(EditProfile);
