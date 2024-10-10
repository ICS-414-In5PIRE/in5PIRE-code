import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar, NavDropdown, Image, Container } from 'react-bootstrap';
import { Button, Icon } from 'semantic-ui-react';
import 'bootstrap/js/src/collapse.js';

const NewNav = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);

  return (
    <Navbar id="new-nav" expand="lg" className="bg-body-tertiary">
      <Container id="navbar">
        <a className="navbar-brand" href="/" aria-label="Home page">
          <Image src="images/in5pirelogo.png" style={{ width: 200, height: 60 }} alt="In5pire Logo" />
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <li><Nav.Link as={NavLink} to="/">Home</Nav.Link></li>
            <li><Nav.Link as={NavLink} to="/userguide">User Guide</Nav.Link></li>
            { currentUser && (
              <li>
                <NavDropdown title="Data Input" id="navbarDropdown">
                  <NavDropdown.Item as={NavLink} to="/financial-profiles">My Financial Scenarios</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/balance-sheet">Balance Input Form</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/budget-form">Budget Form</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/audited-fs">Audited Financial Statement</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/upload-file">Upload Files</NavDropdown.Item>
                </NavDropdown>
              </li>
            )}
            { currentUser && (
              <li>
                <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
              </li>
            )}
            <NavDropdown title="Support" id="navbarDropdown">
              <NavDropdown.Item as={NavLink} to="/aboutus">About Us</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Faq">FAQ</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Contactus">Contact Us</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          {currentUser ? (
            <Nav.Link as={NavLink} to="/signout">
              <Button color="grey" size="medium">
                <Icon name="sign-out" /> Sign out
              </Button>
            </Nav.Link>

          ) : (
            <Nav.Link as={NavLink} to="/signin">
              <Button color="blue" size="medium">
                <Icon name="sign-in" /> Sign in
              </Button>
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NewNav;
