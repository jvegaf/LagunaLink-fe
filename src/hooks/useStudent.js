import { useCallback, useContext } from 'react'
import StudentContext from '../context/StudentContext'
import { apiProvider } from '../services/api/api-provider'
import { useUser } from './useUser'

export const useStudent = () => {
  const { token, userId } = useUser()
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
    () => {
      apiProvider.getSingle('students', userId, token)
        .then(response => {
          if (response.data.student === undefined) {
            console.log('undefined response')
          }
          setName(response.data.student.name)
          setSurname(response.data.student.surname)
          setLastname(response.data.student.lastname)
          setQualification(response.data.student.qualification)
          setLanguages(response.data.student.languages || [])
          setJobExperiences(response.data.student.job_experiences || [])
        }
        ).catch(e => {
          console.log(e.response)
        })
    },
    [setJobExperiences, setLanguages, setLastname, setName, setQualification, setSurname, token, userId]
  )

  const registerStudent = useCallback(
    (data) => {
      return apiProvider.post('/students', data, token)
        .then(response => { return response.status })
        .catch(e => { console.log(e) })
    },
    [token]
  )

  const addQualification = useCallback(
    (data) => {
      return apiProvider.put('students', userId, {
        qualification: data
      }, token)
        .then(response => { return response.status })
        .catch(e => { console.log(e) })
    },
    [token, userId]
  )

  const addLanguage = useCallback(
    (data) => {
      languages.push(data)
      return apiProvider.put('students', userId, {
        languages: languages
      }, token)
        .then(response => { return response.status })
        .catch(e => { console.log(e) })
    },
    [languages, token, userId]
  )

  const addJobExperience = useCallback(
    (data) => {
      jobExperiences.push(data)
      return apiProvider.put('students', userId, {
        job_experiences: jobExperiences
      }, token)
        .then(response => { return response.status })
        .catch(e => { console.log(e) })
    },
    [jobExperiences, token, userId]
  )

  const studentNavItems = [
    {
      icon: 'user-circle',
      name: 'Cuenta'
    },
    {
      icon: 'graduation-cap',
      name: 'Curriculum'
    },
    {
      icon: 'industry',
      name: 'Exp. Laborales'
    },
    {
      icon: 'highlighter',
      name: 'Ofertas Aplicadas'
    }
  ]

  return {
    getProfile,
    registerStudent,
    addQualification,
    addLanguage,
    addJobExperience,
    name,
    surname,
    lastname,
    qualification,
    languages,
    jobExperiences,
    studentNavItems
  }
}
