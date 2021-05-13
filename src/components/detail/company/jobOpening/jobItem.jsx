import { Avatar, Box, IconButton, makeStyles, NoSsr, Typography } from '@material-ui/core'
import { lightBlue, orange } from '@material-ui/core/colors'
import { Delete } from '@material-ui/icons'
import { Item, Row } from '@mui-treasury/components/flex'
import { useConfirm } from 'material-ui-confirm'
import React from 'react'
import GoogleFontLoader from 'react-google-font-loader'
import { dateFormatter } from '../../../../services/date/dateFormatter'

const useStyles = makeStyles(theme => ({
  root: {},
  itemRow: {
    padding: theme.spacing(2),
    '&:hover': {
      backgroundColor: '#f5f5f5',
      cursor: 'pointer',
    },
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enrolls: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '0.7em',
  },
  enrollItem: {
    alignItems: 'center',
  },
  positionTitle: {
    fontSize: '1.1rem',
    padding: '0.5em 0',
    fontFamily: 'Poppins',
    fontWeight: 'bolder',
    lineHeight: 1.4,
  },
  enrolled: {
    fontSize: '1rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 'bold',
    lineHeight: 1.4,
    color: theme.palette.getContrastText(lightBlue[600]),
    backgroundColor: lightBlue[300],
    '&:hover': {
      backgroundColor: orange[300],
    }
  },
  positionInfo: {
    fontSize: '0.75rem',
    fontFamily: 'Poppins, sans-serif',
    lineHeight: 1.2,
  },
}))

const JobItem = props => {
  const { index, job, view, remove } = props
  const confirm = useConfirm()
  const classes = useStyles()
  const handleView = (event, jobId) => view(jobId)
  const handleRemove = (event, jobId) => {
    confirm({ description: '¿ Quieres eliminar esta vacante ?' }).then(() => {
      remove(jobId)
    })
  }
  const idx = index + 1
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: 'Poppins', weights: [400, 700] }]} />
      </NoSsr>
      <Row gap={1.5} onClick={event => handleView(event, job.id)} className={classes.itemRow}>
        <Item className={classes.center} position={'left'}>
          <Avatar>{idx}</Avatar>
        </Item>
        <Item position={'middle'} ml={2} grow>
          <Typography className={classes.positionInfo}>
            {'F. Publicacion: '} <b>{dateFormatter(job.createdAt)}</b>
          </Typography>
          <Typography color="primary" className={classes.positionTitle}>
            {job.position}
          </Typography>
          <Typography className={classes.positionInfo}>
            {'F. Contratacion: '} <b>{dateFormatter(job.hiringDate)}</b>
          </Typography>
        </Item>
        <Item position={'right'} mr={4} alignSelf={'center'}>
          <Typography align="center" className={classes.positionInfo}>
            Adscritos
          </Typography>
          <Box className={classes.enrolls}>
            <Avatar onClick={()=>alert('clicked')} className={classes.enrolled}>{job.enrollsCount}</Avatar>
          </Box>
        </Item>
        <Item position={'right'} mr={-0.5} className={classes.center}>
          <IconButton onClick={event => handleRemove(event, job.id)} aria-label="remove">
            <Delete />
          </IconButton>
        </Item>
      </Row>
    </>
  )
}

export default JobItem
