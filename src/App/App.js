import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AppContext from '../AppContext'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import { getNotesForFolder, findNote, findFolder } from '../notes-helpers'
import './App.css'
import ErrorBoundary from '../ErrorBoundary'

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    this.fetchNote()
    this.fetchFolder()
  }

  fetchNote = () => {
    fetch('http://localhost:9090/notes')
      .then(res => res.json())
      .then(resJson => this.setState({
        notes: resJson,
      }))
  }

  fetchFolder = (folder) => {
    fetch('http://localhost:9090/folders')
      .then(res => res.json())
      .then(resJson => this.setState({
        folders: resJson,
      }))
      .catch(error => console.log(error))
  }

  renderNavRoutes() {
    const { notes, folders } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId) || {}
            const folder = findFolder(folders, note.folderId)
            return (
              <NotePageNav
                {...routeProps}
                folder={folder}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    const { notes } = this.state
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            render={routeProps => {
              const { folderId } = routeProps.match.params
              const notesForFolder = getNotesForFolder(notes, folderId)
              return (
                <NoteListMain
                  {...routeProps}
                  notes={notesForFolder}
                />
              )
            }}
          />
        )}
        <Route
          path='/note/:noteId'
          render={routeProps => {
            const { noteId } = routeProps.match.params
            const note = findNote(notes, noteId)
            return (
              <NotePageMain
                {...routeProps}
                note={note}
              />
            )
          }}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  deleteNote = (id) => {
    console.log('id', id);
    const url = `http://localhost:9090/notes/${id}`
    fetch(url, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => this.fetchNote())
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.deleteNote,
      addFolder: this.fetchFolder,
      addNote: this.fetchNote,
      componentDidMount: this.componentDidMount,
    }

    return (
      <AppContext.Provider value={contextValue}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <ErrorBoundary>
            <main className='App__main'>
              {this.renderMainRoutes()}
            </main>
          </ErrorBoundary>
        </div>
      </AppContext.Provider>
    )
  }
}

export default App
