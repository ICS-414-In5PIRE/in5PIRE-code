import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Row, Col } from 'react-bootstrap';

const FinancialProfileCard = ({
  title,
  imgSrc,
  profileType,
  description,
  createdDate,
  editedDate,
}) => (
  <Card id="Financial-Card" className="d-flex flex-column h-100">
    <CardHeader className="d-flex justify-content-center" id="browse-financial-card-name">
      <h1>{title}</h1>
    </CardHeader>
    <Row className="flex-grow-1 d-flex">
      <img
        src={imgSrc}
        alt="Graph"
        className="img-fluid m-4 p-4"
        style={{ width: '80%', objectFit: 'contain' }}
      />
    </Row>
    <Row className="flex-grow-1 d-flex">
      <Col className="d-flex flex-column">
        <Row className="px-4 pt-4">
          <h2>Profile Type</h2>
          <p>{profileType}</p>
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
      <p>{description}</p>
    </Row>
    <Row className="px-4">
      <p style={{ fontSize: '0.8em', color: 'gray', marginBottom: '2px' }}>Created: {createdDate}</p>
      <p style={{ fontSize: '0.8em', color: 'gray', marginTop: '2px' }}>Last edited: {editedDate}</p>
    </Row>
  </Card>
);

// Add prop-types validation
FinancialProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  profileType: PropTypes.string,
  description: PropTypes.string,
  createdDate: PropTypes.string,
  editedDate: PropTypes.string,
};

// Default props for optional fields
FinancialProfileCard.defaultProps = {
  profileType: 'Unknown',
  description: 'No description available.',
  createdDate: 'Not available',
  editedDate: 'Not available',
};

export default FinancialProfileCard;
