import { Avatar, Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { useConfirm } from 'material-ui-confirm'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { actions } from '../../redux/student'
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
  const { jobOpening, enrollable } = props  
  const styles = useStyles()
  const dispatch = useDispatch()

  console.log(props);

  const enrollAction = () => {
    confirm({ description: '¿ Quieres aplicar a esta oferta ?' }).then(() => {
      dispatch(actions.enrollThisJob(jobOpening._id || jobOpening.id))
      history.goBack()
    })
  }

  return (
    <Grid container className={styles.root}>
      <Grid lg={8} md={12}>
        <Paper className={styles.container}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <Avatar className={styles.companyAvatar} src={jobOpening.companyDetail.avatar} />
            </Grid>
            <Grid item>
              <Typography variant="h3">{jobOpening.companyDetail.name}</Typography>
            </Grid>
            <Grid item className={styles.position}>
              <Typography variant="h1">{jobOpening.position}</Typography>
            </Grid>
            <Grid item container className={styles.actionsSection}>
              <Grid item>
                <Typography align={'center'} variant="body1">fecha de contratacion: </Typography>
                <Typography align={'center'} variant="h4">{dateFormatter(jobOpening.hiringDate)}</Typography>
              </Grid>
              {enrollable && (
                <Grid item>
                  <Button color="primary" variant="contained" onClick={enrollAction}>
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
    </Grid>
  )
}
