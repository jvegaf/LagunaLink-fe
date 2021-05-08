import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Profile } from '../../../components/detail/account/Profile'
import { EnrollmentsWidget } from '../../../components/detail/student/enrolls/EnrollmentsWidget'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    flexGrow: 1,
    padding: theme.spacing(6),
  },
  gridContainer: {
    paddingTop: theme.spacing(3)
  },
  gridItem: {
    flexGrow: 1
  }
}))

export const EnrollmentsView = () => {
  const classes = useStyles()
  const user = useSelector(state => state.user)
  const jobOpenings = useSelector(state => state.shared.jobOpenings)
  const companies = useSelector(state => state.shared.companies)
  const enrollments = useSelector(state => state.student.enrollments)
  const [enrIdx, setEnrIdx] = useState(0)
  const handleIdxChange = idx => setEnrIdx(idx)
  const [enrolls, setEnrolls] = useState(undefined)

  useEffect(() => {
    if (companies && jobOpenings) {
      const _enrolls = enrollments.map(en => {
        const job = jobOpenings.find(j => j.id === en.job_opening)
        const company = companies.find(comp => comp.id === job.company)
        en.jobPosition = job.position
        en.companyName = company.name
        return en
      })
      setEnrolls(_enrolls)
    }
  }, [companies, jobOpenings])


  const props = { enrolls, idx: enrIdx, changeIdx: handleIdxChange }
  // debugger
  return (
    <Container maxWidth="lg">
      <Grid container className={classes.gridContainer} spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Profile {...user} />
        </Grid>
        <Grid item container direction="column" spacing={3} xl={6} lg={8} md={6} xs={12}>
          <Grid item className={classes.gridItem} >
            <EnrollmentsWidget {...props} />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
