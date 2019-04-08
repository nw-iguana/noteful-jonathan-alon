import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import './AddNote.css'
import AppContext from '../AppContext';
import ValidationError from '../ValidationError'

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
      noteNameError: '',
      noteContentError: '',
    }
  }
  handleSubmit(event, noteName, noteContent, folderId) {
    event.preventDefault()
    console.log('handle submit ran')
    this.addNote(event, noteName, noteContent, folderId);
  }

  validateName(name) {    
    let hasError = false;
    let errorMessage = ''

    if (name.length === 0) {
      hasError = true;
      errorMessage = 'Note name is required'
    }

    this.setState({
      noteValid: !hasError,
      noteNameError: errorMessage,
    })
  }
  
  validateContent(content) {    
    let hasError = false
    let errorMessage = ''

    if (content.length === 0) {
      hasError = true;
      errorMessage = 'Note must have content'
    }

    this.setState({
      contentValid: !hasError,
      noteContentError: errorMessage
    })
  }

  formValid(name) {
    if(this.state.folderNameValid) {
      this.setState({folderName: name})
    }
  }

  updateName = (e) => {
    let name = e.target.value
    this.setState({noteName: name}, () => this.validateName(name))
  }

  updateContent = (e) => {
    let content = e.target.value
    this.setState({noteContent: content}, () => this.validateContent(content))
  }

  updateFolder = (e) => {
    let folderId = e.target.value
    this.setState({noteFolder: folderId})
  }

  addNote(event, noteName, noteContent, folderId) {
    console.log('noteName', noteName);
    const newNote = {
      name: noteName, 
      content: noteContent, 
      folderId: folderId,
      modified: new Date(),
    }
    const url = 'http://localhost:9090/notes'
    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNote)
    })
    .then(response => response.json())
    .then(resJ => {
        this.context.addNote(resJ)
        this.props.history.push(`/note/${resJ.id}`)
    })
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
              <ValidationError hasError={!this.state.noteValid} message={this.state.noteNameError}/>
                <input type='text' id='note-name-input' onChange={this.updateName} />
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <ValidationError hasError={!this.state.contentValid} message={this.state.noteContentError} />
              <textarea id='note-content-input' onChange={this.updateContent} />
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
              </label>
              <select id='note-folder-select' onChange={this.updateFolder} >
                {this.context.folders.map(folder =>
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
            </div>
            <div className='buttons'>
              <button type='submit' disabled={!this.state.noteValid || !this.state.contentValid}>
                Add note
              </button>
            </div>
          </NotefulForm>
        </section>
      )
  }
}
