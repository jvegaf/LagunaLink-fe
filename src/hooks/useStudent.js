import { useCallback } from 'react'
import { GetProfile } from '../services/student/GetProfile'
import { useUser } from './useUser'

export const useStudent = () => {
  const { token, userId } = useUser()

  const getStudentProfile = useCallback(
    () => {
      GetProfile({ token, userId })
        .then(response => {
          if (response === undefined) {
            return
          }
          console.log(response)
        }
        ).catch(e => {
          console.log(e.response)
        })
    },
    [token, userId]
  )
  return {
    getStudentProfile
  }
}
