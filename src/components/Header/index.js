import React from "react";
import { Button, Navbar } from "react-bootstrap";

export default function Header(props) {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          LagunaLink
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
                      <a href="#dashboard">{props.name}</a>
          </Navbar.Text>
          <Button variant="outline-danger">Salir</Button>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
