import React from 'react';
import { Container, Row, Col, Card, CardHeader } from 'react-bootstrap';

const FinancialProfiles = () => {
  return (
    <>
      <Container className="profile-container">
        <h1>User's Financial Profiles</h1>
      </Container>

      {/* Flexbox Container for Cards */}
      <Container className="d-flex justify-content-around flex-wrap py-3">
        {/* Card 1 */}
        <Container className="flex-card py-3 d-flex" style={{ flex: '0 1 30%', margin: '10px' }}>
          <Card id="Financial-Card" className="d-flex flex-column h-100">
            <CardHeader className="d-flex justify-content-center" id="browse-financial-card-name">
              <h1>My Personal Finances</h1>
            </CardHeader>
            <Row className="flex-grow-1 d-flex">
              <img
                src="/images/GraphPlaceholder.png"
                alt="Graph"
                className="img-fluid m-4 p-4"
                style={{ width: '80%', objectFit: 'contain' }}
              />
            </Row>
            <Row className="flex-grow-1 d-flex">
              <Col className="d-flex flex-column">
                <Row className="px-4 pt-4">
                  <h2>Profile Type</h2>
                  <p>Personal</p>
                </Row>
                <Row className="px-4">
                  <h2>Edit Profile</h2>
                </Row>
                <Row className="px-4">
                  <h2>View Projections</h2>
                </Row>
              </Col>
            </Row>
            <Row className="px-4">
              <h2>Profile Description</h2>
              <p>This is my personal finance</p>
            </Row>
            <Row className="px-4">
              <p style={{ fontSize: '0.8em', color: 'gray', marginBottom: '2px' }}>Created: January 1, 2024</p>
              <p style={{ fontSize: '0.8em', color: 'gray', marginTop: '2px' }}>Last edited: January 5, 2024</p>
            </Row>
          </Card>
        </Container>

        {/* Card 2 */}
        <Container className="flex-card py-3 d-flex" style={{ flex: '0 1 30%', margin: '10px' }}>
          <Card id="Financial-Card" className="d-flex flex-column h-100">
            <CardHeader className="d-flex justify-content-center" id="browse-financial-card-name">
              <h1>MyfirstLLC</h1>
            </CardHeader>
            <Row className="flex-grow-1 d-flex">
              <img
                src="/images/GraphPlaceholder.png"
                alt="Graph"
                className="img-thumbnail m-4 p-4"
                style={{ width: '80%', objectFit: 'contain' }}
              />
            </Row>
            <Row className="flex-grow-1 d-flex">
              <Col className="d-flex flex-column">
                <Row className="px-4 pt-4">
                  <h2>Profile Type</h2>
                  <p>Business</p>
                </Row>
                <Row className="px-4">
                  <h2>Edit Profile</h2>
                </Row>
                <Row className="px-4">
                  <h2>View Projections</h2>
                </Row>
              </Col>
            </Row>
            <Row className="px-4">
              <h2>Profile Description</h2>
              <p>This is my business finance</p>
            </Row>
            <Row className="px-4">
              <p style={{ fontSize: '0.8em', color: 'gray', marginBottom: '2px' }}>Created: February 10, 2024</p>
              <p style={{ fontSize: '0.8em', color: 'gray', marginTop: '2px' }}>Last edited: February 12, 2024</p>
            </Row>
          </Card>
        </Container>

        {/*Create new profile*/}
        <Container className="flex-card py-3 d-flex" style={{ flex: '0 1 30%', margin: '10px' }}>
          <Card id="Financial-Card" className="d-flex flex-column h-100">
            <CardHeader className="d-flex justify-content-center" id="browse-financial-card-name">
              <h1>Create a new Financial Profile</h1>
            </CardHeader>
            <Row className="flex-grow-1 d-flex">
              <img
                src="/images/GraphPlaceholder.png"
                alt="Graph"
                className="img-thumbnail m-4 p-4"
                style={{ width: '80%', objectFit: 'contain' }}
              />
            </Row>
          </Card>
        </Container>

      </Container>
    </>
  );
};

export default FinancialProfiles;
