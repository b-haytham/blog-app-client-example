import { gql } from "@apollo/client";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    makeStyles,
    Typography,
    Snackbar,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/NavBar/Layout";
import { useChangePasswordMutation } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

interface Props {}

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 80px)",
    },
    title: {
        fontWeight: "bolder",
        fontSize: "50px",
        color: "black",
        margin: "20px",
    },
    form: {
        width: "70%",
        padding: "20px",
        margin: "20px auto",
        border: "1px solid black",
        borderRadius: "25px",
    },
    control: {
        margin: "20px 0",
    },
    button: {
        margin: "15px auto",
        backgroundColor: "black",
        color: "white",
        fontWeight: "bolder",
        transition: "all 0.2s",
        "&:hover": {
            color: "black",
            backgroundColor: "white",
            border: "2px solid black",
        },
    },
});

const ChangePassword: NextPage<Props> = ({}) => {
    const classes = useStyles();
    const router = useRouter();

    const [snackBar, setSnackBar] = useState({
        open: false,
        text: "",
        severity: "success" as
            | "success"
            | "info"
            | "warning"
            | "error"
            | undefined,
    });

    console.log(router.query)
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [changePassword, {loading}] = useChangePasswordMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setSnackBar((prev) => ({
                open: true,
                text: "password should match",
                severity: "error",
            }));
        }
        const result = await changePassword({
            variables: {
                password,
                token:
                    typeof router.query.token === "string"
                        ? router.query.token
                        : "",
            },
        });

        if(result.data?.changePassword){
            setSnackBar((prev) => ({
                open: true,
                text: "Password updated go login",
                severity: "success",
            }));
        }else {
            setSnackBar((prev) => ({
                open: true,
                text: "ERROR",
                severity: "error",
            }));
        }
    };


    const handleSnackBarClose = () => {
        setSnackBar((prev) => ({
            ...prev,
            open: false,
        }));
    };

    return (
        <Layout>
            {loading && <Loading/>}
            <Box className={classes.container}>
                <Typography
                    className={classes.title}
                    align="center"
                    variant="h1"
                >
                    Change Password
                </Typography>
                <Snackbar
                    open={snackBar.open}
                    autoHideDuration={4000}
                    onClose={handleSnackBarClose}
                >
                    <Alert
                        onClose={handleSnackBarClose}
                        severity={snackBar.severity}
                    >
                        {snackBar.text}
                    </Alert>
                </Snackbar>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <FormControl className={classes.control} fullWidth>
                        <InputLabel htmlFor="username">New Password</InputLabel>
                        <Input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="username"
                            aria-describedby="my-username-text"
                        />
                        <FormHelperText id="my-username-text">
                            At least 6 ch
                        </FormHelperText>
                    </FormControl>
                    <FormControl className={classes.control} fullWidth>
                        <InputLabel htmlFor="confirm-password">
                            Confirm Password
                        </InputLabel>
                        <Input
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            id="confirm-password"
                            aria-describedby="my-confirm-password-text"
                        />
                        <FormHelperText id="my-confirm-password-text">
                            At least 6 ch
                        </FormHelperText>
                    </FormControl>

                    <Box display="flex" justifyContent="center">
                        <Button
                            type="submit"
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


ChangePassword.getInitialProps = async ({
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

export default withApollo({ssr: true})(ChangePassword);
