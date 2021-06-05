import { Chip, makeStyles, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import { CheckCircle } from '@material-ui/icons'
import { Item, Row } from '@mui-treasury/components/flex'
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic'
import React from 'react'
import { dateFormatter } from '../../services/date/dateFormatter'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
  },
  info: {
    flexGrow: 2,
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
    color: theme.palette.secondary.dark,
    textTransform: 'uppercase',
    fontFamily: 'Poppins, san-serif',
    fontSize: '0.9rem',
  },
  title: {
    color: theme.palette.primary.dark,
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

export const JobListItem = props => {
  const styles = useStyles()
  const { companyDetail, position, createdAt, hiringDate, enrolled } = props
  const _createdAt = dateFormatter(createdAt)
  const _hiringDate = dateFormatter(hiringDate)
  const avatarStyles = useDynamicAvatarStyles({
    size: 64,
    radius: 8,
  })
  return (
    <Row gap={3} className={styles.root}>
      <Item style={{ marginRight: '2em', marginLeft: '1em' }}>
        <Avatar variant={'rounded'} classes={avatarStyles} src={companyDetail.avatar} />
      </Item>
      <div className={styles.info}>
        <Typography className={styles.subtitle}>{companyDetail.name}</Typography>
        <Typography className={styles.title}>{position}</Typography>
        {enrolled && <Chip color="secondary" variant="outlined" size="small" label={'Aplicaste a esta oferta'} icon={<CheckCircle />} />}
      </div>
      <div className={styles.details}>
        <div className={styles.section}>
          <Typography className={styles.caption}>Fecha de publicacion:</Typography>
          <Typography className={styles.subtitle}>{_createdAt}</Typography>
        </div>
        <div className={styles.section}>
          <Typography className={styles.caption}>Fecha de contratacion:</Typography>
          <Typography className={styles.subtitle}>{_hiringDate}</Typography>
        </div>
      </div>
    </Row>
  )
}
