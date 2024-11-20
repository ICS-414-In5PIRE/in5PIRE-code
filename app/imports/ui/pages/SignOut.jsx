import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { BsChatSquareText, BsCheckCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';

/* After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => {
  const navigate = useNavigate();
  Meteor.logout();
  return (
    <Container id={PAGE_IDS.SIGN_OUT} className="text-center">
      <br />
      <Row>
        <Col>
          <h1><BsCheckCircle className="inline" size={30} color="green" /> You are now logged out.</h1>
          <h3>We hope to see you again soon!</h3>

          <p>You&apos;ve successfully logged out on this device. Sign back in to gain access to all your financial works and spreadsheets.</p>
          <br />
          <Row className="justify-content-center">
            <Col xs={5}>
              <Button className="ui blue medium button" onClick={() => navigate('/signin')}>
                <i className="sign-in icon" />
                Sign back in
              </Button>
            </Col>
            <Col xs={5}>
              <Button className="ui blue medium button" onClick={() => navigate('/Faq')}>
                <BsChatSquareText className="bi-chat-square-text icon" />
                Frequently Asked Questions
              </Button>
            </Col>
          </Row>

        </Col>
        <Col className="justify-content-center mb-4">
          <img src="/images/logoutImg.jpg" alt="Seaside Plumeria" width="490px" />
        </Col>
      </Row>
    </Container>
  );
};

export default SignOut;
