import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
        MoodTrack
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavDropdown
            title="Menu"
            id="basic-nav-dropdown"
            className="nav-dropdown-custom"
          >
            <NavDropdown.Item
              as={Link}
              to="/purchase"
              className="nav-link-custom"
            >
              Purchase
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/log-mood"
              className="nav-link-custom"
            >
              Log Mood
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/analytics"
              className="nav-link-custom"
            >
              Analytics
            </NavDropdown.Item>
            <NavDropdown.Item
              as={Link}
              to="/journal"
              className="nav-link-custom"
            >
              Journal
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
