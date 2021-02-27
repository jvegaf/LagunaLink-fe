import React from 'react'
import { Link } from 'react-router-dom'

export const SmallButton = ({ path, content }) => {
  return (
      <Link to={path} className="badge badge-info">
        {content}
      </Link>
  )
}
