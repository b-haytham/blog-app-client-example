import { gql } from "@apollo/client";
import {
    Box,
    Typography,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Button,
    makeStyles,
    Avatar,
} from "@material-ui/core";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Layout from "../../components/NavBar/Layout";
import {
    UpdateUserInputType,
    useJsonMutation,
    useMeQuery,
    useUpdateUserMutation,
} from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

import ImageIcon from "@material-ui/icons/Image";
import { DropzoneDialog } from "material-ui-dropzone";
import Loading from "../../components/Loading";
import Axios from "axios";

const useStyles = makeStyles({
    container: {
        width: "80%",
        padding: "20px",
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    formControl: {
        margin: "20px 0",
    },
    title: {
        textAlign: "center",
        margin: "15px",
    },
    button: {
        margin: "15px",
        backgroundColor: "black",
        color: "white",
        fontWeight: "bolder",
        "&:hover": {
            color: "black",
            backgroundColor: "white",
            border: "2px solid black",
        },
    },
    avatarContainer: {
        display: "flex",
        flexDirection: "column",
        margin: "20px",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: "200px",
        height: "200px",
        //boxShadow: '2px 2px 2px 4px rgba(0,0,0,0.5)'
        border: "3px solid black",
    },
});

const EditProfile: NextPage = () => {
    const classes = useStyles();
    const router = useRouter();

    const  [json]  = useJsonMutation()

    const [openDropzone, setOpenDropzone] = useState(false);

    const { data, loading, error } = useMeQuery();

    const [
        updateUser,
        { loading: updateUserLoading },
    ] = useUpdateUserMutation();

    const [previewAvatar, setPreviewAvatar] = useState(
        data?.me?.avatar || "/logo.png"
    );

    const [file, setFile] = useState<File | null>(null);

    const [formInfo, setFormInfo] = useState({
        username: data?.me?.username,
        first_name: data?.me?.first_name || "",
        last_name: data?.me?.last_name || "",
        studied_at: data?.me?.studied_at || "",
        work_at: data?.me?.work_at || "",
        github: data?.me?.github || "",
        facebook: data?.me?.facebook || "",
        tweeter: data?.me?.tweeter || "",
        avatar: data?.me?.avatar || "/logo.png",
        short_biography: data?.me?.short_biography || "",
    });

    const handleChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value,
        });
    };

    const onDropSave = (f: File[]) => {
        //@ts-ignore
        setFormInfo((prev) => ({
            ...prev,
            avatar: f[0],
        }));
        setFile(f[0]);
        const reader = new FileReader();
        reader.readAsDataURL(f[0]);
        reader.onloadend = () => {
            console.log(reader.result);
            setPreviewAvatar(reader.result as string);
            setOpenDropzone(false);
        };
    };
    console.log(formInfo.avatar);

    return (
        <Layout>
            {(loading || updateUserLoading) && <Loading />}
            <Typography className={classes.title} variant="h2">
                Edit Profile
            </Typography>
            <button
                onClick={async () => {
                    console.log(formInfo.avatar);
                    const form = new FormData();
                    //@ts-ignore
                    form.append("avatar", file, file?.name);
                    Axios.post("http://localhost:8000/upload", form)
                        .then((resp) => console.log(resp))
                        .catch((err) => console.log(err));
                }}
            >
                test
            </button>
            <button onClick={async()=>{
                const jso = {
                    path: 'hahahahhaha'
                }
                const result = await json({
                    variables: {
                        json: jso
                    }
                })
                console.log(result)
            }}>json</button>
            <Box className={classes.container}>
                <Box className={classes.avatarContainer}>
                    <Avatar src={previewAvatar} className={classes.avatar} />
                    <Button
                        onClick={() => setOpenDropzone(true)}
                        variant="contained"
                        color="secondary"
                        size="large"
                        className={classes.button}
                        startIcon={<ImageIcon />}
                    >
                        Upload thumbnail
                    </Button>
                    <DropzoneDialog
                        open={openDropzone}
                        onClose={() => setOpenDropzone(false)}
                        onSave={onDropSave}
                        acceptedFiles={["image/*"]}
                        filesLimit={1}
                    />
                </Box>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input
                        value={formInfo.username}
                        name="username"
                        onChange={handleChange}
                        id="username"
                        aria-describedby="my-username-text"
                    />
                    <FormHelperText id="my-username-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="first_name">Fist Name</InputLabel>
                    <Input
                        value={formInfo.first_name}
                        name="first_name"
                        onChange={handleChange}
                        id="first_name"
                        aria-describedby="my-first_name-text"
                    />
                    <FormHelperText id="my-first_name-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                    <Input
                        value={formInfo.last_name}
                        name="last_name"
                        onChange={handleChange}
                        id="last_name"
                        aria-describedby="my-last_name-text"
                    />
                    <FormHelperText id="my-last_name-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="studied_at">Studied At</InputLabel>
                    <Input
                        value={formInfo.studied_at}
                        name="studied_at"
                        onChange={handleChange}
                        id="studied_at"
                        aria-describedby="my-studied_at-text"
                    />
                    <FormHelperText id="my-studied_at-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="work_at">Work At</InputLabel>
                    <Input
                        value={formInfo.work_at}
                        name="work_at"
                        onChange={handleChange}
                        id="work_at"
                        aria-describedby="my-work_at-text"
                    />
                    <FormHelperText id="my-work_at-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="short_biography">Short Bio</InputLabel>
                    <Input
                        multiline
                        rowsMin="3"
                        rowsMax="5"
                        value={formInfo.short_biography}
                        name="short_biography"
                        onChange={handleChange}
                        id="short_biography"
                        aria-describedby="my-short_biography-text"
                    />
                    <FormHelperText id="my-short_biography-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="github">Github</InputLabel>
                    <Input
                        value={formInfo.github}
                        name="github"
                        onChange={handleChange}
                        id="github"
                        aria-describedby="my-github-text"
                    />
                    <FormHelperText id="my-github-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>
                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="facebook">Facebook</InputLabel>
                    <Input
                        value={formInfo.facebook}
                        name="facebook"
                        onChange={handleChange}
                        id="facebook"
                        aria-describedby="my-facebook-text"
                    />
                    <FormHelperText id="my-facebook-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>

                <FormControl className={classes.formControl} fullWidth>
                    <InputLabel htmlFor="tweeter">Tweeter</InputLabel>
                    <Input
                        value={formInfo.tweeter}
                        name="tweeter"
                        onChange={handleChange}
                        id="tweeter"
                        aria-describedby="my-tweeter-text"
                    />
                    <FormHelperText id="my-tweeter-text">
                        Must be unique
                    </FormHelperText>
                </FormControl>

                <Button
                    className={classes.button}
                    onClick={async () => {
                        let data = {
                            ...formInfo,
                        };
                        if (formInfo.avatar === "/logo.png") {
                            //@ts-ignore
                            delete data.avatar;
                        }

                        const result = await updateUser({
                            variables: {
                                input: data as UpdateUserInputType,
                            },
                        });
                        console.log(result);
                    }}
                >
                    Submit
                </Button>
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
