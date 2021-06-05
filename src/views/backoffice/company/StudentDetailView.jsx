/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { Avatar, Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { Mail, MailOutline, Scanner } from '@material-ui/icons'
import { useConfirm } from 'material-ui-confirm'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { JobExpDetail } from '../../../components/enrollment/student/JobExpDetail'
import { LanguageDetail } from '../../../components/enrollment/student/LanguageDetail'
import { yearMonthFormatter } from '../../../services/date/dateFormatter'

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
  paper: {
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 300,
  },
  headerBox: {
    minWidth: '50%',
    height: 250,
    background: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  studentName: {
    fontFamily: 'inherit',
    textTransform: 'uppercase',
    color: theme.palette.primary.contrastText,
    fontSize: '3rem',
    fontWeight: 300,
    padding: '1em',
  },
  avatar: {
    width: 150,
    height: 150,
    position: 'relative',
  },
  bodyGroup: {
    width: '100%',
    display: 'flex',
  },
  body: {
    marginTop: theme.spacing(6),
    width: '100%',
  },
  section: {
    padding: theme.spacing(4),
  },
  sectionTitle: {
    color: theme.palette.primary.main,
    fontFamily: 'Roboto',
    fontSize: '1.4rem',
    fontWeight: 300,
    marginBottom: theme.spacing(3),
  },
  infoBody: {
    color: theme.palette.secondary.dark,
    fontFamily: 'Roboto',
    fontSize: '1.7rem',
    textTransform: 'uppercase',
    fontWeight: 300,
  },
  infoCaption: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    color: theme.palette.grey[700],
    fontFamily: 'Roboto',
    fontSize: '1.3rem',
    fontWeight: 300,
  },
  centerBlock: {
    display: 'flex',
    justifyContent: 'center',
  },
}))

export const StudentDetailView = props => {
  const history = useHistory()
  const confirm = useConfirm()
  const { enrollment_date, studentDetail } = props
  const { name, surname, lastname, qualification, languages, job_experiences, avatar } = studentDetail
  const styles = useStyles()
  const dispatch = useDispatch()

  const start = yearMonthFormatter(qualification.start_date)
  const end = yearMonthFormatter(qualification.end_date)

  // const enrollAction = () => {
  //   confirm({ description: '¿ Quieres aplicar a esta oferta ?' }).then(() => {
  //     dispatch(actions.enrollThisJob(job._id || job.id))
  //     history.goBack()
  //   })
  // }

  return (
    <Grid container className={styles.root}>
      <Grid lg={8} md={12}>
        <Paper className={styles.paper}>
          <div className={styles.container}>
            <div className={styles.header}>
              <div className={styles.headerBox}>
                <Typography className={styles.studentName}>{`${name} ${surname} ${lastname}`}</Typography>
                <Avatar className={styles.avatar} src={avatar} />
              </div>
            </div>
            <div className={styles.body}>
              <div className={styles.section}>
                <div className={styles.centerBlock}>
                  <Button color="primary" variant="outlined" size="large" endIcon={<MailOutline />}>
                    Contactar
                  </Button> 
                </div>
              </div>
              <div className={styles.section}>
                <Typography className={styles.sectionTitle}>Educacion</Typography>
                <div className={styles.container}>
                  <Typography display="block" align="center" className={styles.infoBody}>
                    {qualification.title}
                  </Typography>
                  <div className={styles.centerBlock}>
                    <Typography className={styles.infoCaption}>{start}</Typography>
                    <Typography className={styles.infoCaption}>{end}</Typography>
                  </div>
                </div>
              </div>
              <div className={styles.section}>
                <Typography className={styles.sectionTitle}>Idiomas</Typography>
                {languages.map((lan, index) => (
                  <div key={index} className={styles.item}>
                    <LanguageDetail {...lan} />
                    <Divider />
                  </div>
                ))}
              </div>
              <div className={styles.section}>
                <Typography className={styles.sectionTitle}>Experiencia</Typography>
                {job_experiences.map((job, index) => (
                  <div key={index} className={styles.item}>
                    <JobExpDetail {...job} />
                    <Divider />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.footer}></div>
        </Paper>
      </Grid>
    </Grid>
  )
}
