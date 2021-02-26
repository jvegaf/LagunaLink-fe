import React, { useState } from 'react'

const StudentContext = React.createContext({})

export function StudentContextProvider ({ children }) {
  const [name, setName] = useState('')

  const [surname, setSurname] = useState('')

  const [lastname, setLastname] = useState('')

  const [qualification, setQualification] = useState({})

  const [languages, setLanguages] = useState([])

  const [jobExperiences, setJobExperiences] = useState([])

  return (
    <StudentContext.Provider value={{
      name,
      setName,
      surname,
      setSurname,
      lastname,
      setLastname,
      qualification,
      setQualification,
      languages,
      setLanguages,
      jobExperiences,
      setJobExperiences
    }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export default StudentContext
