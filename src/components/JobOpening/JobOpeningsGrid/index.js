import React from 'react'
import { JobOpeningCard } from '../JobOpeningCard';

export const JobOpeningsGrid = ({items}) => {
  
  
  return (
      <div className="d-flex flex-wrap justify-content-strech">
        {items?.map(item => <JobOpeningCard key={item._id} item={item} />)}
      </div>
  )
}
