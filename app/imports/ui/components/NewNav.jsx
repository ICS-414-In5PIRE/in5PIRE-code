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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/"><Image src="images/in5pirelogo.png" style={{ width: 200, height: 60  }} /></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a class="nav-link" href="/home">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/home">UserGuide</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/home">FinancialCompilation (FC)</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/home">FAQ</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/home">Contact Support</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/home">Login</a>
          </li>

        </ul>
      </div>
    </nav>
    </>
  );
};

export default NewNav;
