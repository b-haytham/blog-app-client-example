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
    Button,
    Box,
    Divider,
} from "@material-ui/core";
import Link from "next/link";
import Loading from "../components/Loading";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)'
    },
    form: {
        width: "70%",
        margin: "20px auto",
        padding: '20px',
        border: '1px solid #21a60a',
        borderRadius: '25px'
    },
    control: {
        margin: "20px 0",
    },
    title: {
        fontSize: '50px',
        fontWeight:'bolder',
        margin: '20px',
        color: 'black'
    },
    button: {
        margin: "15px auto",
        backgroundColor: "#21a60a",
        color: "white",
        fontWeight: "bolder",
        transition: "all 0.2s",
        "&:hover": {
            color: "#21a60a",
            backgroundColor: "white",
            border: "2px solid #21a60a",
        },
    },
    forgotPass: {
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        margin: '10px',
        color: '#21a60a',
        fontWeight: 'bolder',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});

const SignIn = () => {
    const classes = useStyles();

    const router = useRouter();
    const { data, loading, error } = useMeQuery();
    const [signIn, {loading:signInLoading }] = useSignInMutation();
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
        router.push('/[user]', `/${result.data?.signInUser.username}`);
    };

    return (
        <Layout>
            {signInLoading && <Loading/>}
            <Box className={classes.container}>
            <Typography align="center" variant="h1"className={classes.title}>
                Login
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
                <FormControl className={classes.control} fullWidth>
                    <InputLabel htmlFor="email">Email address</InputLabel>
                    <Input
                    color='primary'
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
                    color='primary'
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
                <Box className={classes.forgotPass}>
                    <Link href='/forget-password'>
                        <a className={classes.link}>  forgot Password ?</a>
                    </Link>
                    <Link href='/sign-up'>
                        <a className={classes.link}> Don't have account ? , register</a>
                    </Link>
                </Box>
                <Box display='flex' justifyContent='center'>
                    <Button
                        type='submit'
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </Box>
            </form>
            </Box>
        </Layout>
    );
};

export default withApollo({ ssr: false })(SignIn);
