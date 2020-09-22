import { Component } from "react";
import { convertToRaw, EditorState, RichUtils } from "draft-js";
import Editor, {composeDecorators} from "draft-js-plugins-editor";
import styled from "styled-components";

import createEmojiPlugin from "draft-js-emoji-plugin";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";

import createImagePlugin from 'draft-js-image-plugin';

import createAlignmentPlugin from 'draft-js-alignment-plugin';

import createFocusPlugin from 'draft-js-focus-plugin';

import createResizeablePlugin from 'draft-js-resizeable-plugin';

import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';

import createDragNDropUploadPlugin from '@mikeljames/draft-js-drag-n-drop-upload-plugin';



import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from "draft-js-buttons";
import Button from "../Form/Button";

const ToolBarButton = styled.button`
    width: 45px;
    height: 45px;
    background-color: white;
    border-radius: 50%;
    text-align: center;
    font-weight: bold;
    font-size: 1.3rem;
`;

const ToolBarStyled = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 20px;
    background-color: grey;
    border-radius: 15px 15px 0 0;
`;

const emogiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emogiPlugin;

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
const imagePlugin = createImagePlugin({ decorator });

const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
    handleUpload: (f)=> console.log(f),
    addImage: imagePlugin.addImage,
  });
  
  const plugins = [
    dragNDropFileUploadPlugin,
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
    emogiPlugin,
    toolbarPlugin
  ];

class MyEditor extends Component {
    
    constructor(props) {
        super(props)
        this.state={
            editorState: EditorState.createEmpty()
        }
        this.onChange = editorState => this.setState({editorState})
    }

    

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return "handled";
        }

        return "not-handled";
    };

    myBlockStyleFn(contentBlock) {
        const type = contentBlock.getType();
        if (type === 'blockquote') {
          return 'superFancyBlockquote';
        }
        if (type === 'code-block' ) {
            return 'fancyCodeBlock';
        }
    }
   

    handleSave = () => {
        const editorContent = this.state.editorState.getCurrentContent()
        console.log(convertToRaw(editorContent))
    }


    focus = () => {
        this.editor.focus()
    }

    render(){

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                }}
                onClick={this.focus}
            >
                <Button onClick={this.handleSave}>Save</Button>
                <Toolbar>
                    {
                        // may be use React.Fragment instead of div to improve perfomance after React 16
                        (externalProps) => (
                            <div>
                                <BoldButton {...externalProps} />
                                <ItalicButton {...externalProps} />
                                <UnderlineButton {...externalProps} />
                                <CodeButton {...externalProps} />
                                <UnorderedListButton {...externalProps} />
                                <OrderedListButton {...externalProps} />
                                <BlockquoteButton {...externalProps} />
                                <CodeBlockButton {...externalProps} />
                            </div>
                        )
                    }
                </Toolbar>
    
                <Editor
                    handleKeyCommand={this.handleKeyCommand}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    ref={(element)=> this.editor = element}
                    plugins={plugins}
                    blockStyleFn={this.myBlockStyleFn}
                />
                <EmojiSuggestions />
                <EmojiSelect />
            </div>
        );
    }
};

export default MyEditor;
