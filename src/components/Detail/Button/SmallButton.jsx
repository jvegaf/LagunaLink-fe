import React from 'react'
import { Link } from 'react-router-dom'

export const SmallButton = ({ path, content }) => {
  return (
      <Link to={path} className="btn btn-info btn-sm">
        {content}
      </Link>
  )
}
