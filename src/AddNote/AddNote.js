import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import AppContext from '../AppContext';

export default class AddNote extends Component {

  static contextType = AppContext;

  static defaultProps = {
    folders: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      noteName: '',
      noteValid: false,
      noteContent: '',
      contentValid: false,
      noteFolder: 'b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1',
      validationErrors: {
        noteName: '',
        noteContent: '',
      },
    }
  }
  handleSubmit(event, noteName, noteContent, folderId) {
    event.preventDefault()
    console.log('handle submit ran')
    this.context.addNote(event, noteName, noteContent, folderId);
  }

  validateName(name) {    
    let hasError = false;

    if (name.length === 0) {
      hasError = true;
    }

    this.setState({
      noteValid: !hasError
    })
  }

  validateContent(content) {    
    let hasError = false;

    if (content.length === 0) {
      hasError = true;
    }

    this.setState({
      contentValid: !hasError
    })
  }

  formValid(name) {
    if(this.state.folderNameValid) {
      this.setState({folderName: name})
    }
  }

  updateName(name) {
    this.setState({noteName: name}, () => this.validateName(name))
  }

  updateContent(content) {
    this.setState({noteContent: content}, () => this.validateContent(content))
  }

  updateFolder(folderId) {
    this.setState({noteFolder: folderId})
  }

  render() {
    return (
        <section className='AddNote'>
          <h2>Create a note</h2>
          <NotefulForm onSubmit={(event, name, content, folderId) => this.handleSubmit(event, this.state.noteName, this.state.noteContent, this.state.noteFolder) }>
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name
              </label>
              <input type='text' id='note-name-input' onChange={e => this.updateName(e.target.value)} />
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <textarea id='note-content-input' onChange={e => this.updateContent(e.target.value)} />
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
              </label>
              <select id='note-folder-select' onChange={(e) => this.updateFolder(e.target.value)} >
                {this.context.folders.map(folder =>
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
            </div>
            <div className='buttons'>
              <button type='submit'>
                Add note
              </button>
            </div>
          </NotefulForm>
        </section>
      )
  }
}
