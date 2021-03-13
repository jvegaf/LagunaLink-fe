/* eslint-disable no-unused-vars */
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import { useSelector } from 'react-redux'
import TopBar from '../components/header/TopBar'
import NavBar from '../components/nav/index'
import companyNavConf from '../config/company/nav'
import studentNavConf from '../config/student/nav'
import { ProfileView } from '../views/backoffice/ProfileView'
import { Content, Footer, Header, Nav, Root } from './dashboard'
import { config } from './dashboard/config'

export const DashBoard = () => {

  const user = useSelector(state => state.user)
  const navConf = user.role === 'ROLE_STUDENT' ? studentNavConf : companyNavConf
  const navUser = {
    name: user.prefName,
    avatar: user.avatar
  }

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
        <NavBar user={navUser} config={navConf}/>
      </Nav>
      <Content><ProfileView /></Content>
      <Footer>{/* footer goes here */}</Footer>
    </Root>
  )
}
