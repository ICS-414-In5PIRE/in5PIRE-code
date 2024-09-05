import React from 'react';
import { Container, Col } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => {
  const divStyle = { paddingTop: '15px' };
  return (
    <footer className="mt-auto bg-light">
      <Container style={divStyle}>
        <Row>
          {/* Company Information */}
          <Col md={6} className="footer-company">
            <div className="footer-title"><a href="/firm/our-firm" className="link">Our Firm</a></div>
            <ul className="footer-list">
              <li><a href="spirehawaii.com/firm/our-philosophy" className="link">Our Philosophy</a></li>
              <li><a href="spirehawaii.com/firm/our-team" className="link">Our Team</a></li>
              <li><a href="https://www.spirenewyork.com/" className="link">Spire New York</a></li>
            </ul>
            <div className="footer-contact">
              <a href="tel:+8085360066" className="link">(808) 536-0066</a><br />
              <a href="mailto:contactus@spirehi.com" className="link">contactus@spirehi.com</a><br />
              <address>700 Bishop Street, Suite 2001, Honolulu, HI 96813</address>
            </div>
          </Col>

          {/* University Information */}
          <Col md={6} className="text-center">
            <div>Department of Information and Computer Sciences</div>
            <div>University of Hawaii</div>
            <div>Honolulu, HI 96822</div>
            <a href="https://github.com/ICS-414-In5PIRE/in5PIRE.github.io">Project Home Page</a>
          </Col>
        </Row>
        <Row className="copyright-section">
          <Col className="text-center">
            <div>© Spire Hawaii LLP 2023</div>
            <a href="/privacy-policy" className="link">Privacy Policy</a>
          </Col>
        </Row>
      </Container>
    </footer>

  );
};

export default Footer;
