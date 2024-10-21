// import React from 'react';
// import PropTypes from 'prop-types';
// import { Card, CardHeader, Row, Col, Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Card, CardHeader, Row, Col, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
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

  useEffect(() => {
    // Subscribe to userEmails to get access to users' emails
    const userEmailSubscription = Meteor.subscribe('userEmails');
    return () => {
      userEmailSubscription.stop(); // Clean up on unmount
    };
  }, []);

  return (
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
          <Row className="px-4 pt-4 justify-content-center" style={{ textAlign: 'center' }}>
            <div>
              <strong style={{ fontSize: '1.2rem' }}>Profile Type: </strong>
              <span style={{ fontSize: '1.2rem' }}>{profileType}</span>
            </div>
          </Row>

          {userRole === 'admin' && (
            <Row className="px-4">
              {/* Navigate to the edit profile page */}
              <Button variant="primary" onClick={handleEditProfile}>Edit Profile</Button>
            </Row>
          )}
          {/* List the Members */}
          <MemberListDropdown members={members} />

        </Col>
      </Row>
      <Row className="px-4">
        <h3>Profile Description</h3>
        <p>{description}</p>
      </Row>

      {userRole !== 'admin' && (
        <Row className="px-4 pt-4">
          <Button
            variant="danger"
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
        </Row>
      )}

      <Row className="px-4">
        <p style={{ fontSize: '0.8em', color: 'gray', marginBottom: '2px' }}>Created: {createdDate}</p>
        <p style={{ fontSize: '0.8em', color: 'gray', marginTop: '2px' }}>Last edited: {editedDate}</p>
      </Row>
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
