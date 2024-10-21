import React from 'react';
import { Container, Card, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddNewFinancialProfileCard = ({ onClick }) => (
  <Container
    className="flex-card py-3 d-flex"
    style={{
      flex: '0 1 30%',
      margin: '10px',
      cursor: 'pointer',
      borderRadius: '15px', // Rounded corners
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
      transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover transition
    }}
    onClick={onClick} // Make the card clickable
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    }}
  >
    <Card id="Financial-Card" className="d-flex flex-column h-100">
      <Card.Header
        className="d-flex justify-content-center"
        id="browse-financial-card-name"
        style={{
          padding: '20px',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          backgroundColor: '#f8f9fa',
          borderBottom: 'none', // Remove border for a clean look
          color: '#343a40', // Darker text for better readability
        }}
      >
        Create a New Financial Scenario
      </Card.Header>
      <Row className="flex-grow-1 d-flex justify-content-center align-items-center">
        <img
          src="/images/AddButton.png"
          alt="Add New Profile"
          className="img-thumbnail m-4 p-2"
          style={{
            width: '70%', // Smaller image for better alignment
            objectFit: 'contain',
          }}
        />
      </Row>
    </Card>
  </Container>
);

// Props validation
AddNewFinancialProfileCard.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddNewFinancialProfileCard;
