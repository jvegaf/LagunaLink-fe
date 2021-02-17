import React from 'react'
import { Link } from 'react-router-dom'
import './styles.css'

export const DetailButton = ({ path, content }) => {
  return (
    <div className="flex-center mt-3">
      <Link to={path} className="btn btn-info">
        {content}
      </Link>
    </div>
  )
}
