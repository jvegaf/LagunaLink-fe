import React, { useState } from 'react'

const StudentContext = React.createContext({})

export function StudentContextProvider({ children }) {
  const [name, setName] = useState(() => window.localStorage.getItem('name'))

  const [surname, setSurname] = useState(() => window.localStorage.getItem('surname'))

  const [lastname, setLastname] = useState(() => window.localStorage.getItem('lastname'))

  const [qualification, setQualification] = useState(() => window.localStorage.getItem('qualification'))

  const [languages, setLanguages] = useState(() => window.localStorage.getItem('languages'))

  const [jobExperiences, setJobExperiences] = useState(() => window.localStorage.getItem('jobExperiences'))

  return (
    <StudentContext.Provider
      value={{
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
        setJobExperiences,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}

export default StudentContext
