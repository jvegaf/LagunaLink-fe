import { Divider, Grid, List, ListItem } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { EnrollListItem } from '../../../components/detail/company/enrollment/EnrollListItem'
import { LinkCard } from '../../../components/shared/Card'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    paddingTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    width: '100%',
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(8),
    paddingRight: theme.spacing(4),
  },
  gridItem: {
    flexGrow: 1,
  },
}))

export const EnrollsListView = job => {
  const { enrolls } = job
  const history = useHistory()
  const classes = useStyles()
  const studentsAvatar = useSelector(state => state.company.studentsAvatar)
  const avatarsFetched = useSelector(state => state.company.avatarsFetched)
  const [enrollments, setEnrollments] = useState(null)

  useEffect(() => {
    if(avatarsFetched){
      const enrls = enrolls.map(en => {
        const av = studentsAvatar.find(s => en.studentDetail._id === s.id)
        en.studentDetail.avatar = av.url
        return en
      })
      setEnrollments(enrls)
    }
  }, [avatarsFetched])

  const handleClick = enroll => history.push(`/app/detail/student`, enroll)

  return (
    <Grid container className={classes.root}>
      <Grid item lg={7}>
        <LinkCard title={job.position}>
          <List>
            {enrollments &&
              enrollments.map(enroll => (
                <div key={uuid()}>
                  <ListItem button onClick={() => handleClick(enroll)}>
                    <EnrollListItem {...enroll}/>
                  </ListItem>
                  <Divider />
                </div>
              ))}
          </List>
        </LinkCard>
      </Grid>
    </Grid>
  )
}
