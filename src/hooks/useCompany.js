import { useCallback, useContext } from 'react'
import CompanyContext from '../context/CompanyContext'
import { GetCompanyProfile } from '../services/company/GetProfile'

export const useCompany = () => {
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
    setCity
  } = useContext(CompanyContext)
  const getProfile = useCallback(
    (token, userId) => {
      GetCompanyProfile(token, userId)
        .then(company => {
          if (company === undefined) {
            console.log('undefined response')
          }
          setName(company.name)
          setDescription(company.description)
          setAddress(company.address)
          setPostalCode(company.postalCode)
          setRegion(company.region)
          setCity(company.city)
        }
        ).catch(e => {
          console.log(e.response)
        })
    },
    [setName, setDescription, setAddress, setPostalCode, setRegion, setCity]
  )
  return {
    getProfile,
    name,
    description,
    address,
    postalCode,
    region,
    city
  }
}
