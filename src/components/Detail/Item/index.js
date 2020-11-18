import React from 'react'
import './styles.css';

export const DetailItem = ({item}) => {
  return (
    <div className="flex-column">
      <p className="item-title">{item.title}</p>
      <p className="item-content">{item.content}</p>
    </div>
  )
}
