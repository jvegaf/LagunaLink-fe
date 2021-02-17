import React from 'react'
import { Button, Navbar } from 'react-bootstrap'
import LLinkLogo from '../LLinkLogo'
import { useUser } from '../../hooks/useUser'
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
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="pl-2" href="/main">
          <LLinkLogo size="40px" />
          <span className="pl-3 h3">LagunaLink</span>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="pr-3">
            <NavLink to="/dashboard">{email}</NavLink>
          </Navbar.Text>
          <Button variant="outline-danger" onClick={handleClick} style={{ width: '10em', paddingRight: '20px' }}>Salir</Button>
        </Navbar.Collapse>
      </Navbar>
  )
}
