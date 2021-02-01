import React, { useContext } from 'react'
import { Header } from '../../components/Header'
import { JobOpeningsGrid } from '../../components/JobOpening/JobOpeningsGrid'
import Context from '../../context/UserContext'
import '../__shared__/styles.css'

export function MainPage () {
  const { email } = useContext(Context)

  return (
    <div>
      <Header email={email} />
      <JobOpeningsGrid />
    </div>
  )
};
