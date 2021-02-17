import React, { useState } from 'react'

const CompanyContext = React.createContext({})

export function CompanyContextProvider ({ children }) {
  const [name, setName] = useState('')

  const [description, setDescription] = useState('')

  const [address, setAddress] = useState('')

  const [postalcode, setPostalCode] = useState('')

  const [region, setRegion] = useState('')

  const [city, setCity] = useState('')

  return (
    <CompanyContext.Provider value={{
      name,
      setName,
      description,
      setDescription,
      address,
      setAddress,
      postalcode,
      setPostalCode,
      region,
      setRegion,
      city,
      setCity
    }}
    >
      {children}
    </CompanyContext.Provider>
  )
}

export default CompanyContext
