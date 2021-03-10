import { apiProvider } from '../api/api-provider'

const getStudent = (userId, token) => {
  apiProvider
    .getSingle('students', userId, token)
    .then(response => {
      window.localStorage.setItem('name', response.data.student.name)
      window.localStorage.setItem('surname', response.data.student.surname)
      window.localStorage.setItem('lastname', response.data.student.lastname)
      window.localStorage.setItem('qualification', response.data.student.qualification)
      window.localStorage.setItem('languages', response.data.student.languages)
      window.localStorage.setItem('jobExperiences', response.data.student.job_experiences)
    })
    .catch(e => {
      console.log(e.response)
    })
}