import { Container, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

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

export const DashboardView = () => {
  const classes = useStyles()

  return (
    <Container maxWidth="lg">
      <Grid container className={classes.gridContainer} spacing={3}>
        De momento vacio
      </Grid>
    </Container>
  )
}
