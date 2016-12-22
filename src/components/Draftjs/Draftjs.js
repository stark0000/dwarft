import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import Immutable from 'immutable';
import '../../ressources/App.css';

const blockRenderMap = Immutable.Map({
  'header-two': {
    element: 'h2'
  },
  'unstyled': {
    element: 'unstyled'
  }
});

class Draftjs extends Component {

  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command) {
    console.log(command);
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    console.log("useless");
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  render() {
    return (

      <div className="Editor">
        <button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <button onClick={this.onSaveClick.bind(this)}>Save</button>
        <Editor
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
          blockRenderMap={blockRenderMap}
          />
      </div>
    );
  }
  onSaveClick(e) {
    console.log(e);
    fetch({
      method: 'PUT',
      url: '/api/editor/1',
      data: JSON.stringify(convertToRaw(this.editorState)),
    })
  }
}


export default Draftjs;
