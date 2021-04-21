import React, { useEffect, useState } from 'react'
import './../shared/styles.css'
import { StudentNav } from '../nav/StudentNav'
import { Grid } from '@material-ui/core'
import { StudentAccount } from '../detail/account/StudentAccount'
import { Qualification } from '../detail/curriculum/Qualification'
import { Languages } from '../detail/curriculum/Languages'


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
      case 2:
        setComponent(<Languages/>)
        break
    }
  }, [section])


  return (
    <Grid container>
      <Grid item md={4} xl={2}>
        <StudentNav change={change}/>
      </Grid>
      <Grid item xs={12} md={8} xl={10} container justify={'center'} alignItems={'center'}>
        {component}
      </Grid>
    </Grid>
  )
}
