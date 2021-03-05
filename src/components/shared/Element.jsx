import React from 'react'

export const Element = props => {
  return (
    <div className="mt-3 d-flex w-75 flex-row-reverse">
      <div className="w-75 pl-4 fw500">{props.content}</div>
      <div className="text-secondary">{props.title}</div>
    </div>
  )
}
