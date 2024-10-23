import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { Container, Grid, Card, Button, Icon, Header } from 'semantic-ui-react';
import FinancialProfileCard from '../components/Financial Profiles/FinancialProfileCard';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import Loader from '../components/Loader';

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
      <Loader text="Loading your financial profiles..." />
    );
  }

  return (
    <Container id={PAGE_IDS.FINANCIAL_PROFILES}>
      <Grid centered>
        <Grid.Column>
          <Grid>
            <Grid.Row columns={2} verticalAlign="middle">
              <Grid.Column floated="left">
                <Header as="h2">User&apos;s Financial Scenarios</Header>
              </Grid.Column>
              {profiles.length > 0 && (
                <Grid.Column floated="right" textAlign="right">
                  <Button color="blue" icon labelPosition="left" onClick={handleAddNewProfile}>
                    <Icon name="plus" />
                    Add New Profile
                  </Button>
                </Grid.Column>
              )}
            </Grid.Row>
          </Grid>

          {/* Grid Container for Cards */}
          <Grid stackable columns={3} className="py-3">
            {profiles.length > 0 ? (
              profiles.map((profile) => {
                const isOwner = profile.owner === Meteor.user()?.username;
                const userRole = profile.members?.find(member => member.userId === Meteor.userId())?.role || (isOwner ? 'admin' : 'viewer');

                return (
                  <Grid.Column key={profile._id} style={{ marginBottom: '20px' }}>
                    <Card fluid>
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
                    </Card>
                  </Grid.Column>
                );
              })
            ) : (
              <div style={{ color: 'gray', textAlign: 'center' }}>
                <h3>
                  No profiles have been created for this user. Please create a profile
                  <a href="/add-financial-profile" style={{ marginLeft: '5px' }}>
                    here.
                  </a>
                </h3>
              </div>
            )}
          </Grid>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default FinancialProfilesPage;
