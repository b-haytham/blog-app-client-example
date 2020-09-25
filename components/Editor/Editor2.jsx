import {  useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import {
    FormControl,
    FormLabel,
    Input,
    FormHelperText,
    Textarea,
    Select,
} from "@chakra-ui/core";

const Editor2 = () => {
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
            content: base64Content
        }
        console.log(i)


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
            {/* <FormControl>
                <FormLabel htmlFor="title">Post Title</FormLabel>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    aria-describedby="title-helper-text"
                />
                <FormHelperText id="title-helper-text">For SEO</FormHelperText>

                <FormLabel htmlFor="description">Post Description</FormLabel>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    aria-describedby="description-helper-text"
                />
                <FormHelperText id="description-helper-text">
                    For SEO
                </FormHelperText>
            </FormControl> */}

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

            {/* <FormControl>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    id="category"
                    placeholder="Select Category"
                >
                    <option value="computers-cience">Computer Science</option>
                    <option value="tech"> Tech</option>
                </Select>
                <FormHelperText id="category-helper-text">
                    For SEO
                </FormHelperText>
            </FormControl>

            <Button onClick={handleSave}>Save</Button> */}
        </div>
    );
};

export default Editor2;
