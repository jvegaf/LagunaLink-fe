import { Avatar, Box, Button, Fab, IconButton, makeStyles, Typography } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import { Item, Row } from '@mui-treasury/components/flex'
import { useConfirm } from 'material-ui-confirm'
import React from 'react'
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
    color: theme.palette.secondary.main
  },
  enrolled: {
    fontSize: '2rem',
    fontFamily: 'Poppins',
    lineHeight: 1.4,
    transition: 'transform .2s',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      'transform': 'scale(1.2)',
      color: theme.palette.secondary.main,
    },
  },
  positionInfo: {
    fontSize: '0.8rem',
    fontFamily: 'Poppins',
    lineHeight: 1.2,
  },
}))

const JobItem = props => {
  const { index, job, onView, onRemove, onEnrolls } = props
  const confirm = useConfirm()
  const classes = useStyles()
  const handleView = e => onView(index)
  const handleEnrolls = e => onEnrolls(job)
  const handleRemove = e => {
    confirm({ description: '¿ Quieres eliminar esta vacante ?' }).then(() => {
      onRemove(job._id)
    })
  }
  const idx = index + 1
  return (
    <Row gap={1.5} onClick={() => handleView()} className={classes.itemRow}>
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
          <Button onClick={() => handleEnrolls()}>
            <Fab className={classes.enrolled}>{job.enrolls.length}</Fab>
          </Button>
        </Box>
      </Item>
      <Item position={'right'} mr={-0.5} className={classes.center}>
        <IconButton onClick={() => handleRemove()} aria-label="remove">
          <Delete />
        </IconButton>
      </Item>
    </Row>
  )
}

export default JobItem
