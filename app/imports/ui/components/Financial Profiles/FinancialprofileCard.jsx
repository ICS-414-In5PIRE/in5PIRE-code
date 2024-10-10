// import React from 'react';
// import PropTypes from 'prop-types';
// import { Card, CardHeader, Row, Col, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, Row, Col, Button, Form } from 'react-bootstrap';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';

const FinancialProfileCard = ({
  title,
  imgSrc,
  profileType,
  description,
  createdDate,
  editedDate,
  onDelete,
  userRole,
  profileId,
  members,
}) => {

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

  const handleMemberChange = (member) => {
    setSelectedMember(member);
    setUpdatedRole(member.role); // Set the current role as default in the dropdown
  };

  const handleRoleUpdate = () => {
    if (selectedMember && updatedRole !== selectedMember.role) {
      Meteor.call('updateUserRoleInProfile', { profileId, userId: selectedMember.userId, newRole: updatedRole }, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Role updated successfully', 'success');
          setSelectedMember(null); // Clear the selection
        }
      });
    }
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

          {userRole === 'admin' && (
            <>
              <Row className="px-4">
                <Button variant="primary">Edit Profile</Button>
              </Row>
              <Row className="px-4">
                <Button variant="secondary" onClick={toggleInviteForm}>
                  {showInviteForm ? 'Cancel Invite' : 'Invite Users'}
                </Button>
              </Row>

              {showInviteForm && (
                <Row className="px-4 pt-4">
                  <Form>
                    <Form.Group controlId="formEmail"> {/* Updated to reflect email */}
                      <Form.Label>Email</Form.Label> {/* Updated label */}
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={inviteEmail} // Updated to email
                        onChange={(e) => setInviteEmail(e.target.value)} // Updated to email
                      />
                    </Form.Group>

                    <Form.Group controlId="formRole" className="mt-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        as="select"
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                      >
                        <option value="viewer">Viewer</option>
                        <option value="admin">Admin</option>
                      </Form.Control>
                    </Form.Group>

                    <Button variant="primary" className="mt-3" onClick={handleInviteSubmit}>
                      Submit Invite
                    </Button>
                  </Form>
                </Row>

              )}
            </>
          )}

          {/* /!* List of members *!/ */}
          {/* <Row className="px-4 pt-4"> */}
          {/*  <h2>Members</h2> */}
          {/*  {members && members.length > 0 ? ( */}
          {/*    members.map((member) => { */}
          {/*      // Fetch the user object based on userId */}
          {/*      const user = Meteor.users.findOne({ _id: member.userId }); */}
          {/*      // Get the user's email if available */}
          {/*      const userEmail = user && user.emails && user.emails[0] ? user.emails[0].address : 'Unknown Email'; */}

          {/*      return ( */}
          {/*        <div key={member.userId}> */}
          {/*          <p>{userEmail} - {member.role}</p> /!* Display email instead of userId *!/ */}
          {/*        </div> */}
          {/*      ); */}
          {/*    }) */}
          {/*  ) : ( */}
          {/*    <p>No members found.</p> */}
          {/*  )} */}
          {/* </Row> */}

          {/* /!* If admin, allow role change *!/ */}
          {/* {userRole === 'admin' && selectedMember && ( */}
          {/*  <Row className="px-4 pt-4"> */}
          {/*    <h3>Change Role</h3> */}
          {/*    <Form.Group controlId="formUpdateRole"> */}
          {/*      <Form.Label>New Role for {selectedMember.userEmail}</Form.Label> */}
          {/*      <Form.Control */}
          {/*        as="select" */}
          {/*        value={updatedRole} */}
          {/*        onChange={(e) => setUpdatedRole(e.target.value)} */}
          {/*      > */}
          {/*        <option value="viewer">Viewer</option> */}
          {/*        <option value="admin">Admin</option> */}
          {/*      </Form.Control> */}
          {/*    </Form.Group> */}
          {/*    <Button variant="primary" className="mt-3" onClick={handleRoleUpdate}> */}
          {/*      Update Role */}
          {/*    </Button> */}
          {/*  </Row> */}
          {/* )} */}
          {/* List of members */}
          <Row className="px-4 pt-4">
            <h2>Members</h2>
            {members && members.length > 0 ? (
              members.map((member) => {
                const user = Meteor.users.findOne({ _id: member.userId });
                const userEmail = user && user.emails && user.emails[0] ? user.emails[0].address : 'Unknown Email';

                return (
                  <div key={member.userId}>
                    <p>{userEmail} - {member.role}</p>
                    {userRole === 'admin' && (
                      <Button onClick={() => handleMemberChange({ userId: member.userId, role: member.role, userEmail })}>
                        Change Role
                      </Button>
                    )}
                  </div>
                );
              })
            ) : (
              <p>No members found.</p>
            )}
          </Row>

          {userRole === 'admin' && selectedMember && (
            <Row className="px-4 pt-4">
              <h3>Change Role</h3>
              <Form.Group controlId="formUpdateRole">
                <Form.Label>New Role for {selectedMember.userEmail}</Form.Label>
                <Form.Control
                  as="select"
                  value={updatedRole}
                  onChange={(e) => setUpdatedRole(e.target.value)}
                >
                  <option value="viewer">Viewer</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" className="mt-3" onClick={handleRoleUpdate}>
                Update Role
              </Button>
            </Row>
          )}

          {userRole !== 'viewer' && (
            <Row className="px-4 pt-4">
              <Button variant="danger" onClick={onDelete}>Delete Profile</Button>
            </Row>
          )}
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
};

// PropTypes for validation
FinancialProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  profileType: PropTypes.string,
  description: PropTypes.string,
  createdDate: PropTypes.string,
  editedDate: PropTypes.string,
  onDelete: PropTypes.func,
  userRole: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  })),
};

// Default props for optional fields
FinancialProfileCard.defaultProps = {
  profileType: 'Unknown',
  description: 'No description available.',
  createdDate: 'Not available',
  editedDate: 'Not available',
  onDelete: null,
  members: [],
};

export default FinancialProfileCard;
