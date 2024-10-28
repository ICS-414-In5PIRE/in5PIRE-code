import React, { useState } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

const InviteUsers = ({ profileId }) => {
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('viewer');
  const [showInviteForm, setShowInviteForm] = useState(false);

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

  return (
    <>
      <Row className="px-4">
        <Button
          onClick={toggleInviteForm}
          style={{
            cursor: 'pointer',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            border: '1px solid #ced4da',
            borderRadius: '5px',
            fontSize: '1rem',
            color: '#007bff',
            display: 'inline-block',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e2e6ea'; }} // Hover effect
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8f9fa'; }} // Revert hover effect
        >
          {showInviteForm ? 'Cancel Invite' : 'Invite Members'}{' '}
          {showInviteForm ? <FaChevronUp /> : <FaChevronDown />}
        </Button>
      </Row>

      {showInviteForm && (
        <Row className="px-4 pt-4">
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
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
  );
};

// Define PropTypes for validation
InviteUsers.propTypes = {
  profileId: PropTypes.string.isRequired,
};

export default InviteUsers;
