import React from 'react'

function Element (props) {
  return (
    <div className="d-flex row">
      <div className="text-secondary">{props.title}</div>
      <div className="ml-2 text-body">{props.content}</div>
    </div>
  )
}

export default Element
