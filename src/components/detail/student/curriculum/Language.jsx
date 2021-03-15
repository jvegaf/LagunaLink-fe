import React from 'react'
import Card from '../../../shared/Card'
import LanguageForm from '../../../form/student/language'

export const Language = props => {
  return (
    <Card title="Idioma">
      <LanguageForm {...props} />
    </Card>
  )
}
