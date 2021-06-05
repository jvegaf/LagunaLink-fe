import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { useConfirm } from 'material-ui-confirm'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { StyledAvatar } from '../../components/avatar/StyledAvatar'
import { actions } from '../../redux/student'
import { dateFormatter } from '../../services/date/dateFormatter'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    fontFamily: 'Poppins',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing(3),
  },
  container: {
    padding: theme.spacing(8),
  },
  companyAvatar: {
    width: 150,
    height: 150,
  },
  gridBody: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1),
  },
  gridSection: {
    padding: theme.spacing(2),
  },
  hiring: {
    fontFamily: 'Roboto',
    fontWeight: 300,
    fontSize: '1.8rem',
    color: theme.palette.secondary.dark
  },
  preTag: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'Roboto',
    fontSize: '1.2rem',
    fontWeight: 300,
    paddingLeft: theme.spacing(2),
  },
  subBody: {
    padding: theme.spacing(1),
  },
  position: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  actionsSection: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
  },
  companyName: {
    fontSize: '1.4rem',
  },
  jobPosition: {
    color: theme.palette.primary.dark,
    fontSize: '2.8rem',
    fontWeight: 500,
    letterSpacing: 1.8,
  },
  section: {
    color: theme.palette.primary.main,
    fontFamily: 'Poppins',
    fontSize: '1.4rem',
    fontWeight: 300,
  },
  underSection: {
    color: theme.palette.primary.main,
    fontFamily: 'Poppins',
    fontSize: '1.2rem',
    fontWeight: 300,
    paddingLeft: theme.spacing(2),
  },
  subSection: {
    marginTop: theme.spacing(2),
  },
}))

export const JobOpeningDetailView = props => {
  const history = useHistory()
  const confirm = useConfirm()
  const { job } = props
  const styles = useStyles()
  const dispatch = useDispatch()

  const enrollAction = () => {
    confirm({ description: '¿ Quieres aplicar a esta oferta ?' }).then(() => {
      dispatch(actions.enrollThisJob(job._id || job.id))
      history.goBack()
    })
  }

  return (
    <Grid container className={styles.root}>
      <Grid lg={8} md={12}>
        <Paper className={styles.container}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <StyledAvatar size={150} src={job.companyDetail.avatar} />
            </Grid>
            <Grid item>
              <Typography className={styles.companyName}>{job.companyDetail.name}</Typography>
            </Grid>
            <Grid item className={styles.position}>
              <Typography className={styles.jobPosition}>{job.position}</Typography>
            </Grid>
            <Grid item container className={styles.actionsSection}>
              <Grid item>
                <Typography align={'center'} className={styles.underSection}>
                  fecha de contratacion:{' '}
                </Typography>
                <Typography align={'center'} className={styles.hiring}>
                  {dateFormatter(job.hiringDate)}
                </Typography>
              </Grid>
              {job.enrollable && (
                <Grid item>
                  <Button color="primary" variant="contained" size="large" onClick={enrollAction}>
                    Aplicar Oferta
                  </Button>
                </Grid>
              )}
            </Grid>
            <Grid item container className={styles.gridSection}>
              <Grid item>
                <Typography className={styles.section}>Descripcion</Typography>
                <pre className={styles.preTag}>{job.description}</pre>
              </Grid>
            </Grid>
            <Grid item container className={styles.gridSection}>
              <Grid item>
                <Typography className={styles.section}>Responsabilidades</Typography>
                <pre className={styles.preTag}>{job.responsibilities}</pre>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <Typography className={styles.section}>Condiciones</Typography>
                <pre className={styles.preTag}>{job.conditions}</pre>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item>
                <Typography className={styles.section}>Requisitos</Typography>
                <div className={styles.subSection}>
                  <Typography className={styles.underSection}>Titulacion</Typography>
                  <p className={styles.preTag}>{job.qualification}</p>
                  <Typography className={styles.underSection}>Experiencia previa</Typography>
                  <p className={styles.preTag}>{job.prevExperience}</p>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
