import React from 'react'
import { Link } from 'react-router-dom'

export const DetailButton = ({ path, content }) => {
  return (
      <Link to={path} className="btn btn-info">
        {content}
      </Link>
  )
}
