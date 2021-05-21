import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Content, Header, Nav, Root } from '.'
import TopBar from '../../components/header/TopBar'
import NavBar from '../../components/nav/index'
import companyNavConf from '../../config/company/nav'
import studentNavConf from '../../config/student/nav'
import { JobOpeningsView } from '../../views/backoffice/company/jobOpeningsView'
import { CompanyProfileView } from '../../views/backoffice/company/ProfileView'
import { StudentProfileView } from '../../views/backoffice/student/ProfileView'
import { DashboardListView } from '../../views/dashboard/DashboardListView'
import { JobOpeningDetailView } from '../../views/jobOpening/JobOpeningDetailView'
import { config } from './config'
import { EnrollmentsView } from '../../views/backoffice/student/EnrollmentsView'

export const DashBoard = props => {
  const { id } = useParams();
  const user = useSelector(state => state.user)
  const navUser = { ...user }
  const navConf = conf(user.userRole)
  const view = checkRequest({...props, userRole: user.userRole, detailId: id})
  
  return (
    <Root config={config} style={{ minHeight: '100vh' }}>
      <Header
        menuIcon={{
          inactive: <MenuIcon />,
          active: <ArrowBackIcon />,
        }}
        >
        <TopBar />
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
        <NavBar user={navUser} config={navConf} />
      </Nav>
      <Content>{view}</Content>
    </Root>
  )
}

const conf = userRole => userRole === 'ROLE_STUDENT' ? studentNavConf : companyNavConf

const profileView = userRole => userRole === 'ROLE_STUDENT' ? <StudentProfileView /> : <CompanyProfileView />

const checkRequest = props => {
  switch (props.reqView) {
    case 'dashboard':
      return <DashboardListView />
    case 'profile':
      return profileView(props.userRole)
    case 'jobOpenings':
      return <JobOpeningsView />
    case 'jobOpeningDetail':
      return <JobOpeningDetailView {...props}/>
    case 'enrollments':
      return <EnrollmentsView />
  }
}
