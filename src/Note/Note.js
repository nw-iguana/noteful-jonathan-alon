import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Note.css'
import AppContext from '../AppContext';

export default function Note(props) {
  return (
    <div className='Note'>
      <AppContext.Consumer>
        {context => (
            <>
            <h2 className='Note__title'>
              <Link to={`/note/${props.id}`}>
                {props.name}
              </Link>
            </h2>
            <button className='Note__delete' type='button' onClick={(id) => context.deleteNote(props.id)}>
              <FontAwesomeIcon icon='trash-alt' />
              {' '}
              remove
            </button>
            <div className='Note__dates'>
              <div className='Note__dates-modified'>
                Modified
                {' '}
                <span className='Date'>
                  {format(props.modified, 'Do MMM YYYY')}
                </span>
              </div>
            </div>
            </>
          )
        }
      </AppContext.Consumer>
    </div>
  )
}
