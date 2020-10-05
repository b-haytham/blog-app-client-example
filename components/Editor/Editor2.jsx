import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import {
    FormControl,
    Input,
    InputLabel,
    FormHelperText,
    Button,
    makeStyles,
    Box,
    FormControlLabel,
    Switch,
    Select,
    MenuItem,
} from "@material-ui/core";
import { fromObjectToBase64 } from "../../utils/fromObjectToBase64";
import { fromBase64ToObject } from "../../utils/fromBase64ToObject";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SaveIcon from "@material-ui/icons/Save";


const useStyles = makeStyles({
    container: {
        width: "90%",
        margin: "30px auto",
    },
    form: {
        padding: "20px",
        boxShadow: "-8px 22px 19px -19px rgba(0,0,0,0.69)",
        border: "2px solid #171717",
        borderRadius: "25px",
    },
    formControl: {
        margin: "20px 0",
    },
    buttonContainer: {
        margin: "50px auto",
        display: "flex",
        justifyContent: "center",
    },
    button: {
        margin: "15px ",
        backgroundColor: "black",
        color: "white",
        fontWeight: "bolder",
        "&:hover": {
            color: "black",
            backgroundColor: "white",
            border: "2px solid black",
        },
    },
});

/*

    props: {
        isEdit: bool,
        init: {
            title
            description
            content
        }
    }

*/

const Editor2 = (props) => {
    const classes = useStyles();
    const [showForm, setShowForm] = useState(false);

    const [editorState, setEditorState] = useState(
        props.isEdit
            ? EditorState.createWithContent(convertFromRaw(props.init.content))
            : EditorState.createEmpty()
    );
    const [title, setTitle] = useState(props.isEdit ? props.init.title : "");
    const [description, setDescription] = useState(
        props.isEdit ? props.init.description : ""
    );

    const [publish, setPublish] = useState(
        props.isEdit ? props.init.publish : false
    );

    const [thumbnail, setThumbnail] = useState(
        props.isEdit ? props.init.thumbnail : null
    );

    const [category, setCategory] = useState(
        props.isEdit ? props.init.category : ""
    );

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleSave = () => {
        const editorContent = editorState.getCurrentContent();

        const raw = convertToRaw(editorContent);

        const base64Content = fromObjectToBase64(raw);

        let data;

        if (props.isComment) {
            data = {
                content: base64Content,
            };
        } else {
            data = {
                title,
                description,

                content: base64Content,
            };
        }

        props.onSave(data);
    };

    const uploadImageCallBack = (f) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onloadend = () => resolve({ data: { link: reader.result } });
        });
    };

    const onDrop = (f) => {
        console.log(f);
    };

    return (
        <Box className={classes.container}>
            this.
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    image: {
                        uploadCallback: uploadImageCallBack,
                        previewImage: true,
                    },
                }}
            />
            <Box className={classes.buttonContainer}>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    startIcon={
                        showForm ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )
                    }
                >
                    Continue
                </Button>
            </Box>
            {showForm && !props.isComment && (
                <Box className={classes.form}>
                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel htmlFor="title">Post Title</InputLabel>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            id="title"
                            aria-describedby="my-title-text"
                        />
                        <FormHelperText id="my-title-text">Seo</FormHelperText>
                    </FormControl>

                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel htmlFor="description">
                            Post Description
                        </InputLabel>
                        <Input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            id="description"
                            aria-describedby="my-description-text"
                        />
                        <FormHelperText id="my-description-text">
                            Seo
                        </FormHelperText>
                    </FormControl>

                    

                    <FormControl className={classes.formControl} fullWidth>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="demo-mutiple-name"
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                        >
                            <MenuItem value="">Pick Category</MenuItem>
                            {CATEGORY.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <FormControlLabel
                            value="top"
                            control={
                                <Switch
                                    value={publish}
                                    onChange={() => {
                                        setPublish(!publish);
                                        console.log(publish);
                                    }}
                                    color="primary"
                                />
                            }
                            label="Publish"
                            labelPlacement="top"
                        />
                    </FormControl>
                </Box>
            )}
            <Box className={classes.buttonContainer}>
                <Button
                    onClick={handleSave}
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
};

const CATEGORY = [
    "Technology",
    "Health",
    "Science",
    "Business",
    "Culture",
    "Politics",
    "Relationships",
    "Startups",
    "Ai",
    "Computer Science",
    "Programming",
    "Cryptocurrency",
    "Productivity",
    "Education",
];

export default Editor2;
