import { Avatar, IconButton, makeStyles, NoSsr } from '@material-ui/core'
import { Delete, Visibility } from '@material-ui/icons'
import { Item, Row } from '@mui-treasury/components/flex'
import { Info, InfoCaption, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info'
import { usePopularInfoStyles } from '@mui-treasury/styles/info/popular'
import React from 'react'
import GoogleFontLoader from 'react-google-font-loader'
import { useConfirm } from 'material-ui-confirm'

const useStyles = makeStyles(theme => ({
  root: {},
  itemRow: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  actions: {
    paddingRight: '1em',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    padding: '0.9em',
  },
  itemAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
      <Row className={classes.itemRow} gap={3}>
        <Item className={classes.itemAvatar}>
          <Avatar>{idx}</Avatar>
        </Item>
        <Info useStyles={usePopularInfoStyles}>
          <InfoSubtitle>{job.createdAt}</InfoSubtitle>
          <InfoTitle>{job.position}</InfoTitle>
          <InfoCaption>{job.hiringDate}</InfoCaption>
        </Info>
        <div className={classes.actions}>
          <IconButton
            className={classes.actionButton}
            onClick={event => handleView(event, job.id)}
            aria-label="view job"
          >
            <Visibility />
          </IconButton>
          <IconButton className={classes.actionButton} onClick={event => handleRemove(event, job.id)} aria-label="remove">
            <Delete />
          </IconButton>
        </div>
      </Row>
    </>
  )
}

export default JobItem
