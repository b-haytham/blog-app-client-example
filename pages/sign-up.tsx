import {
    MeDocument,
    MeQuery,
    useCreateUserMutation,
    useMeQuery,
} from "../generated/graphql";
import { ChangeEvent, FormEvent, useState } from "react";
import { withApollo } from "../utils/withApollo";
import { useRouter } from "next/router";
import Layout from "../components/NavBar/Layout";
import {
    makeStyles,
    Typography,
    FormHelperText,
    FormControl,
    Input,
    InputLabel,
    Button,
} from "@material-ui/core";

const useStyles = makeStyles({
    form: {
        width: "70%",
        margin: "0 auto",
    },
    control: {
        margin: "20px 0",
    },
});

const SignUp = () => {
    const classes = useStyles();

    const router = useRouter();
    const [createUser] = useCreateUserMutation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { data, loading } = useMeQuery();

    if (data?.me) {
        router.push("/");
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const responce = await createUser({
            variables: {
                username,
                email,
                password,
            },
            update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                    query: MeDocument,

                    data: {
                        __typename: "Query",
                        me: data?.createUser,
                    },
                });
            },
        });
        console.log(responce);
    };

    return (
        <Layout>
            <Typography align="center" variant="h1">
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
                <FormControl className={classes.control} fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        aria-describedby="my-username-text"
                    />
                    <FormHelperText id="my-username-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
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
                    <Button type='submit' variant="outlined">
                        Sign Up
                    </Button>
                </FormControl>
            </form>
        </Layout>
    );
};

export default withApollo({ ssr: false })(SignUp);
