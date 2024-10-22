// import React from 'react';
// import PropTypes from 'prop-types';
// import { Card, CardHeader, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Card, CardHeader, Row, Col, Button, Form } from 'react-bootstrap';
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
  // onDelete,
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

  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('viewer');
  const [selectedMember, setSelectedMember] = useState(null);
  const [updatedRole, setUpdatedRole] = useState('viewer');
  // const [members, setMembers] = useState(initialMembers);

  const toggleInviteForm = () => setShowInviteForm(!showInviteForm);

  const handleInviteSubmit = () => {
    if (!inviteEmail.trim()) {
      swal('Error', 'Email is required', 'error');
      return;
    }

    // Call the Meteor method to invite the user by email
    Meteor.call('inviteUserToProfileByEmail', { profileId, email: inviteEmail, role: inviteRole }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'User invited successfully', 'success');
        setInviteEmail(''); // Clear form
        setInviteRole('viewer'); // Reset role
        setShowInviteForm(false); // Hide form
      }
    });
  };

  const handleMemberChange = (e) => {
    const selectedUserId = e.target.value;
    const member = members.find(m => m.userId === selectedUserId);
    setSelectedMember(member);
    setUpdatedRole(member.role); // Set the current role as default in the dropdown
  };

  const handleRoleUpdate = () => {
    if (!selectedMember) {
      swal('Error', 'No member selected.', 'error');
      return;
    }

    // Check if the new role is the same as the current role
    if (updatedRole === selectedMember.role) {
      swal('Error', `The user is already assigned the role: ${updatedRole}.`, 'error');
      return;
    }

    // Check if the selected member is the owner and prevent changing their role
    if (selectedMember.userId === Meteor.userId() && selectedMember.role === 'admin') {
      swal('Error', 'You are the owner of this profile and cannot change your own role. You are destined to be an admin forever.', 'error');
      return;
    }

    // If the updated role is "remove", call the updateMethod to remove the member
    if (updatedRole === 'remove') {
      swal({
        title: `Remove ${selectedMember.userEmail} from this profile?`,
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          Meteor.call('FinancialProfiles.removeMember', profileId, selectedMember.userId, (error) => {
            if (error) {
              swal('Error', error.message, 'error');
            } else {
              swal('Success', 'Member removed successfully', 'success');
              setSelectedMember(null); // Clear the selection
            }
          });
        }
      });
      return; // Exit the function here since we are removing the member
    }

    // Proceed with the role update if the roles are different and the user is not the owner
    Meteor.call('updateUserRoleInProfile', { profileId, userId: selectedMember.userId, newRole: updatedRole }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Role updated successfully', 'success');
        setSelectedMember(null); // Clear the selection
      }
    });
  };
  return (
    <Card id="Financial-Card" className="d-flex flex-column h-100">
      <CardHeader className="d-flex justify-content-center" id="browse-financial-card-name">
        <h1>{title}</h1>
      </CardHeader>
      <Row className="flex-grow-1 d-flex">
        <img
          src={imgSrc}
          alt="Graph"
          className="img-fluid m-4"
          style={{ width: '80%', objectFit: 'contain', paddingLeft: '35px' }}
        />
      </Row>
      <Row className="flex-grow-1 d-flex">
        <Col className="d-flex flex-column">
          <Row className="px-4 pt-4">
            <h3>Profile Type</h3>
            <p>{profileType}</p>
          </Row>
          <br />
          <Row className="px-4">
            <h3>Profile Description</h3>
            <p>{description}</p>
          </Row>

          {userRole === 'admin' && (
            <>
              <h3>Admin Actions</h3>
              <Row className="px-4 mt-1">
                {/* Navigate to the edit profile page */}
                <Button variant="primary" onClick={handleEditProfile}>Edit Profile</Button>
              </Row>
              <Row className="px-4 mt-1">
                <Button variant="success" onClick={toggleInviteForm}>
                  {showInviteForm ? 'Cancel Invite' : 'Invite Users'}
                </Button>
              </Row>

              {/* Invite Users */}
              {showInviteForm && (
                <Row className="px-4 pt-4">
                  <Form>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)} // Updated to email
                      />
                    </Form.Group>

                    {selectedMember && (
                      <>
                        <Form.Group controlId="changeMemberRole" className="mb-3">
                          <Form.Label>Change Role for {selectedMember.userEmail}</Form.Label>
                          <Form.Control
                            as="select"
                            value={updatedRole}
                            onChange={(e) => setUpdatedRole(e.target.value)}
                          >
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                            {userRole === 'admin' && (
                              <option value="remove">Remove Member</option>
                            )}
                          </Form.Control>
                        </Form.Group>

                        <Button variant="primary" onClick={handleRoleUpdate}>
                          {updatedRole === 'remove' ? 'Remove Member' : 'Update Role'}
                        </Button>
                      </>
                    )}

                    <Button variant="primary" className="mt-3" onClick={handleInviteSubmit}>
                      Submit Invite
                    </Button>
                  </Form>
                </Row>

              )}
            </>
          )}
          <Row className="px-4 mt-1">
            <MemberListDropdown members={members} />
          </Row>

          {/* Manage Members - only visible if userRole is 'admin' */}
          {userRole === 'admin' && (
            <Card className="mt-4">
              <Card.Header as="h5">Manage Member Roles</Card.Header>
              <Card.Body>
                <Form.Group controlId="selectMember" className="mb-3">
                  <Form.Control as="select" onChange={handleMemberChange} className="mb-3">
                    <option value="">Select a member to manage</option>
                    {members.map((member) => {
                      const user = Meteor.users.findOne({ _id: member.userId });
                      const userEmail = user && user.emails && user.emails[0] ? user.emails[0].address : 'Unknown Email';

                      return (
                        <option key={member.userId} value={member.userId}>
                          {userEmail} - {member.role}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>

                {/* Only show the role change dropdown when a member is selected */}
                {selectedMember && (
                  <>
                    <Form.Group controlId="changeMemberRole" className="mb-3">
                      <Form.Label>Change Role for {selectedMember.userEmail}</Form.Label>
                      <Form.Control
                        as="select"
                        value={updatedRole}
                        onChange={(e) => setUpdatedRole(e.target.value)}
                      >
                        <option value="viewer">Viewer</option>
                        <option value="admin">Admin</option>
                        {/* Add "Remove Member" option only for admin */}
                        {userRole === 'admin' && (
                          <option value="remove">Remove Member</option>
                        )}
                      </Form.Control>
                    </Form.Group>
                    <Button variant="primary" onClick={handleRoleUpdate}>
                      Update Role
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          )}

        </Col>
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
