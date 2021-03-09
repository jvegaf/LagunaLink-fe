import { useCallback, useContext } from 'react'
import CompanyContext from '../context/CompanyContext'
import { apiProvider } from '../services/api/api-provider'
import { useUser } from './useUser'

export const useCompany = () => {
  const { token, userId } = useUser()
  const {
    name,
    setName,
    description,
    setDescription,
    address,
    setAddress,
    postalCode,
    setPostalCode,
    region,
    setRegion,
    city,
    setCity,
  } = useContext(CompanyContext)

  const getCompanyProfile = useCallback((id, toKen) => {
    apiProvider
      .getSingle('companies', id, toKen)
      .then(response => {
        setName(response.data.company.name)
        setDescription(response.data.company.description)
        setAddress(response.data.company.address)
        setPostalCode(response.data.company.postalCode)
        setRegion(response.data.company.region)
        setCity(response.data.company.city)
      })
      .catch(e => {
        console.log(e.response)
      })
  }, [userId, token, setName, setDescription, setAddress, setPostalCode, setRegion, setCity])

  const registerCompany = useCallback(
    data => {
      return apiProvider
        .post('/companies', data, token)
        .then(response => {
          return response.status
        })
        .catch(e => {
          console.log(e)
        })
    },
    [token]
  )

  const companyNavItems = [
    {
      icon: 'user-circle',
      name: 'Cuenta',
    },
    {
      icon: 'industry',
      name: 'Vacantes Publicadas',
    },
    {
      icon: 'edit',
      name: 'Crear Vacante',
    },
  ]

  return {
    getCompanyProfile,
    registerCompany,
    name,
    description,
    address,
    postalCode,
    region,
    city,
    companyNavItems,
  }
}
