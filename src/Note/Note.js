import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import AppContext from '../AppContext';

export default class Note extends Component {
  // componentDidMount() {
  //   if (this.props.name === 'Dogs') {
  //     throw new Error ('Not a valid list item')
  //   }
  // }

  render() {
    return (
      <div className='Note'>
        <AppContext.Consumer>
          {context => (
              <div>
              <h2 className='Note__title'>
                <Link to={`/note/${this.props.id}`}>
                  {this.props.name}
                </Link>
              </h2>
              <Link to={`/`}>
                <button className='Note__delete' type='button' onClick={() => {context.deleteNote(this.props.id)}}>
                <FontAwesomeIcon icon='trash-alt' />
                {' '}
                remove
                </button>
              </Link>
              <div className='Note__dates'>
                <div className='Note__dates-modified'>
                  Modified
                  {' '}
                  <span className='Date'>
                    {format(this.props.modified, 'Do MMM YYYY')}
                  </span>
                </div>
              </div>
              </div>
            )
          }
        </AppContext.Consumer>
      </div>
    )
  }
}

Note.defaultProps = {
  modified: 'No Date Provided'
}

Note.propTypes = {
  id: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  modified: propTypes.string
}