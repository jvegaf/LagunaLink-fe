import { useCallback } from 'react'
import { GetStudentProfile } from '../services/student/GetProfile'

export const useStudent = () => {
  const getStudentProfile = useCallback(
    (token, userId) => {
      GetStudentProfile(token, userId)
        .then(response => {
          if (response === undefined) {
            console.log('undefined rsponse')
          }
          console.log(response)
        }
        ).catch(e => {
          console.log(e.response)
        })
    },
    []
  )
  return {
    getStudentProfile
  }
}
