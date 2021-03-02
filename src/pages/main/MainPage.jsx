import React from 'react'
import { Redirect } from 'react-router-dom'
import { Header } from '../../components/Header/Header'
import '../__shared__/styles.css'
import { useUser } from '../../hooks/useUser'

export function MainPage () {
  const { isSigned } = useUser()

  if (isSigned) {
    return (
    <div>
      <Header />
    </div>
    )
  }

  return <Redirect to='/signin' />
};
