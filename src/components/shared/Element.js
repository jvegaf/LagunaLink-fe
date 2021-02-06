import React from 'react'

function Element (props) {
  return (
    <div className="mt-3 mb-3 d-flex w-75 flex-row-reverse">
      <div className="w-75 pl-2 text-dark">{props.content}</div>
      <div className="text-secondary">{props.title}</div>
    </div>
  )
}

export default Element
