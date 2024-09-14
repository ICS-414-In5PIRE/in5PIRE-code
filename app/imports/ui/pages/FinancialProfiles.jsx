import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader } from 'react-bootstrap';
import PropTypes from 'prop-types'; // PropTypes for validation

// FinancialProfileCard Component
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

// PropTypes for validation
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

// FinancialProfiles page
const FinancialProfiles = () => {
  const navigate = useNavigate();

  // Handler to navigate to the "new profile" page
  const handleAddNewProfile = () => {
    navigate('/balance-sheet');
  };

  return (
    <>
      <Container className="profile-container">
        <h1>User&apos;s Financial Profiles</h1>
      </Container>

      {/* Flexbox Container for Cards */}
      <Container className="d-flex justify-content-around flex-wrap py-3">
        {/* Card 1 */}
        <Container className="flex-card py-3 d-flex" style={{ flex: '0 1 30%', margin: '10px' }}>
          <FinancialProfileCard
            title="My Personal Finances"
            imgSrc="/images/GraphPlaceholder.png"
            profileType="Personal"
            description="This is my personal finance"
            createdDate="January 1, 2024"
            editedDate="January 5, 2024"
          />
        </Container>

        {/* Card 2 */}
        <Container className="flex-card py-3 d-flex" style={{ flex: '0 1 30%', margin: '10px' }}>
          <FinancialProfileCard
            title="MyfirstLLC"
            imgSrc="/images/GraphPlaceholder.png"
            profileType="Business"
            description="This is my business finance"
            createdDate="February 10, 2024"
            editedDate="February 12, 2024"
          />
        </Container>

        {/* Hard-Coded Add New Profile Card */}
        <Container
          className="flex-card py-3 d-flex"
          style={{ flex: '0 1 30%', margin: '10px', cursor: 'pointer' }}
          onClick={handleAddNewProfile} // Make the card clickable
        >
          <Card id="Financial-Card" className="d-flex flex-column h-100">
            <CardHeader className="d-flex justify-content-center" id="browse-financial-card-name">
              <h1>Create a New Financial Profile</h1>
            </CardHeader>
            <Row className="flex-grow-1 d-flex">
              <img
                src="/images/GraphPlaceholder.png"
                alt="Add New Profile"
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
