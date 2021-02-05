import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import LLinkLogo from '../LLinkLogo'
import { useUser } from './../../hooks/useUser'
import { NavLink, useHistory } from 'react-router-dom'

export const Header = () => {
  const { email, signOutReq } = useUser()
  const history = useHistory()

  const handleClick = e => {
    e.preventDefault()
    signOutReq()
    history.push('/signin')
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/main">
          <LLinkLogo size="40px" />
          <span className="ml-2 h3">LagunaLink</span>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="mr-3">
            <NavLink to="/dashboard">{email}</NavLink>
          </Navbar.Text>
          <Button variant="outline-danger" onClick={handleClick} style={{ width: 100 }}>Salir</Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
