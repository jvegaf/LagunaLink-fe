import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { Add, Delete, Visibility } from '@material-ui/icons'
import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { v4 as uuid } from 'uuid'
import { JobOpenDialog } from './JobOpenDialog'
import { dateFormatter } from './../../../services/date/dateFormatter'

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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>#</TableCell>
                <TableCell className={classes.cell}>Posicion</TableCell>
                <TableCell className={classes.cell}>Fecha</TableCell>
                <TableCell className={classes.cell}>Inscritos</TableCell>
                <TableCell className={classes.cell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs !== undefined &&
                jobs.map((job, index) => (
                  <TableRow hover key={uuid()}>
                    <TableCell className={classes.cell}>{++index}</TableCell>
                    <TableCell className={classes.cell}>{job.position}</TableCell>
                    <TableCell className={classes.cell}>{dateFormatter(job.createdAt)}</TableCell>
                    <TableCell className={classes.cell}>{0}</TableCell>
                    <TableCell className={classes.cell}>
                      <IconButton aria-label="detail" onClick={() => handleView(job)}>
                        <Visibility />
                      </IconButton>
                      <IconButton aria-label="remove" onClick={() => handleDelete(job)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
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
