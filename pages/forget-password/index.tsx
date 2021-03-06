import { gql } from "@apollo/client";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    makeStyles,
    Snackbar,
    Typography,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { NextPage } from "next";
import { FormEvent, useState } from "react";
import Loading from "../../components/Loading";
import Layout from "../../components/NavBar/Layout";
import { useForgotPasswordMutation } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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

const ForgotPassword: NextPage<Props> = ({}) => {
    const classes = useStyles();

    const [email, setEmail] = useState("");
    
    const [snackBar, setSnackBar] = useState({
        open: false,
        text: '',
        severity: 'success' as "success" | "info" | "warning" | "error" | undefined
    })

    const [forgotPassword, {loading}] = useForgotPasswordMutation()


    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await forgotPassword({
            variables: {
                email
            }
        })

        if(result.data?.forgetPassword){
            setSnackBar({
                open: true,
                text: 'Check your email',
                severity: 'success'
            })
        }else {
            setSnackBar({
                open: true,
                text: 'Something went wrong',
                severity: 'error'
            })
        }
    }

    const  handleSnackBarClose =() => {
        setSnackBar((prev)=>({
            ...prev,
            open: false
        }))
    }

    return (
        <Layout>
            {loading && <Loading/>}
            <Box className={classes.container}>
                <Typography
                    className={classes.title}
                    align="center"
                    variant="h1"
                >
                    Enter E-mail
                </Typography>
                <Snackbar open={snackBar.open} autoHideDuration={4000} onClose={handleSnackBarClose}>
                    <Alert onClose={handleSnackBarClose}  severity={snackBar.severity}>
                        {snackBar.text}
                    </Alert>
                </Snackbar>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <FormControl className={classes.control} fullWidth>
                        <InputLabel htmlFor="email">E-mail</InputLabel>
                        <Input
                            value={email}
                            onChange={(e) =>setEmail(e.target.value)}
                            id="email"
                            aria-describedby="my-email-text"
                        />
                        <FormHelperText id="my-email-text">
                            we will send emil to restore password
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


ForgotPassword.getInitialProps = async ({
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

export default withApollo({ssr: true})( ForgotPassword);

