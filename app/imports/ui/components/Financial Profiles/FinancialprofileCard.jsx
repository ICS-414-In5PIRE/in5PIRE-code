import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Button, Header, Grid, Icon, Dropdown } from 'semantic-ui-react';
import { FinancialProfiles } from '../../../api/FinancialProfiles/FinancialProfilesCollection';
import MemberListDropdown from './ListMembers';

const FinancialProfileCard = ({
  title,
  imgSrc,
  profileType,
  description,
  createdDate,
  editedDate,
  userRole,
  profileId,
}) => {
  const navigate = useNavigate();
  const { members } = useTracker(() => {
    const profile = FinancialProfiles.findOne(profileId);
    return { members: profile ? profile.members : [] };
  });

  const handleEditProfile = () => {
    navigate(`/edit-financial-profile/${profileId}`);
  };

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  useEffect(() => {
    // Subscribe to userEmails to get access to users' emails
    const userEmailSubscription = Meteor.subscribe('userEmails');
    return () => {
      userEmailSubscription.stop(); // Clean up on unmount
    };
  }, []);

  return (
    <Card fluid>
      <Image src={imgSrc || '/images/GraphPlaceholder.png'} />
      <Card.Content>
        <Header as="h1" textAlign="center" style={{ marginBottom: '20px' }}>
          {title}
        </Header>
        <Grid textAlign="center">
          <Grid.Row>
            <p><strong>Profile Type: </strong>{profileType}</p>
          </Grid.Row>
          <Grid.Row>
            <p>{description}</p>
          </Grid.Row>
          <Grid.Row>
            <p style={{ fontSize: '0.8em', color: 'gray' }}>Created: {createdDate}</p>
            <p style={{ fontSize: '0.8em', color: 'gray' }}>Last Edited: {editedDate}</p>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content extra>
        <Grid columns={1}>
          {userRole === 'admin' && (
            <Grid.Column>
              <Button fluid color="blue" onClick={handleEditProfile}>
                <Icon name="edit" /> Edit Profile
              </Button>
            </Grid.Column>
          )}
          <Grid.Column>
            <Button fluid color="teal" onClick={handleViewDashboard}>
              <Icon name="dashboard" /> View Dashboard
            </Button>
          </Grid.Column>
        </Grid>
      </Card.Content>
      <Card.Content extra>
        {/* Members Dropdown */}
        <MemberListDropdown members={members} />
      </Card.Content>
      {userRole !== 'admin' && (
        <Card.Content extra>
          <Button
            color="red"
            fluid
            onClick={() => {
              swal({
                title: 'Are you sure?',
                text: 'You will be removed from this profile!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  Meteor.call('FinancialProfiles.removeMember', profileId, Meteor.userId(), (error) => {
                    if (error) {
                      swal('Error', error.message, 'error');
                    } else {
                      swal('Success', 'You have been removed from the profile', 'success');
                      navigate('/financial-profiles');
                    }
                  });
                }
              });
            }}
          >
            Leave Profile
          </Button>
        </Card.Content>
      )}
    </Card>
  );
};

// PropTypes for validation
FinancialProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  profileType: PropTypes.string,
  description: PropTypes.string,
  createdDate: PropTypes.string,
  editedDate: PropTypes.string,
  // onDelete: PropTypes.func,
  userRole: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  // members: PropTypes.arrayOf(PropTypes.shape({
  //   userId: PropTypes.string.isRequired,
  //   role: PropTypes.string.isRequired,
  // })),
};

// Default props for optional fields
FinancialProfileCard.defaultProps = {
  profileType: 'Unknown',
  description: 'No description available.',
  createdDate: 'Not available',
  editedDate: 'Not available',
  // onDelete: null,
  // members: [],
};

export default FinancialProfileCard;
