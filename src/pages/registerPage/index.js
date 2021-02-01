import React from 'react'
import '../__shared__/styles.css'
import { CompanyRegister } from '../../components/Register/Company/CompanyRegister'
import { StudentRegister } from '../../components/Register/Student/StudentRegister'

export const register = (props) => {
  const accType = props.match.params.accountType

  return (
    <div className="row m-0 p-0">
      <div className="col-12 center">
        {accType === 'student' ? <StudentRegister /> : <CompanyRegister />}
      </div>
    </div>
  )
}
