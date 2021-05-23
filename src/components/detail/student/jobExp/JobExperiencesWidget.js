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
import { Add, Delete, Edit } from '@material-ui/icons'
import React, { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'
import { actions } from '../../../../redux/student'
import { JobExpDialog } from './JobExpDialog'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
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
    paddingLeft: '20px'
  }
}))

const JobExperiencesWidget = props => {
  const [dialog, setDialog] = useState(false)
  const classes = useStyles()
  const dispatch = useDispatch()
  const jobs = props.jobExperiences
  
const handleDelete = (job) =>{
  const jobsUpd = jobs.filter(jobExp => jobExp !== job)
  dispatch(actions.updateStudent({job_experiences: jobsUpd}))
}

const hideDialog = () => setDialog(false)




const handleAdd = () => {
  setDialog(true)
}

  return (
    <Card className={classes.root}>
      {dialog &&  <JobExpDialog closeIt={hideDialog} />}
      <CardHeader title="Experiencia Laboral" />
      <Divider />
      <PerfectScrollbar>
        <Box className={classes.box} minWidth={550}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cell}>Empresa</TableCell>
                <TableCell className={classes.cell}>Posicion</TableCell>
                <TableCell className={classes.cell}>Comienzo</TableCell>
                <TableCell className={classes.cell}>Finalizacion</TableCell>
                <TableCell className={classes.cell}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
              {jobs &&
                jobs.map(job => (
                  <TableRow hover key={uuid()}>
                    <TableCell className={classes.cell}>{job.company}</TableCell>
                    <TableCell className={classes.cell}>{job.position}</TableCell>
                    <TableCell className={classes.cell}>{job.start_date}</TableCell>
                    <TableCell className={classes.cell}>{job.end_date}</TableCell>
                    <TableCell className={classes.cell}>
                      <IconButton aria-label="edit" >
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="remove" onClick={() => handleDelete(job)} >
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
          Agregar experiencia laboral
        </Button>
      </Box>
    </Card>
  )
}

export default JobExperiencesWidget
