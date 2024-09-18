import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card, CardHeader, Spinner, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { PAGE_IDS } from '../utilities/PageIDs';

// FinancialProfileCard Component
const FinancialProfileCard = ({
  title,
  imgSrc,
  profileType,
  description,
  createdDate,
  editedDate,
  onDelete,
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
        {/* Delete Button */}
        <Row className="px-4 pt-4">
          <Button variant="danger" onClick={onDelete}>Delete Profile</Button>
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
  onDelete: PropTypes.func.isRequired,
};

// Default props for optional fields
FinancialProfileCard.defaultProps = {
  profileType: 'Unknown',
  description: 'No description available.',
  createdDate: 'Not available',
  editedDate: 'Not available',
};

// FinancialProfiles page
const FinancialProfilesPage = () => {
  const navigate = useNavigate();

  // Subscribe to the financial profiles and fetch the current user's profiles
  const { financialProfiles: profiles, loading: isLoading } = useTracker(() => {
    const handler = Meteor.subscribe('FinancialProfiles'); // Subscription
    const loading = !handler.ready();
    const financialProfiles = FinancialProfiles.find({ owner: Meteor.user()?.username }).fetch(); // Fetching data
    return { financialProfiles, loading };
  }, []);

  // Handler to navigate to the "new profile" page
  const handleAddNewProfile = () => {
    navigate('/add-financial-profile');
  };

  // Handler to delete a financial profile
  const handleDeleteProfile = (profile) => {
    swal({
      title: `Really delete profile ${profile.title}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        FinancialProfiles.removeIt(profile._id, (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Profile deleted successfully', 'success');
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <h2 style={{ marginTop: '1rem' }}>Loading your financial profiles...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container id={PAGE_IDS.FINANCIAL_PROFILES}>
      <Container className="profile-container">
        <h1>User&apos;s Financial Profiles</h1>
      </Container>

      {/* Flexbox Container for Cards */}
      <Container className="d-flex justify-content-around flex-wrap py-3">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            <Container key={profile._id} className="flex-card py-3 d-flex" style={{ flex: '0 1 30%', margin: '10px' }}>
              <FinancialProfileCard
                title={profile.title}
                imgSrc={profile.image || '/images/GraphPlaceholder.png'}
                profileType={profile.type}
                description={profile.description || 'No description available.'}
                createdDate={profile.createdAt?.toLocaleDateString() || 'Not available'}
                editedDate={profile.lastEditedAt?.toLocaleDateString() || 'Not available'}
                onDelete={() => handleDeleteProfile(profile)}
              />
            </Container>
          ))
        ) : (
          <p>No financial profiles found.</p>
        )}

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
    </Container>
  );
};

export default FinancialProfilesPage;
