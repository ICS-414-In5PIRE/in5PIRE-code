import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Card, CardHeader, Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import FinancialProfileCard from '../components/BalanceSheetComponents/FinancialprofileCard';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { PAGE_IDS } from '../utilities/PageIDs';

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
