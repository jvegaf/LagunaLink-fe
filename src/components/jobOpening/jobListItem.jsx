import { Chip, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import NoSsr from '@material-ui/core/NoSsr';
import { CheckCircle } from '@material-ui/icons';
import { Item, Row } from '@mui-treasury/components/flex';
import {
  Info,

  InfoSubtitle
} from '@mui-treasury/components/info';
import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { usePopularInfoStyles } from '@mui-treasury/styles/info/popular';
import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import { dateFormatter } from '../../services/date/dateFormatter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex'
  },
  info: {
    flexGrow: 2
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
    color: '#b13731',
    fontFamily: 'Poppins, san-serif',
    marginLeft: '1em'
  },
  title: {
    color: theme.palette.primary,
    fontFamily: 'Poppins, san-serif',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    lineHeight: 1.9,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  
  caption: {
    fontFamily: 'Poppins, san-serif',
    color: '#95a0a1',
  }
}))

export const JobListItem = props => {
  const styles = useStyles()
  const {companyDetail, position, createdAt, hiringDate, enrolled} = props
  const _createdAt = dateFormatter(createdAt)
  const _hiringDate = dateFormatter(hiringDate)
  const avatarStyles = useDynamicAvatarStyles({
    size: 64,
    radius: 8,
  });
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: 'Poppins', weights: [400, 700] }]} />
      </NoSsr>
      <Row gap={3} className={styles.root}>
        <Item style={{"marginRight": "2em", "marginLeft": "1em", }}>
          <Avatar
            variant={'rounded'}
            classes={avatarStyles}
            src={companyDetail.avatar}
          />
        </Item>
        <Info className={styles.info} useStyles={usePopularInfoStyles}>
          <InfoSubtitle>{companyDetail.name}</InfoSubtitle>
          <Typography className={styles.title}>{position}</Typography>
          {enrolled && <Chip color="secondary" size="small" label={'Aplicaste a esta oferta'} icon={<CheckCircle />} /> }
        </Info>
        <div className={styles.details} >
          <div className={styles.section}>
            <Typography variant={'caption'} className={styles.caption}>Fecha de publicacion:</Typography>
            <Typography variant={'subtitle2'} className={styles.subtitle}>{_createdAt}</Typography>
          </div>
          <div className={styles.section}>
            <Typography variant={'caption'} className={styles.caption}>Fecha de contratacion:</Typography>
            <Typography variant={'subtitle2'}className={styles.subtitle} >{_hiringDate}</Typography>
          </div>

        </div>
      </Row>
    </>
  )
};