import React from 'react'
import '../__shared__/styles.css'
import { CompanyRegister } from '../../components/Register/Company/CompanyRegister/CompanyRegister'
import { StudentRegister } from '../../components/Register/Student/StudentRegister/StudentRegister'

export const RegisterPage = (props) => {
  const accType = props.match.params.accountType

  return (
    <div className="container-fluid vh-100 ll-bg">
      <div className="row h-100">
        <div className="col-12 d-flex align-items-center justify-content-center">
          {accType === 'student' ? <StudentRegister /> : <CompanyRegister />}
        </div>
      </div>
    </div>
  )
}
