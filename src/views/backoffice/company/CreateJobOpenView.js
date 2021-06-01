import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useHistory } from 'react-router'
import { JobOpeningForm } from '../../../components/form/company/jobOpeningForm'
import { Logo } from '../../../components/logo/Logo'
import { Title } from '../../../components/shared/Title'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: theme.spacing(6),
  },
  logo: {
    height: '80px',
    width: '80px',
  },
}))

export const CreateJobOpenView = () => {
  const classes = useStyles()
  const history = useHistory()

  const handleClose = () => {
    history.goBack()
  }

  const props = { handleClose }

  return (
    <Grid container className={classes.root}>
      <Grid item container lg={6} md={10} sm={12} xs={12}>
        <Paper className={classes.card}>
          <Grid container direction="column" spacing={5}>
            <Grid item className={classes.centered}>
              <Logo className={classes.logo} />
            </Grid>
            <Grid item>
              <Title content="Nueva Oferta de Empleo" />
            </Grid>
            <Grid item>
              <JobOpeningForm {...props} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
