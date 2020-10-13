import {
    Box,
    Typography,
    Button,
    makeStyles,
    Avatar,
    IconButton,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Layout from "../../components/NavBar/Layout";
import {
    GetCommentsByPostIdDocument,
    useCreateCommentMutation,
    useDislikeMutation,
    useGetPublicPostByIdQuery,
    useLikeMutation,
    useMeQuery,
} from "../../generated/graphql";

import draftjsToHtml from "draftjs-to-html";
import { withApollo } from "../../utils/withApollo";

import Editor from "../../components/Editor/DynamicLoadedEditor";
import PostComments from "../../components/PostComments/PostComments";
import { ThumbDownAlt, ThumbUpAlt } from "@material-ui/icons";
import Loading from "../../components/Loading";
import Axios from "axios";

const useStyles = makeStyles({
    container: {
        width: "100%",
        margin: "0px",
    },
    firstSection: {
        // height: "calc(100vh - 80px)",
        width: "100%",
    },
    firstSectionHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "20px",
        padding: "20px 50px",
    },
    thumbnailWrapper: {},
    thumbnail: {
        width: "100%",
    },
    title: {
        wordWrap: "break-word",
        fontSize: "40px",
        fontWeight: "bolder",
    },
    icon: {
        transition: "all .5s",
        "&:hover": {
            transform: "scale(1.3)",
            color: "black",
        },
    },
    content: {
        margin: "80px auto",
        width: "70%",
        "& p": {
            wordWrap: "break-word",
            margin: "30px 0",
            padding: "15px",
        },
        "& pre": {
            padding: "20px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "25px",
            overflowX: "auto",
            overflowY: "hidden",
            whiteSpace: "nowrap",
        },
        "& h1": {
            textAlign: "center",
            margin: "50px 0",
            fontSize: "60px",
        },
        "& h2": {
            margin: "40px 0",
            fontSize: "50px",
        },
        "& h3": {
            margin: "40px 0",
            fontSize: "40px",
        },
        "& h4": {
            margin: "40px 0",
            fontSize: "35px",
        },
        "& h5": {
            margin: "40px 0",
            fontSize: "30px",
        },
        "& h6": {
            margin: "20px 0",
            fontSize: "25px",
        },
        "& img": {
            
            width: "100% !important",
            margin: "50px auto",
        },
        "& ul, & ol": {
            margin: "50px 0",
            paddingLeft: "100px",
        },
        "& li": {
            margin: "10px",
            fontSize: "1.2 rem",
            fontWeight: "bolder",
        },
        "& blockquote": {
            margin: "20px auto",
            width: "60%",
            fontSize: "1.5rem",
            wordWrap: "break-word",
            color: "#bababa",
            borderLeft: "3px solid #bababa",
        },
    },
});

const Post = () => {
    const classes = useStyles();
    const router = useRouter();
    const { data: meData, loading: meLoading } = useMeQuery();

    const { data, loading, error } = useGetPublicPostByIdQuery({
        variables: {
            postId: +router.query.id!,
        },
    });

    const [likePost, { loading: likeLoading }] = useLikeMutation();

    const [dislikePost, { loading: dislikeLoading }] = useDislikeMutation();

    const [
        createComment,
        { loading: createCommentLoading },
    ] = useCreateCommentMutation();

    if (error) {
        router.push("/");
        console.log(error);
    }

    const html = data?.getPublicPostById
        ? draftjsToHtml(data.getPublicPostById.content)
        : "<p></p>";

    console.log(html);
    const handleSave = async (commentData: any) => {
        console.log(commentData);

        const formData = new FormData();

        commentData.contentFiles.forEach((item: any, i: any) =>
            formData.append("assets", item, item.name)
        );
        formData.append('userId', data?.getPublicPostById.creator.id!)

        const result = await Axios.post(
            "http://localhost:8000/uploads",
            formData
        );
        const entityMapKeys = Object.keys(commentData.content.entityMap);

        for (const key of entityMapKeys) {
            console.log(key);
            commentData.content.entityMap[key].data.src = result.data.files[key].path;
        }

        console.log(result);

        console.log(commentData.content)

        delete commentData.contentFiles

        const createCommentResult = await createComment({
            variables: {
                postId: +router.query.id!,
                content: commentData.content,
            },
            refetchQueries: [{query: GetCommentsByPostIdDocument, variables:{postId: +data?.getPublicPostById.id!}}]
        });
        console.log(createCommentResult);
    };

    const convertDate = (unix_date: number) => {
        const d = new Date(unix_date * 1000);
        return d.toLocaleString();
    };

    return (
        <Layout>
            {(loading ||
                meLoading ||
                likeLoading ||
                dislikeLoading ||
                createCommentLoading) && <Loading />}
            <Box className={classes.container}>
                <Box className={classes.firstSection} component="section">
                    <Box className={classes.firstSectionHeader}>
                        <Box minWidth="60%">
                            <Typography
                                variant="h1"
                                component="h1"
                                className={classes.title}
                            >
                                {data?.getPublicPostById.title}
                            </Typography>
                            <Typography
                                style={{ color: "#bababa" }}
                                variant="subtitle2"
                            >
                                Created@{" "}
                                {convertDate(
                                    +data?.getPublicPostById.created_at!
                                )}
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Avatar
                                src={
                                    data?.getPublicPostById.creator.avatar ||
                                    "/logo.png"
                                }
                            />
                            <Typography style={{ marginLeft: "10px" }}>
                                {data?.getPublicPostById.creator.username}
                            </Typography>
                        </Box>
                    </Box>

                    <div className={classes.thumbnailWrapper}>
                        <img
                            src={
                                data?.getPublicPostById.thumbnail ||
                                "/default-pic.png"
                            }
                            className={classes.thumbnail}
                            alt=""
                        />
                    </div>
                    <Typography
                        align="center"
                        variant="subtitle1"
                        style={{ color: "grey", marginTop: "20px" }}
                    >
                        {data?.getPublicPostById.description}
                    </Typography>
                </Box>

                {!error && data?.getPublicPostById && (
                    <>
                        <Box
                            className={classes.content}
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                        <Box
                            margin="20px auto"
                            display="flex"
                            justifyContent="center"
                        >
                            <IconButton
                                onClick={async () => {
                                    const result = await likePost({
                                        variables: {
                                            parent: "POST",
                                            parentId: +data.getPublicPostById
                                                .id,
                                        },
                                    });
                                    console.log(result);
                                }}
                            >
                                <ThumbUpAlt
                                    fontSize="large"
                                    className={classes.icon}
                                />
                            </IconButton>
                            <IconButton
                                onClick={async () => {
                                    const result = await dislikePost({
                                        variables: {
                                            parent: "POST",
                                            parentId: +data.getPublicPostById
                                                .id,
                                        },
                                    });
                                    console.log(result);
                                }}
                            >
                                <ThumbDownAlt
                                    fontSize="large"
                                    className={classes.icon}
                                />
                            </IconButton>
                        </Box>
                    </>
                )}

                {meData?.me && (
                    <Box width="70%" margin="0 auto">
                        <Editor isComment onSave={handleSave} />
                    </Box>
                )}

                {data?.getPublicPostById.comments.length == 0 && (
                    <Typography
                        variant="h3"
                        style={{ fontSize: "50px", marginBottom: "50px" }}
                        align="center"
                    >
                        Be the first to Comment
                    </Typography>
                )}

                {data?.getPublicPostById && (
                    <PostComments
                        meId={+meData?.me?.id!}
                        postId={+data.getPublicPostById.id}
                    />
                )}
            </Box>
        </Layout>
    );
};

export default withApollo({ ssr: true })(Post);
