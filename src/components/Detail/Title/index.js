import React from 'react'
import './styles.css';

export const DetailTitle = ({ content }) => {
  return (
    <div className="flex-center">
      <h2 className="title-style">{content}</h2>
    </div>
  )
}
