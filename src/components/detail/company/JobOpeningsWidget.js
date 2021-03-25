/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,


  List, makeStyles
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { v4 as uuid } from 'uuid'
import { JobOpenDialog } from './JobOpenDialog'
import JobItem from './widget/jobItem'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
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
  box: {},
}))

export const JobOpeningsWidget = props => {
  const [dialogShow, setDialogShow] = useState(false)
  const classes = useStyles()
  const jobs = props.own_job_openings
  const hideDialog = () => {
    setDialogShow(false)
  }

  const handleDelete = job => {
    // const jobsUpd = jobs.filter(jobExp => jobExp !== job)
    // dispatch(actions.updateStudent({job_experiences: jobsUpd}))
  }

  const handleChange = idx => {
    setJobIndex(idx)
  }

  const handleView = job => {
    setDialogShow(true)
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
          <List>
            {jobs !== undefined &&
              jobs.map((job, index) => (
                <JobItem key={uuid()} job={job} index={index} selectedIdx={jobIndex} changeIdx={handleChange} />
              ))}
          </List>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button color="primary" endIcon={<Add />} onClick={handleAdd} size="small" variant="text">
          Crear Nueva Oferta de Trabajo
        </Button>
      </Box>
    </Card>
  )
}
