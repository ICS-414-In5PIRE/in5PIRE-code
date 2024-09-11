import React from 'react';
import { Container, Col } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer className="mt-auto bg-light">
      <Container style={divStyle}>
        <Col className="text-center">
          Created by Team in5pire <br />
          University of Hawaii<br />
          Honolulu, HI 96822 <br />
          <a href="https://www.spirehawaii.com/">Spire Hawaii Home Page</a>
        </Col>
      </Container>
    </footer>
  );
};

export default Footer;
