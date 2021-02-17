import React, { useState } from 'react'

const StudentContext = React.createContext({})

export function StudentContextProvider ({ children }) {
  const [name, setName] = useState('')

  const [surname, setSurname] = useState('')

  const [lastname, setLastname] = useState('')

  const [qualifications, setQualifications] = useState([])

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
      qualifications,
      setQualifications,
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
