import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import { FormControl, Input, InputLabel, FormHelperText, Button, makeStyles} from "@material-ui/core";



const useStyles = makeStyles({
    form: {
        margin: '20px 0'
    }
})


const Editor2 = (props) => {

    const classes = useStyles()

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleSave = () => {
        const editorContent = editorState.getCurrentContent();
        console.log(convertToRaw(editorContent));

        const raw = convertToRaw(editorContent);
        const base64Content = btoa(JSON.stringify(raw));
        console.log(base64Content);

        const i = {
            title,
            description,
            category,
            content: base64Content,
        };
        
        props.onSave(i)

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
                <FormHelperText id="my-title-text">
                    Seo
                </FormHelperText>
            </FormControl>

            <FormControl className={classes.form} fullWidth>
                    <InputLabel htmlFor="description">Post Description</InputLabel>
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
            <Button className={classes.form} onClick={handleSave}> Save </Button>
        </div>
    );
};

export default Editor2;
