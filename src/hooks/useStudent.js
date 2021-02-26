import { useCallback, useContext } from 'react'
import StudentContext from '../context/StudentContext'
import { apiProvider } from '../services/api/api-provider'

export const useStudent = () => {
  const {
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
  } = useContext(StudentContext)

  const getProfile = useCallback(
    (token, userId) => {
      apiProvider.getSingle('students', userId, token)
        .then(response => {
          if (response.data.student === undefined) {
            console.log('undefined response')
          }
          setName(response.data.student.name)
          setSurname(response.data.student.surname)
          setLastname(response.data.student.lastname)
          setQualification(response.data.student.qualification)
          setLanguages(response.data.student.languages)
          setJobExperiences(response.data.student.job_experiences)
        }
        ).catch(e => {
          console.log(e.response)
        })
    },
    [setJobExperiences, setLanguages, setLastname, setName, setQualification, setSurname]
  )

  const addQualification = useCallback(
    (data, userId, token) => {
      return apiProvider.put('students', userId, {
        qualification: data
      }, token)
        .then(response => { return response.status })
        .catch(e => { console.log(e) })
    },
    []
  )

  return {
    getProfile,
    addQualification,
    name,
    surname,
    lastname,
    qualification,
    languages,
    jobExperiences
  }
}
