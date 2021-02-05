import React from 'react'
import { Header } from './../../components/Header/index'
import StudentProfile from './../../components/Profile/Student/StudentProfile'

export default function DashboardPage () {
  return (
    <div>
      <Header />
      <StudentProfile />
    </div>
  )
}
