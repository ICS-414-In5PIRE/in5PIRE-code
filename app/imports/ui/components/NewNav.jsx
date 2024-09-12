import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { NavLink } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Navbar, Nav, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, CloudDownload, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { ROLE } from '../../api/role/Role';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const NewNav = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.user() ? Meteor.user().username : '',
  }), []);
  const menuStyle = { marginBottom: '10px' };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container">
      <a className="navbar-brand" href="/"><Image src="images/in5pirelogo.png" style={{ width: 200, height: 60  }} /></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div  className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/UserGuide">UserGuide</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/FinancialCompilation">FinancialCompilation (FC)</a>
          </li>
          <NavDropdown title="Support" id="navbarDropdown">
            <NavDropdown.Item as={NavLink} to="/Faq">FAQ</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/ContactSupport">Contact Support</NavDropdown.Item>
          </NavDropdown>

        </ul>

      </div>
        </div>
        {currentUser ? (
          <Nav.Link as={NavLink} to="/signout" className="btn btn-brand" style={{ width: '135px', height: '50px' }}>
            <BoxArrowRight /> Sign out
          </Nav.Link>

        ) : (
          <Nav.Link as={NavLink} to="/signin" className="btn btn-brand"style={{ width: '135px', height: '50px' }}>
            <PersonFill /> Sign in
          </Nav.Link>
        )}
    </nav>

    </>
  );
};

export default NewNav;
