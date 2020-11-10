import React from "react";
import { Button, Navbar } from "react-bootstrap";
import LLinkLogo from "../LLinkLogo";

export const Header = (props) => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#main">
          <LLinkLogo size="40px" />
          <span className="ml-2 h3">LagunaLink</span>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="mr-3">
            <a href="#dashboard">{props.email}</a>
          </Navbar.Text>
          <Button variant="outline-danger" style={{width: 100}}>Salir</Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
