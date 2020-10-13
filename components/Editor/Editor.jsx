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
    Typography,
} from "@material-ui/core";

import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import SaveIcon from "@material-ui/icons/Save";
import ImageIcon from "@material-ui/icons/Image";
import VisibilityIcon from "@material-ui/icons/Visibility";

import { DropzoneDialog } from "material-ui-dropzone";
import { blockStyle } from "./blockStyle";

import { TagInput } from "reactjs-tag-input";
import { wrapperStyles, inputStyles, tagStyles } from "./TagComponentStyles";

const useStyles = makeStyles({
    container: {
        width: "90%",
        margin: "30px auto",
    },
    form: {
        padding: "20px",
        boxShadow: "-8px 22px 19px -19px rgba(0,0,0,0.69)",
        border: "2px solid #21a60a",
        borderRadius: "25px",
    },
    formControl: {
        margin: "20px 0",
    },
    buttonContainer: {
        margin: "0px auto",
        display: "flex",
        justifyContent: "center",
    },
    button: {
        margin: "15px",
        backgroundColor: "#21a60a",
        color: "white",
        fontWeight: "bolder",
        "&:hover": {
            color: "#21a60a",
            backgroundColor: "white",
            border: "2px solid #21a60a",
        },
    },
    thumbnail: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    tags: {},
});

/*

    props: {
        isEdit: bool,
        init: {
            title
            description
            content
            tags
            publish
            thumbnail
            category
        }
    }

*/

const Editor2 = (props) => {
    const classes = useStyles();

    // SHOW FORM
    const [showForm, setShowForm] = useState(false);

    const [editorState, setEditorState] = useState(
        props.isEdit
            ? EditorState.createWithContent(convertFromRaw(props.init.content))
            : EditorState.createEmpty()
    );

    //TITLE INPUT
    const [title, setTitle] = useState(props.isEdit ? props.init.title : "");

    //DESCRIPTION INPUT
    const [description, setDescription] = useState(
        props.isEdit ? props.init.description : ""
    );

    const [contentFiles, setContentFiles] = useState([]);

    //TAGS INPUT
    const [tags, setTags] = useState(
        props.isEdit
            ? props.init.tags.map((t, i) => ({ index: i, displayValue: t }))
            : []
    );

    //PUBLISH SWITCH
    const [publish, setPublish] = useState(
        props.isEdit ? props.init.publish : false
    );

    // DROP ZONE MODEL
    const [openDropzone, setOpenDropzone] = useState(false);

    // THUMBNAIL UPLOAD
    const [thumbnail, setThumbnail] = useState(
        props.isEdit ? props.init.thumbnail : "/default-pic.png"
    );

    // PREVIEW UPLOADED IMAGEE
    const [preview, setPreview] = useState(
        props.isEdit ? props.init.thumbnail : "/default-pic.png"
    );

    // CATEGORY SELECT INPUT
    const [category, setCategory] = useState(
        props.isEdit ? props.init.category : ""
    );

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleSave = () => {
        const editorContent = editorState.getCurrentContent();

        const raw = convertToRaw(editorContent);

        const tagsArray = tags.map((t) => t.displayValue);

        let data;

        if (props.isComment) {
            data = {
                content: raw,
                contentFiles,
            };
        } else {
            data = {
                title,
                description,
                contentFiles,
                content: raw,
                tags: tagsArray.join(", "),
                published: publish,
                category: category,
            };
        }

        if (thumbnail !== "/default-pic.png") {
            data.thumbnail = thumbnail;
        }

        props.onSave(data);
    };

    const uploadImageCallBack = (f) => {
        setContentFiles((prev) => [...prev, f]);
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onloadend = () => resolve({ data: { link: reader.result } });
        });
    };

    const onDropSave = (f) => {
        const reader = new FileReader();
        reader.readAsDataURL(f[0]);
        reader.onloadend = () => {
            console.log(reader.result);
            setPreview(reader.result);
            setThumbnail(f[0]);
            setOpenDropzone(false);
        };
    };

    return (
        <Box className={classes.container}>
            <Editor
                stripPastedStyles
                //customBlockRenderFunc={customBlock}
                blockStyleFn={blockStyle}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName={
                    props.isComment
                        ? "editorClassNameComment"
                        : "editorClassName"
                }
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    image: {
                        uploadCallback: uploadImageCallBack,
                        previewImage: true,
                    },
                }}
            />
            {!props.isComment && (
                <Box className={classes.buttonContainer}>
                    <Button
                        onClick={() => setShowForm(!showForm)}
                        variant="contained"
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
            )}
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

                    <Box className={classes.thumbnail}>
                        <img src={preview} alt="image" height="200px" />

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
                            onChange={(f) => {
                                console.log(f[0]);
                            }}
                        />
                    </Box>

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

                    <Box className={classes.tags}>
                        <Typography>Tags</Typography>
                        <TagInput
                            wrapperStyle={wrapperStyles}
                            inputStyle={inputStyles}
                            tagStyle={tagStyles}
                            tags={tags}
                            onTagsChanged={(tags) => setTags(tags)}
                            placeholder="Type Tag and hit enter"
                        />
                    </Box>

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
                        {!props.isComment && (
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                className={classes.button}
                                startIcon={<VisibilityIcon />}
                            >
                                Preview Post
                            </Button>
                        )}
                    </Box>
                </Box>
            )}
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
