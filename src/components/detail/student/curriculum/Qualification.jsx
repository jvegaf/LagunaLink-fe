import QualificationForm from '../../../form/student/qualification'
import Card from '../../../shared/Card'


export const Qualification = (props) => {
  return (
    <Card title="Titulacion">
      <QualificationForm {...props} />
    </Card>
  )
  }
