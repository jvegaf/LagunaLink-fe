/* eslint-disable camelcase */
import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'Roboto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    width: '100%',
    display: 'flex',  
  },
  left: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  right: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: theme.spacing(3),
    alignItems: 'center'
  },
  companyName: {
    fontFamily: 'inherit',
    fontSize: '1.5rem',
    color: theme.palette.grey[500],
    textTransform: 'uppercase',
  },
  jobPos: {
    fontSize: '1.5rem',
    fontWeight: 300,
    color: theme.palette.primary.dark,
  },
  dates: {
    fontSize: '1.3rem',
    marginLeft: theme.spacing(6),
    fontWeight: 300,
    color: theme.palette.primary.dark,
  },
  preTag: {
    fontFamily: 'Roboto',
    whiteSpace: 'pre-wrap',
    fontWeight: 300,
    fontSize: '1.3rem',
  },
}))

export const JobExpDetail = props => {
  const styles = useStyles()
  const { company, position, responsibilities, start_date, end_date } = props
  
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Typography className={styles.companyName}>{company}</Typography>
          <Typography className={styles.jobPos}>{position}</Typography>
        </div>
        <div className={styles.right}>
          <Typography display="inline" className={styles.dates}>{start_date}</Typography>
          <Typography display="inline" className={styles.dates}>{end_date}</Typography>
        </div>
      </div>
      <div className={styles.body}>
        <pre className={styles.preTag}>{responsibilities}</pre>
      </div>
    </div>
  )
}
