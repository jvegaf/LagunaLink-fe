import { Drawer, Hidden } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import MenuIcon from '@material-ui/icons/Menu'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Content, Header, Nav, Root } from '.'
import TopBar from '../../components/header/TopBar'
import NavBar from '../../components/nav/index'
import companyNavConf from '../../config/company/nav'
import studentNavConf from '../../config/student/nav'
import { CreateJobOpenView } from '../../views/backoffice/company/CreateJobOpenView'
import { EnrollsListView } from '../../views/backoffice/company/EnrollsListView'
import { JobOpeningsView } from '../../views/backoffice/company/jobOpeningsView'
import { CompanyProfileView } from '../../views/backoffice/company/ProfileView'
import { StudentDetailView } from '../../views/backoffice/company/StudentDetailView'
import { EnrollmentsView } from '../../views/backoffice/student/EnrollmentsView'
import { StudentProfileView } from '../../views/backoffice/student/ProfileView'
import { DashboardListView } from '../../views/dashboard/DashboardListView'
import { JobOpeningDetailView } from '../../views/jobOpening/JobOpeningDetailView'
import { config } from './config'

export const DashBoard = props => {
  const user = useSelector(state => state.user)
  const navConf = conf(user.userRole)
  const navProps = { user, navConf }
  const view = checkRequest({ ...props, userRole: user.userRole, mobile:false })
  const mobNavProps = {...navProps, mobile: true}
  const [anchor, setAnchor] = useState(false)

  const toggleDrawer = anchor => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setAnchor(anchor)
  }

  const TBProps = { onMobileNavOpen: toggleDrawer }

  return (
    <Root config={config} style={{ minHeight: '100vh' }}>
      <Header
        menuIcon={{
          inactive: <MenuIcon />,
          active: <ArrowBackIcon />,
        }}
      >
        <TopBar {...TBProps} />
      </Header>
      <Nav
        collapsedIcon={{
          inactive: <ArrowBackIcon />,
          active: <ArrowForwardIcon />,
        }}
        header={
          // you can provide fixed header inside nav
          // change null to some react element
          ctx => null
        }
      >
        <NavBar {...navProps} />
        <Hidden mdUp>
          <Drawer anchor={'left'} open={anchor} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
            <NavBar {...mobNavProps} />
          </Drawer>
        </Hidden>
      </Nav>
      <Content>{view}</Content>
    </Root>
  )
}

const conf = userRole => (userRole === 'ROLE_STUDENT' ? studentNavConf : companyNavConf)

const profileView = userRole => (userRole === 'ROLE_STUDENT' ? <StudentProfileView /> : <CompanyProfileView />)

const checkRequest = props => {
  switch (props.reqView) {
    case 'dashboard':
      return <DashboardListView />
    case 'profile':
      return profileView(props.userRole)
    case 'jobOpenings':
      return <JobOpeningsView />
    case 'newjobOpening':
      return <CreateJobOpenView />
    case 'jobOpeningDetail':
      return <JobOpeningDetailView {...props.location.state} />
    case 'studentDetail':
      return <StudentDetailView {...props.location.state} />
    case 'enrollments':
      return <EnrollmentsView />
    case 'jobEnrollments':
      return <EnrollsListView {...props.location.state} />
  }
}
