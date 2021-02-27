import React from 'react'
import { Header } from '../../components/Header/Header'
import { CompanyProfile } from '../../components/Profile/CompanyProfile'
import { StudentProfile } from '../../components/Profile/StudentProfile'
import { useUser } from '../../hooks/useUser'
import '../__shared__/styles.css'

export default function DashboardPage () {
  const { userRole } = useUser()

  const profiler = userRole === 'ROLE_STUDENT' ? <StudentProfile /> : <CompanyProfile />
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <div className="container-fluid ll-bg w-100 d-flex flex-grow-1 align-items-center justify-content-center">
        { profiler }
      </div>
    </div>
  )
}
