import { Avatar, makeStyles, Typography } from '@material-ui/core'
import { Item, Row } from '@mui-treasury/components/flex'
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dateFormatter } from '../../../../services/date/dateFormatter'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
  },
  info: {
    flexGrow: 2,
    paddingLeft: theme.spacing(3)
  },
  details: {
    flexGrow: 1,
    marginRight: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  section: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  subtitle: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontFamily: 'Poppins, san-serif',
    fontSize: '0.9rem',
  },
  title: {
    color: theme.palette.primary.main,
    fontFamily: 'Poppins',
    fontSize: '1.5rem',
    fontWeight: 400,
    letterSpacing: 0.4,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },

  caption: {
    fontFamily: 'Poppins, san-serif',
    color: '#95a0a1',
    fontSize: '0.8rem',
    marginRight: '0.8rem',
  },
}))

export const EnrollListItem = props => {
  const styles = useStyles()
  // eslint-disable-next-line camelcase
  const { enrollment_date, studentDetail } = props
  const _createdAt = dateFormatter(enrollment_date)
  
  const studentsAvatar = useSelector(state => state.company.studentsAvatar)
  const avatarsFetched = useSelector(state => state.company.avatarsFetched)
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    if(avatarsFetched){
      const sAvatar = studentsAvatar.find(s => studentDetail._id === s.id)
      setAvatar(sAvatar.url)
    }
  }, [avatarsFetched])
  const avatarStyles = useDynamicAvatarStyles({
    height: 56,
    width: 64,
    radius: 8,
  })


  return (
    <Row gap={3} className={styles.root}>
      <Item>
        <Avatar variant={'rounded'} classes={avatarStyles} src={avatar} />
      </Item>
      <div className={styles.info}>
        <Typography className={styles.subtitle}>{studentDetail.qualification.title}</Typography>
        <Typography className={styles.title}>{`${studentDetail.name} ${studentDetail.surname} ${studentDetail.lastname}`}</Typography>
      </div>
      <div className={styles.details}>
        <div className={styles.section}>
          <Typography className={styles.caption}>Fecha de aplicacion:</Typography>
          <Typography className={styles.subtitle}>{_createdAt}</Typography>
        </div>
      </div>
    </Row>
  )
}
