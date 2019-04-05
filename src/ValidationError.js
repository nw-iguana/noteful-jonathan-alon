import React from 'react'

const ValidationError = (props) => {
  if(props.hasError) {
    return (
      <div className="error">{props.message}</div>
    );
  }
  return <></>
}

export default ValidationError