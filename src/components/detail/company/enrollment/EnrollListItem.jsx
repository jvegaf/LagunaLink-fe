import { makeStyles } from '@material-ui/core';
import NoSsr from '@material-ui/core/NoSsr';
import { Item, Row } from '@mui-treasury/components/flex';
import {
  Info,


  InfoCaption, InfoSubtitle, InfoTitle
} from '@mui-treasury/components/info';
// import { useDynamicAvatarStyles } from '@mui-treasury/styles/avatar/dynamic';
import { usePopularInfoStyles } from '@mui-treasury/styles/info/popular';
import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import { dateFormatter } from '../../../../services/date/dateFormatter';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex'
  },
  info: {
    flexGrow: 1
  }
}))

export const EnrollListItem = props => {
  const styles = useStyles()
  // eslint-disable-next-line camelcase
  const {enrollment_date, studentDetail } = props
  const _createdAt = dateFormatter(enrollment_date)
  // const avatarStyles = useDynamicAvatarStyles({
  //   height: 56,
  //   width: 64,
  //   radius: 8,
  // });
  return (
    <>
      <NoSsr>
        <GoogleFontLoader fonts={[{ font: 'Poppins', weights: [400, 700] }]} />
      </NoSsr>
      <Row gap={3} className={styles.root}>
        <Item>
          {/* <Avatar
            variant={'rounded'}
            classes={avatarStyles}
            src={}
          /> */}
        </Item>
        <Info className={styles.info} useStyles={usePopularInfoStyles}>
          <InfoSubtitle>{studentDetail.qualification.title}</InfoSubtitle>
          <InfoTitle>{`${studentDetail.name} ${studentDetail.surname} ${studentDetail.lastname}`}</InfoTitle>
          <InfoCaption>{_createdAt}</InfoCaption>
        </Info>
      </Row>
    </>
  )
};