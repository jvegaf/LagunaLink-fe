/* eslint-disable no-unused-vars */
import { Box, Button, Card, CardHeader, Divider, List, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { v4 as uuid } from 'uuid'
import JobItem from './jobItem'
import { JobOpenDialog } from './JobOpenDialog'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 'auto',
  },
  cell: {
    padding: '4px',
  },
  actions: {
    justifyContent: 'flex-end',
  },
  head: {
    background: '#f5f5f5',
  },
  box: {
    width: '100%',
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(2),
  },
}))

export const JobOpeningsWidget = props => {
  const { jobs, view, remove } = props
  const [dialogShow, setDialogShow] = useState(false)
  const classes = useStyles()
  const hideDialog = () => {
    setDialogShow(false)
  }

  const handleAdd = () => {
    setDialogShow(true)
  }

  return (
    <Card className={classes.root}>
      {dialogShow && <JobOpenDialog closeIt={hideDialog} />}
      <CardHeader title="Ofertas Publicadas" />
      <Divider />
      <PerfectScrollbar>
        <Box className={classes.box} minWidth={500}>
          <List>{jobs && jobs.map((job, index) => <JobItem key={uuid()} job={job} index={index} {...props} />)}</List>
        </Box>
      </PerfectScrollbar>
      <Box className={classes.footer}>
        <Button color="primary" endIcon={<Add />} onClick={handleAdd} size="small" variant="text">
          Crear Nueva Oferta de Trabajo
        </Button>
      </Box>
    </Card>
  )
}
