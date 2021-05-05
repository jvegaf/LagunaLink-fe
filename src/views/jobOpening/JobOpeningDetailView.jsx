import { Avatar, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../redux/student'
import { AlertDialog } from './../../components/dialog/AlertDialog'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
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
    spacing: theme.spacing(2),
  },
  subSection: {
    paddingTop: theme.spacing(2),
  },
  preTag: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'Roboto',
    fontSize: '1em',
  },
  subBody: {
    padding: theme.spacing(1),
  },
  position: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: theme.palette.secondary.main,
  },
}))

export const JobOpeningDetailView = props => {
  const { detailId, role } = props
  const styles = useStyles()
  const [modal, setModal] = useState({
    open: false,
    body: '',
    handleOk: null,
    handleCancel: null,
  })
  const dispatch = useDispatch()
  const [jobOpening, setJobOpening] = useState({})
  const [company, setCompany] = useState({})
  const [hideEnroll, setHideEnroll] = useState(true)
  const shared = useSelector(state => state.shared)

  useEffect(() => {
    if (shared !== undefined) {
      const jobOpening = shared.jobOpenings.find(job => job.id === detailId)
      const company = shared.companies.find(comp => comp.id === jobOpening.company)
      setJobOpening(jobOpening)
      setCompany(company)
      const isCompany = role !== 'ROLE_STUDENT'
      const notEnrollable = isCompany || jobOpening.enrolled
      setHideEnroll(notEnrollable)
    }
  }, [shared])

  const enrollConfirmed = () => {
    dispatch(actions.enrollThisJob(detailId))
    setModal({ open: false })
  }

  const enrollCanceled = () => {
    setModal({ open: false })
  }

  const enrollAction = () => {
    setModal({
      open: true,
      title: 'Confirmacion',
      body: '¿ Quieres aplicar a esta oferta ?',
      handleOK: enrollConfirmed,
      handleCancel: enrollCanceled,
    })
  }

  return (
    <div className={styles.root}>
      <AlertDialog {...modal} />
      <Grid xl={7} md={12}>
        <Paper className={styles.container}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <Avatar className={styles.companyAvatar} src={company.avatar} />
            </Grid>
            <Grid item>
              <Typography variant="h3">{company.name}</Typography>
            </Grid>
            <Grid item className={styles.position}>
              <Typography variant="h1">{jobOpening.position}</Typography>
            </Grid>
            <Grid item container className={styles.gridSection}>
              <Grid item container>
                <Typography variant="h2" align="left">
                  Descripcion
                </Typography>
              </Grid>
              <Grid item className={styles.gridBody}>
                <pre className={styles.preTag}>{jobOpening.description}</pre>
              </Grid>
            </Grid>
            <Grid item container className={styles.gridSection}>
              <Grid item container>
                <Typography variant="h2" align="left">
                  Responsabilidades
                </Typography>
              </Grid>
              <Grid item className={styles.gridBody}>
                <pre className={styles.preTag}>{jobOpening.responsibilities}</pre>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container>
                <Typography variant="h2" align="left">
                  Condiciones
                </Typography>
              </Grid>
              <Grid item className={styles.gridBody}>
                <pre className={styles.preTag}>{jobOpening.conditions}</pre>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container direction="column" className={styles.gridSection}>
                <Typography variant="h2" align="left">
                  Requisitos
                </Typography>
                <Grid item className={styles.subSection}>
                  <Typography variant="h4" align="left">
                    Titulacion
                  </Typography>
                  <p className={styles.subBody}>{jobOpening.qualification}</p>
                </Grid>
                <Grid item className={styles.subSection}>
                  <Typography variant="h4" align="left">
                    Experiencia previa
                  </Typography>
                  <p className={styles.subBody}>{jobOpening.prevExperience}</p>
                </Grid>
              </Grid>
            </Grid>
            {!hideEnroll && (
              <Grid item className={styles.gridSection}>
                <Button hidden={hideEnroll} color="primary" variant="contained" onClick={enrollAction}>
                  Aplicar Oferta
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}
