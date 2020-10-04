import {
    MeDocument,
    MeQuery,
    SignInMutation,
    useMeQuery,
    useSignInMutation,
} from "../generated/graphql";
import { FormEvent, useState } from "react";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";
import Layout from "../components/NavBar/Layout";
import {
    Typography,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    makeStyles,
    Button
} from "@material-ui/core";

const useStyles = makeStyles({
    form: {
        width: "70%",
        margin: "0 auto",
    },
    control: {
        margin: '20px 0'
    }
});

const SignIn = () => {
    const classes = useStyles();

    const router = useRouter();
    const { data, loading, error } = useMeQuery();
    const [signIn] = useSignInMutation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    

    if (data?.me) {
        router.push(
            {
                pathname: "/[user]",
            },
            `/${data.me.username}`
        );
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await signIn({
            variables: {
                email,
                password,
            },
            update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                    query: MeDocument,
                    data: {
                        __typename: "Query",
                        me: data?.signInUser,
                    },
                });
                cache.evict({ fieldName: "posts:{}" });
            },
        });
        router.push({
            pathname: "/[user]",
            query: {
                user: result.data?.signInUser.username,
            },
        });
    };

    return (
        <Layout>
            <Typography align="center" variant="h1">
                {" "}
                Sign In
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
                <FormControl className={classes.control} fullWidth>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        aria-describedby="my-email-text"
                    />
                    <FormHelperText id="my-email-text">
                        We'll never share your email.
                    </FormHelperText>
                </FormControl>
                <FormControl className={classes.control} fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        aria-describedby="my-password-text"
                    />
                    <FormHelperText id="my-password-text">
                        At least 6 ch
                    </FormHelperText>
                </FormControl>
                <FormControl className={classes.control} fullWidth>
                    <Button type='submit' variant='outlined' >Sign in</Button>
                </FormControl>
            </form>
        </Layout>
    );
};

export default withApollo({ ssr: false })(SignIn);
