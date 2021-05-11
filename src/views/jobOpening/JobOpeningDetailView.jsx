import { Avatar, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { actions } from '../../redux/student'
import { useConfirm } from 'material-ui-confirm'
import { dateFormatter } from '../../services/date/dateFormatter'

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
  actionsSection: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: theme.spacing(5)
  }
}))

export const JobOpeningDetailView = props => {
  const history = useHistory()
  const confirm = useConfirm()
  const { detailId, role } = props
  const styles = useStyles()
  const dispatch = useDispatch()
  const [jobOpening, setJobOpening] = useState({})
  const [hiringDate, setHiringDate] = useState('')
  const [company, setCompany] = useState({})
  const [hideEnroll, setHideEnroll] = useState(true)
  const shared = useSelector(state => state.shared)

  useEffect(() => {
    if (shared !== undefined) {
      const jobOpening = shared.jobOpenings.find(job => job.id === detailId)
      const company = shared.companies.find(comp => comp.id === jobOpening.company)
      setJobOpening(jobOpening)
      setHiringDate(dateFormatter(jobOpening.hiringDate))
      setCompany(company)
      const isCompany = role !== 'ROLE_STUDENT'
      const notEnrollable = isCompany || jobOpening.enrolled
      setHideEnroll(notEnrollable)
    }
  }, [shared])

  const enrollAction = () => {
    confirm({ description: '¿ Quieres aplicar a esta oferta ?' }).then(() => {
      dispatch(actions.enrollThisJob(detailId))
      history.goBack()
    })
  }

  return (
    <div className={styles.root}>
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
            <Grid item container className={styles.actionsSection}>
              <Grid item>
                <Typography align={'center'} variant="body1">fecha de contratacion: </Typography>
                <Typography align={'center'} variant="h4">{hiringDate}</Typography>
              </Grid>
              {!hideEnroll && (
                <Grid item>
                  <Button hidden={hideEnroll} color="primary" variant="contained" onClick={enrollAction}>
                    Aplicar Oferta
                  </Button>
                </Grid>
              )}
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
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
}
