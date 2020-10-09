import {
    Avatar,
    Box,
    IconButton,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { Facebook, GitHub, Twitter } from "@material-ui/icons";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Layout from "../../components/NavBar/Layout";
import PostsContainer from "../../components/PostsContainer/PostsContainer";
import { useGetUserByUsernameQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const useStyles = makeStyles({
    title: {
        textAlign: "center",
        margin: "5px 0",
        fontSize: "30px",
        fontWeight: "bolder",
        color: "#1c1b1b",
    },
    container: {
        margin: "20px auto",
        width: "80%",
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: "150px",
        height: "150px",
    },
    info: {
        display: "flex",
        flexDirection: "column",
        padding: "20px",
    },
    italic: {
        color: "#4f4d4d",
        fontStyle: "italic",
    },
    social: {
        margin: "50px auto",
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid #4f4d4d",
        transition: "all 0.5s",
        transitionDelay: "0.2s",
    },
    github: {
        fontSize: "50px",
        transition: "all 0.5s",
        "&:hover": {
            color: "black",
            transform: "scale(1.3)",
        },
    },
    tweeter: {
        fontSize: "50px",
        transition: "all 0.5s",
        "&:hover": {
            color: "#00acee",
            transform: "scale(1.3)",
        },
    },
    facebook: {
        fontSize: "50px",
        transition: "all 0.5s",
        "&:hover": {
            color: "#3b5998",
            transform: "scale(1.3)",
        },
    },

    bioWarpper: {
        margin: "50px auto",
        width: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    bio: {
        width: "400px",
        wordWrap: "break-word",
        color: "#4a4c4f",
        fontFamily: "Roboto",
    },
});

const UserIndex = () => {
    const classes = useStyles();
    const router = useRouter();

    const socialRef = useRef<HTMLDivElement>(null);

    const { data, error, loading } = useGetUserByUsernameQuery({
        variables: {
            username: router.query.user as string,
        },
    });

    useEffect(() => {
        if ((!data?.getUser && !loading) || error) {
            router.replace("/");
        }
    }, [data, error, loading, router]);

    return (
        <Layout>
            <Box className={classes.container}>
                <Box className={classes.header}>
                    <Avatar
                        className={classes.avatar}
                        src={data?.getUser.avatar || "logo.png"}
                    />
                    <Box className={classes.info}>
                        <Typography className={classes.title}>
                            @{data?.getUser.username}
                        </Typography>
                        <Typography>
                            Studied@{" "}
                            <span className={classes.italic}>
                                {data?.getUser.studied_at}
                            </span>
                        </Typography>
                        <Typography>
                            Works@{" "}
                            <span className={classes.italic}>
                                {data?.getUser.work_at}
                            </span>
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.bioWarpper}>
                    <Typography variant="h5" gutterBottom>
                        Bio
                    </Typography>
                    <Typography className={classes.bio} align="center">
                        {data?.getUser.short_biography}
                    </Typography>
                </Box>
                <div ref={socialRef} className={classes.social}>
                    <IconButton>
                        <Twitter
                            onMouseOver={() => {
                                socialRef.current!.style.borderBottom =
                                    "2px solid #00acee";
                                // socialRef.current!.style.transition = "2px 0 2px 2px #00acee"
                            }}
                            onMouseLeave={() => {
                                socialRef.current!.style.borderBottom =
                                    "2px solid #4f4d4d";
                            }}
                            className={classes.tweeter}
                            fontSize="large"
                        />
                    </IconButton>
                    <IconButton>
                        <GitHub
                            onMouseOver={() => {
                                socialRef.current!.style.borderBottom =
                                    "2px solid black";
                                // socialRef.current!.style.transition = "2px 0 2px 2px #00acee"
                            }}
                            onMouseLeave={() => {
                                socialRef.current!.style.borderBottom =
                                    "2px solid #4f4d4d";
                            }}
                            className={classes.github}
                            fontSize="large"
                        />
                    </IconButton>
                    <IconButton>
                        <Facebook
                            onMouseOver={() => {
                                socialRef.current!.style.borderBottom =
                                    "2px solid #3b5998";
                                // socialRef.current!.style.transition = "2px 0 2px 2px #00acee"
                            }}
                            onMouseLeave={() => {
                                socialRef.current!.style.borderBottom =
                                    "2px solid #4f4d4d";
                            }}
                            className={classes.facebook}
                            fontSize="large"
                        />
                    </IconButton>
                </div>
                {data?.getUser && (
                    <Box>
                        <PostsContainer
                            data={{
                                posts: data.getUser.posts,
                                kind: "user",
                                avatar: data.getUser.avatar,
                                username: data.getUser.username,
                            }}
                        />
                    </Box>
                )}
            </Box>
        </Layout>
    );
};

export default withApollo({ ssr: true })(UserIndex);
