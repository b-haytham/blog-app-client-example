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
} from "@material-ui/core";
import { fromObjectToBase64 } from "../../utils/fromObjectToBase64";

const useStyles = makeStyles({
    form: {
        margin: "20px 0",
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

    const [editorState, setEditorState] = useState(
        props.isEdit
            ? EditorState.createWithContent(convertFromRaw(props.init.content))
            : EditorState.createEmpty()
    );
    const [title, setTitle] = useState(props.isEdit ? props.init.title : "");
    const [description, setDescription] = useState(props.isEdit ? props.init.description : "");

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    

    const handleSave = () => {
        const editorContent = editorState.getCurrentContent();

        const raw = convertToRaw(editorContent);

        const base64Content = fromObjectToBase64(raw);

        const i = {
            title,
            description,

            content: base64Content,
        };

        props.onSave(i);
    };

    const uploadImageCallBack = (f) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onloadend = () => resolve({ data: { link: reader.result } });
        });
    };

    return (
        <div style={{ width: "100%" }}>
            <FormControl className={classes.form} fullWidth>
                <InputLabel htmlFor="title">Post Title</InputLabel>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    aria-describedby="my-title-text"
                />
                <FormHelperText id="my-title-text">Seo</FormHelperText>
            </FormControl>

            <FormControl className={classes.form} fullWidth>
                <InputLabel htmlFor="description">Post Description</InputLabel>
                <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    aria-describedby="my-description-text"
                />
                <FormHelperText id="my-description-text">Seo</FormHelperText>
            </FormControl>
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
            <Button className={classes.form} onClick={handleSave}>
                {" "}
                Save{" "}
            </Button>
        </div>
    );
};

export default Editor2;
