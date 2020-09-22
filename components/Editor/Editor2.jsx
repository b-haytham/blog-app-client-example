import { Component, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";

import Button from "../Form/Button";

const Editor2 = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState);
    };

    const handleSave = () => {
        const editorContent = editorState.getCurrentContent();
        console.log(convertToRaw(editorContent));

        const raw = convertToRaw(editorContent)
        const base64Content =  btoa(JSON.stringify(raw))
        console.log(base64Content)
    };

    const uploadImageCallBack = (f) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(f);
            reader.onloadend = () => resolve({ data: { link: reader.result } });
        });
    };

    return (
        <div style={{ width: "100%", height: "500px" }}>
            <Button onClick={handleSave}>Save</Button>
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
            <div>{}</div>
        </div>
    );
};

export default Editor2;