import React from 'react'
import PropTypes from 'prop-types'
import './NotefulForm.css'

export default function NotefulForm(props) {
  const { className, ...otherProps } = props
  console.log('otherProps', otherProps);
  return (
    <form
      className={['Noteful-form', className].join(' ')}
      action='#'
      {...otherProps}
    />
  )
}

NotefulForm.propTypes = {
  className: PropTypes.string,
  otherProps: PropTypes.object.isRequired
}