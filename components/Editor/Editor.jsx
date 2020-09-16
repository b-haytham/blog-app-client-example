import { Component } from "react";
import { EditorState, RichUtils } from "draft-js";
import Editor from "draft-js-plugins-editor";
import styled from "styled-components";

import createEmojiPlugin from "draft-js-emoji-plugin";
import createToolbarPlugin from "draft-js-static-toolbar-plugin";

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
   
    render(){

        return (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                }}
            >
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
                    plugins={[emogiPlugin, toolbarPlugin]}
                    blockStyleFn={this.myBlockStyleFn}
                />
                <EmojiSuggestions />
                <EmojiSelect />
            </div>
        );
    }
};

export default MyEditor;
