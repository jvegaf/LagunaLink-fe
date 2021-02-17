import { useCallback, useContext } from 'react'
import StudentContext from '../context/StudentContext'
import { GetStudentProfile } from '../services/student/GetProfile'

export const useStudent = () => {
  const {
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
  } = useContext(StudentContext)
  const getProfile = useCallback(
    (token, userId) => {
      GetStudentProfile(token, userId)
        .then(student => {
          if (student === undefined) {
            console.log('undefined response')
          }
          setName(student.name)
          setSurname(student.surname)
          setLastname(student.lastname)
          setQualifications(student.qualifications)
          setLanguages(student.languages)
          setJobExperiences(student.job_experiences)
        }
        ).catch(e => {
          console.log(e.response)
        })
    },
    [setJobExperiences, setLanguages, setLastname, setName, setQualifications, setSurname]
  )
  return {
    getProfile,
    name,
    surname,
    lastname,
    qualifications,
    languages,
    jobExperiences
  }
}
