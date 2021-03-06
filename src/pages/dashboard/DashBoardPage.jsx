import React from 'react'
import { Header } from '../../components/header/Header'
import { useUser } from '../../hooks/useUser'
import '../__shared__/styles.css'
import { StudentProfile } from '../../components/Profile/StudentProfile'
import { CompanyProfile } from '../../components/Profile/CompanyProfile'

export default function DashboardPage() {
  const {userRole} = useUser()
  const profile = userRole === 'ROLE_STUDENT' ? <StudentProfile/> : <CompanyProfile/>

  return (
    <div className="vh-100 pd-toolbar">
      <Header/>
      {profile}
    </div>
  )
}
