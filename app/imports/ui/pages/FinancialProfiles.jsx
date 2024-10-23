import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Spinner, Button } from 'react-bootstrap';
import { BsBookmarkPlusFill } from 'react-icons/bs';
import swal from 'sweetalert';
import FinancialProfileCard from '../components/Financial Profiles/FinancialProfileCard';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { PAGE_IDS } from '../utilities/PageIDs';

// FinancialProfiles page
const FinancialProfilesPage = () => {
  const navigate = useNavigate();
  useTracker(() => {
    Meteor.subscribe('userEmails');
  }, []);

  // Subscribe to the financial profiles and fetch the current user's profiles
  const { financialProfiles: profiles, loading: isLoading } = useTracker(() => {
    const handler = Meteor.subscribe('FinancialProfiles'); // Subscription
    const loading = !handler.ready();
    const financialProfiles = FinancialProfiles.find({
      $or: [
        { owner: Meteor.user()?.username }, // Owner
        { 'members.userId': Meteor.userId() }, // Members
      ],
    }).fetch(); // Fetching data
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
        Meteor.call('FinancialProfiles.remove', profile._id, (error) => {
          if (error) {
            swal('Error', error.reason || 'An error occurred.', 'error');
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
        <br />
        <h1>Your Financial Scenarios</h1>
        <hr />
      </Container>
      <Row xs={3} className="justify-content-center">
        <Button className="btn-success center" variant="success" onClick={handleAddNewProfile}>Create New Financial Scenerio <BsBookmarkPlusFill /></Button>
      </Row>
      {/* Flexbox Container for Cards */}
      <Container className="d-flex justify-content-around flex-wrap py-3">
        {profiles.length > 0 ? (
          profiles.map((profile) => {
            const isOwner = profile.owner === Meteor.user()?.username;
            const userRole = profile.members?.find(member => member.userId === Meteor.userId())?.role || (isOwner ? 'admin' : 'viewer');

            return (
              <Container key={profile._id} className="flex-card py-3 d-flex" style={{ flex: '0 1 30%', margin: '10px' }}>
                <FinancialProfileCard
                  title={profile.title}
                  imgSrc={profile.image || '/images/GraphPlaceholder.png'}
                  profileType={profile.type}
                  description={profile.description || 'No description available.'}
                  createdDate={profile.createdAt?.toLocaleDateString() || 'Not available'}
                  editedDate={profile.lastEditedAt?.toLocaleDateString() || 'Not available'}
                  onDelete={isOwner ? () => handleDeleteProfile(profile) : null}
                  userRole={userRole}
                  profileId={profile._id}
                  members={profile.members}
                />
              </Container>
            );
          })
        ) : (
          <p>No financial scenarios found.</p>
        )}
      </Container>
    </Container>
  );
};

export default FinancialProfilesPage;
