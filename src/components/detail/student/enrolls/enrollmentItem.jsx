/* eslint-disable no-unused-vars */
import { Avatar, IconButton, makeStyles, NoSsr } from '@material-ui/core'
import { Delete, Visibility } from '@material-ui/icons'
import { Item, Row } from '@mui-treasury/components/flex'
import { Info, InfoCaption, InfoSubtitle, InfoTitle } from '@mui-treasury/components/info'
import { usePopularInfoStyles } from '@mui-treasury/styles/info/popular'
import React from 'react'
import GoogleFontLoader from 'react-google-font-loader'

const useStyles = makeStyles(theme => ({
  root: {},
  itemRow: {
    "&:hover": {
      backgroundColor: '#f5f5f5'
    }
  },
  actions: {
    paddingRight: '4em',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  actionButton: {
    padding: '1em'
  },
  itemAvatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const EnrollmentItem = props => {
  const { index, enroll, changeIdx } = props
  const classes = useStyles()
  const handleClick = (event, index) => changeIdx(index)
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
          <InfoSubtitle>{enroll.companyName}</InfoSubtitle>
          <InfoTitle>{enroll.jobPosition}</InfoTitle>
          <InfoCaption>{enroll.enrollment_date}</InfoCaption>
        </Info>
        <div className={classes.actions}>
          <IconButton className={classes.actionButton} aria-label="edit">
            <Visibility />
          </IconButton>
          <IconButton className={classes.actionButton} aria-label="remove">
            <Delete />
          </IconButton>
        </div>
      </Row>
    </>
  )
}

export default EnrollmentItem
