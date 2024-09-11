import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <Container id={PAGE_IDS.LANDING} className="py-3">
    <Row className="align-middle text-center py-4">
      <Col className="d-flex flex-column justify-content-center">
        <h1 className="py-md-1" style={{ fontSize: '80px', color: 'white' }}>in5PIRE Tool</h1>
        <p className="py-md-1" style={{ fontSize: '24px', color: 'white' }}>
          This tool allows users to analyze spreadsheet data and be able
          to visualize the data you need.
        </p>
        <p className="py-1" style={{ fontSize: '24px', color: 'white' }}>
          All in one dashboard.
        </p>
      </Col>
    </Row>
    <Row className="align-middle text-center py-4">
      <Col className="d-grid gap-2">
        <Button variant="primary" size="lg" href="/signin">Login</Button>
      </Col>
      <Col className="d-grid gap-2">
        <Button variant="secondary" size="lg" href="/about">About Us</Button>
      </Col>
    </Row>
  </Container>
);

export default Landing;
