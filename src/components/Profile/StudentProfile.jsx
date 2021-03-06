import React, { useEffect, useState } from 'react'
import './../shared/styles.css'
import { StudentNav } from '../SideNav/StudentNav'
import { Grid } from '@material-ui/core'
import { StudentAccount } from '../Detail/account/StudentAccount'
import { Qualification } from '../Detail/curriculum/Qualification'


export const StudentProfile = () => {
  const [section, setSection] = useState(0)
  const change = (value) => setSection(value)
  const [component, setComponent] = useState(<StudentAccount/>)

  useEffect(() => {
    switch (section) {
      case 0:
        setComponent(<StudentAccount/>)
        break
      case 1:
        setComponent(<Qualification/>)
        break
    }
  }, [section])


  return (
    <Grid container>
      <Grid item md={4}>
        <StudentNav change={change} />
      </Grid>
      <Grid item md={8}>
        {component}
      </Grid>
    </Grid>
  )
}
