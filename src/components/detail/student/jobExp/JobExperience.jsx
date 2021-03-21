import React from 'react'
import { JobExpForm } from '../../../form/student/jobExperience'
import Card from '../../../shared/Card'

export const JobExperience = props => {
  return (
    <Card title="Experiencia Laboral">
      <JobExpForm {...props} />
    </Card>
  )
}
