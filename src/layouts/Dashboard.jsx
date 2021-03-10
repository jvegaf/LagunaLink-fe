/* eslint-disable no-unused-vars */
import { Toolbar } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import MenuIcon from '@material-ui/icons/Menu'
import React from 'react'
import TopBar from '../components/header/TopBar'
import NavBar from '../components/nav/index'
import { useUser } from '../hooks/useUser'
import { config } from './config'
import { Content, Footer, Header, Nav, Root } from './dashboard'
import studentNavConf from '../config/student/nav'
import companyNavConf from '../config/company/nav'
import { useSelector } from 'react-redux'

export const DashBoard = () => {

  const role = useSelector(state => state.user.role)
  const navConf = role === 'ROLE_STUDENT' ? studentNavConf : companyNavConf


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
        <NavBar />
      </Nav>
      <Content>{/* content goes here */}</Content>
      <Footer>{/* footer goes here */}</Footer>
    </Root>
  )
}
