import {
    MeDocument,
    MeQuery,
    useCreateUserMutation,
    useForgotPasswordMutation,
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
    Box
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
    title: {
        fontWeight: 'bolder',
        fontSize: '50px',
        color: 'black',
        margin: '20px'
    },
    form: {
        width: "70%",
        padding: '20px',
        margin: "20px auto",
        border: '1px solid #21a60a',
        borderRadius: '25px'
    },
    control: {
        margin: "20px 0",
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
    redirect: {
        display: 'flex',
        flexDirection:'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        margin: '10px',
        fontWeight: 'bolder',
        color: '#21a60a',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});

const SignUp = () => {
    const classes = useStyles();

    const router = useRouter();
    const [createUser, {loading: createUserLoading}] = useCreateUserMutation();
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
            {(loading || createUserLoading) && <Loading/>}
            <Box className={classes.container}>
            <Typography className={classes.title} align="center" variant="h1">
                Register
            </Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
                <FormControl className={classes.control} fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                    color='primary'
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
                <Box className={classes.redirect}>
                    <Link href='/sign-in'>
                        <a className={classes.link}>Already have an account ?! Login</a>
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

export default withApollo({ ssr: false })(SignUp);
