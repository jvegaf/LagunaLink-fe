import { Avatar, Chip, IconButton, makeStyles, NoSsr } from '@material-ui/core'
import { Delete, Visibility } from '@material-ui/icons'
import { Item, Row } from '@mui-treasury/components/flex'
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
    marginRight: theme.spacing(2)
  },
  subtitle: {
    color: theme.palette.primary.dark,
    textTransform: 'uppercase',
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: '0.9rem',
  },
  title: {
    color: theme.palette.secondary.dark,
    fontFamily: 'Poppins',
    fontSize: '1.1rem',
    fontWeight: 400,
    letterSpacing: 0.4,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  caption: {
    fontFamily: 'Poppins',
    color: '#95a0a1',
    fontSize: '0.9rem',
    marginRight: '0.8rem',
  },
}))

const EnrollmentItem = props => {
  const confirm = useConfirm()
  const { index, enroll, onView, onRemove } = props
  const enrollDate = dateFormatter(enroll.enrollment_date)
  const classes = useStyles()
  const handleView = enroll => {
    onView({ ...enroll.jobDetail, id: enroll.jobDetail._id })
  }
  const handleRemove = enrollId => {
    confirm({ description: '¿ Quieres retirar tu aplicación a esta oferta ?' }).then(() => {
      onRemove(enrollId)
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
        <div className={classes.item}>
          <div className={classes.subtitle}>{enroll.jobDetail.companyDetail.name}</div>
          <div className={classes.title}>{enroll.jobDetail.position}</div>
          <div className={classes.caption}>{enrollDate}</div>
        </div>
        <div className={classes.actions}>
          {enroll.jobDetail.isActive ? (
            <IconButton
              className={classes.actionButton}
              onClick={e => handleView(enroll)}
              aria-label="view job"
            >
              <Visibility />
            </IconButton>
          ): (<Chip color="secondary" variant="outlined" size="small" label={'esta oferta fue eliminada'} icon={<Delete />} />)}
          <IconButton
            className={classes.actionButton}
            onClick={e => handleRemove(enroll._id)}
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
