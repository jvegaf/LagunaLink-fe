import { Avatar, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

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
    height: 150
  },
  gridBody: {
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(1)
  },
  gridSection: {
    spacing: theme.spacing(2)
  },
  subSection: {
    paddingTop: theme.spacing(2)
  },
  preTag: {
    whiteSpace: 'pre-wrap',
    fontFamily: 'Roboto',
    fontSize: '1em'
  },
  subBody: {
    padding: theme.spacing(1)
  }
}))

export const JobOpeningDetailView = props => {
  const styles = useStyles()
  const [jobOpening, setJobOpening] = useState({})
  const [company, setCompany] = useState({})
  const shared = useSelector(state => state.shared)

  useEffect(() => {
    if (shared !== undefined) {
      const jobOpening = shared.jobOpenings.find(job => job.id === props.detailId)
      const company = shared.companies.find(comp => comp.id === jobOpening.company)
      setJobOpening(jobOpening)
      setCompany(company)
    }
  }, [shared])
  

  return (
    <div className={styles.root}>
      <Grid xl={7} maxWidth="lg">
        <Paper className={styles.container}>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <Avatar className={styles.companyAvatar} src={company.avatar} />
            </Grid> 
            <Grid item>
              <Typography variant="h3">{company.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h1">{jobOpening.position}</Typography>
            </Grid>
            <Grid item container className={styles.gridSection} >
              <Grid item container>
                <Typography variant="h2" align="left">Descripcion</Typography>
              </Grid>
              <Grid item className={styles.gridBody}>
                <pre className={styles.preTag}>{jobOpening.description}</pre>
              </Grid>
            </Grid>
            <Grid item container className={styles.gridSection}>
              <Grid item container>
                <Typography variant="h2" align="left">Responsabilidades</Typography>
              </Grid>
              <Grid item className={styles.gridBody}>
                <pre className={styles.preTag} >
                  {jobOpening.responsibilities}
                </pre>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container>
                <Typography variant="h2" align="left">Condiciones</Typography>
              </Grid>
              <Grid item className={styles.gridBody}>
                <pre className={styles.preTag}>{jobOpening.conditions}</pre>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item container direction="column" className={styles.gridSection}>
                <Typography variant="h2" align="left">Requisitos</Typography>
                <Grid item className={styles.subSection}>
                  <Typography variant="h4" align="left">Titulacion</Typography>
                  <p className={styles.subBody}>{jobOpening.qualification}</p>
                </Grid>
                <Grid item className={styles.subSection}>
                  <Typography variant="h4" align="left">Experiencia previa</Typography>
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