import { useCallback, useContext } from 'react'
import StudentContext from '../context/StudentContext'
import { apiProvider } from '../services/api/api-provider'

export const useStudent = () => {
  const token = window.localStorage.getItem('access_token')
  const userId = window.localStorage.getItem('user_id')
  const { name, surname, lastname, qualification, languages, jobExperiences } = useContext(StudentContext)

  const registerStudent = useCallback(
    data => {
      return apiProvider
        .post('/students', data, token)
        .then(response => {
          return response.status
        })
        .catch(e => {
          console.log(e)
        })
    },
    [token]
  )

  const updateStudent = useCallback(
    data => {
      return apiProvider
        .put('students', userId, data, token)
        .then(response => {
          return response.status
        })
        .catch(e => {
          console.log(e)
        })
    },
    [token, userId]
  )

  const addQualification = useCallback(
    data => {
      return apiProvider
        .put(
          'students',
          userId,
          {
            qualification: data,
          },
          token
        )
        .then(response => {
          return response.status
        })
        .catch(e => {
          console.log(e)
        })
    },
    [token, userId]
  )

  const addLanguage = useCallback(
    data => {
      languages.push(data)
      return apiProvider
        .put(
          'students',
          userId,
          {
            languages: languages,
          },
          token
        )
        .then(response => {
          return response.status
        })
        .catch(e => {
          console.log(e)
        })
    },
    [languages, token, userId]
  )

  const addJobExperience = useCallback(
    data => {
      jobExperiences.push(data)
      return apiProvider
        .put(
          'students',
          userId,
          {
            job_experiences: jobExperiences,
          },
          token
        )
        .then(response => {
          return response.status
        })
        .catch(e => {
          console.log(e)
        })
    },
    [jobExperiences, token, userId]
  )

  const navItems = [
    {
      icon: 'user-circle',
      name: 'Cuenta',
    },
    {
      icon: 'graduation-cap',
      name: 'Curriculum',
    },
    {
      icon: 'industry',
      name: 'Exp. Laboral',
    },
    {
      icon: 'highlighter',
      name: 'Ofertas Aplicadas',
    },
  ]

  return {
    registerStudent,
    updateStudent,
    addQualification,
    addLanguage,
    addJobExperience,
    name,
    surname,
    lastname,
    qualification,
    languages,
    jobExperiences,
    navItems,
  }
}
