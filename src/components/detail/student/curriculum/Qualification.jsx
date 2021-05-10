import { makeStyles } from '@material-ui/core'
import { QualificationForm } from '../../../form/student/qualification'
import Card from '../../../shared/Card'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
}))

export const Qualification = props => {
  const classes = useStyles()

  return (
    <Card className={classes.root} title="Titulacion">
      <QualificationForm {...props} />
    </Card>
  )
}
