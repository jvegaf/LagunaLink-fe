import { Box, makeStyles, Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'

const useStyles = makeStyles(theme =>({
  root: {
    width: '100%',
    display: 'flex',
  },
  container: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: '1.4rem',
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
    fontWeight: 300
  },
  legend: {
    fontWeight: 300,
    color: theme.palette.grey[600]
  }
}))

export const LanguageDetail = props => {
  const styles = useStyles()
  const { name, speak, write } = props
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Typography className={styles.name}>{name}</Typography>
      </div>
      <div className={styles.container}>
        <Box component="fieldset" borderColor="transparent">
          <Typography className={styles.legend} component="legend" align="center">Oral</Typography>
          <Rating name="read-only" value={speak}  readOnly />
        </Box>
      </div>
      <div className={styles.container}>
        <Box component="fieldset" borderColor="transparent">
          <Typography className={styles.legend} component="legend" align="center">Escrito</Typography>
          <Rating name="read-only" value={write} readOnly />
        </Box>
      </div>
    </div>
  )
}
