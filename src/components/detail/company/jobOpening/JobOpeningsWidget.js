import { Box, Button, List, makeStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useHistory } from 'react-router'
import { v4 as uuid } from 'uuid'
import JobItem from './jobItem'
import { LinkCard } from '../../../shared/Card'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  cell: {
    padding: '4px',
    width: '100%'
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
  const { jobOpenings } = props
  const classes = useStyles()
  const history = useHistory()

  const handleAdd = () => {
    history.push('/app/job_openings/new')
  }


  return (
    
    <LinkCard className={classes.root} title="OFERTAS PUBLICADAS">
      <PerfectScrollbar>
        <Box className={classes.box}>
          <List>{jobOpenings && jobOpenings.map((job, index) => <JobItem key={uuid()} job={job} index={index} {...props} />)}</List>
        </Box>
      </PerfectScrollbar>
      <Box className={classes.footer}>
        <Button color="primary" endIcon={<Add />} onClick={handleAdd} size="small" variant="text">
          Crear Nueva Oferta de Trabajo
        </Button>
      </Box>
    </LinkCard>
  )
}
