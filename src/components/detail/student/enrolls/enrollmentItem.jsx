/* eslint-disable no-unused-vars */
import { Avatar, Chip, IconButton, makeStyles, NoSsr } from '@material-ui/core'
import { Delete, Visibility } from '@material-ui/icons'
import { Item, Row } from '@mui-treasury/components/flex'
import { Info, InfoCaption, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info'
import { usePopularInfoStyles } from '@mui-treasury/styles/info/popular'
import { useConfirm } from 'material-ui-confirm'
import React from 'react'
import GoogleFontLoader from 'react-google-font-loader'
import { dateFormatter } from '../../../../services/date/dateFormatter'

const useStyles = makeStyles(theme => ({
  root: {},
  itemRow: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    }
  },
  inactiveRow: {
    backgroundColor: '#dadada'
  },
  actions: {
    paddingRight: '4em',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  actionButton: {
    padding: '1em',
  },
  itemAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const EnrollmentItem = props => {
  const confirm = useConfirm()
  const { index, enroll, view, remove } = props
  const enrollDate = dateFormatter(enroll.enrollment_date)
  const classes = useStyles()
  const handleView = (event, enroll) => {
    view({ ...enroll.jobDetail, id: enroll.jobDetail._id })
  }
  const handleRemove = (event, item) => {
    confirm({ description: '¿ Quieres retirar tu aplicación a esta oferta ?' }).then(() => {
      remove(item.id)
    })
  }

  const colorize = enroll.jobDetail.isActive ? classes.itemRow : classes.inactiveRow

  const idx = index + 1
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: 'Poppins', weights: [400, 700] }]} />
      </NoSsr>
      <Row className={colorize} gap={3}>
        <Item className={classes.itemAvatar}>
          <Avatar>{idx}</Avatar>
        </Item>
        <Info useStyles={usePopularInfoStyles}>
          <InfoSubtitle>{enroll.jobDetail.companyDetail.name}</InfoSubtitle>
          <InfoTitle>{enroll.jobDetail.position}</InfoTitle>
          <InfoCaption>{enrollDate}</InfoCaption>
        </Info>
        <div className={classes.actions}>
          {enroll.jobDetail.isActive ? (
            <IconButton
              className={classes.actionButton}
              onClick={event => handleView(event, enroll)}
              aria-label="view job"
            >
              <Visibility />
            </IconButton>
          ): (<Chip color="secondary" size="small" label={'esta oferta fue eliminada'} icon={<Delete />} />)}
          <IconButton
            className={classes.actionButton}
            onClick={event => handleRemove(event, enroll)}
            aria-label="remove"
          >
            <Delete />
          </IconButton>
        </div>
      </Row>
    </>
  )
}

export default EnrollmentItem
