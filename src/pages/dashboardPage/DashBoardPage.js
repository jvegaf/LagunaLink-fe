import React from 'react'
import { Header } from '../../components/Header/Header'
import Profile from '../../components/Profile/Profile'
import { useStudent } from '../../hooks/useStudent'
import '../__shared__/styles.css'

export default function DashboardPage () {
  const { getStudentProfile } = useStudent()

  const data = getStudentProfile()
  console.log(data)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div className="container-fluid ll-bg w-100 d-flex flex-grow-1 align-items-center justify-content-center">
        <Profile />
      </div>
    </div>
  )
}
