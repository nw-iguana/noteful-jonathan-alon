import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import AppContext from '../AppContext'
import ValidationError from '../ValidationError'
import './AddFolder.css'

export default class AddFolder extends Component {

  static contextType = AppContext;

  state = {
    folderName: '',
    folderNameValid: false,
    validationMessages: null,
  }
  
  addFolder(folderName) {
    const folder = {
      name: folderName
    }
    const url = 'http://localhost:9090/folders'
    fetch(url, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(folder)
    })
    .then(res=>res.json())
    .then(resJ => {
      this.context.addFolder(resJ)
      this.props.history.push('/')
    });
  }

  handleSubmit(event, folderName) {
    event.preventDefault()
    console.log('handle submit ran')
    this.addFolder(folderName);
  }

  validateFolderName(name) {
    let fieldErrors = this.state.validationMessages;
    let hasError = false;
    const checkFolderNames = this.context.folders.filter(folderName => name.trim().toLowerCase() === folderName.name.toLowerCase());
    
    if (checkFolderNames.length !== 0) {
      fieldErrors = 'Folder name already exists';
      hasError = true;
    }

    if (name.length === 0) {
      fieldErrors = 'Folder must have a name';
      hasError = true;
    }

    this.setState({
      validationMessages: fieldErrors,
      folderNameValid: !hasError
    }, this.formValid(name));
  }

  formValid(name) {
    if(this.state.folderNameValid) {
      this.setState({folderName: name})
    }
  }

  updateFolderName = (e) => {
    this.setState({
      folderName: e.target.value
    }, () => this.validateFolderName(this.state.folderName))
  }
  
  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={(event, name) => this.handleSubmit(event, this.state.folderName)}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' onChange={this.updateFolderName}/>
            <ValidationError hasError={!this.state.folderNameValid} message={this.state.validationMessages}/>
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.folderNameValid}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
