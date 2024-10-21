import React, { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from 'prop-types';
import swal from 'sweetalert';

const ManageMembers = ({ profileId, members }) => {
  const [showManageMembers, setShowManageMembers] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [updatedRole, setUpdatedRole] = useState('viewer');

  const toggleManageMembers = () => {
    setShowManageMembers(!showManageMembers);
  };

  const handleMemberChange = (e) => {
    const selectedUserId = e.target.value;
    const member = members.find(m => m.userId === selectedUserId);
    setSelectedMember(member);
    setUpdatedRole(member.role);
  };

  const handleRoleUpdate = () => {
    if (!selectedMember) {
      swal('Error', 'No member selected.', 'error');
      return;
    }

    if (updatedRole === selectedMember.role) {
      swal('Error', `The user is already assigned the role: ${updatedRole}.`, 'error');
      return;
    }

    if (selectedMember.userId === Meteor.userId() && selectedMember.role === 'admin') {
      swal('Error', 'You are the owner of this profile and cannot change your own role. You are destined to be an admin forever.', 'error');
      return;
    }

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
              setSelectedMember(null);
            }
          });
        }
      });
      return;
    }

    Meteor.call('updateUserRoleInProfile', { profileId, userId: selectedMember.userId, newRole: updatedRole }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Role updated successfully', 'success');
        setSelectedMember(null);
      }
    });
  };

  return (
    <div>
      {/* Manage Members Button to Toggle Dropdown */}
      <Row className="px-4">
        <Button
          onClick={toggleManageMembers}
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
          {showManageMembers ? 'Hide Manage Members' : 'Manage Members'}{' '}
          {showManageMembers ? <FaChevronUp /> : <FaChevronDown />}
        </Button>
      </Row>

      {/* Dropdown content: Show member management form */}
      {showManageMembers && (
        <Row className="px-4 pt-4">
          {members && members.length > 0 ? (
            <>
              <Form.Group controlId="selectMember">
                <Form.Label>Manage Member Role</Form.Label>
                <Form.Control as="select" onChange={handleMemberChange}>
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

              {selectedMember && (
                <Form.Group controlId="changeMemberRole" className="mt-3">
                  <Form.Label>Change Role for {selectedMember.userEmail}</Form.Label>
                  <Form.Control
                    as="select"
                    value={updatedRole}
                    onChange={(e) => setUpdatedRole(e.target.value)}
                  >
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                    <option value="remove">Remove Member</option>
                  </Form.Control>
                  <Button variant="primary" className="mt-3" onClick={handleRoleUpdate}>
                    Update Role
                  </Button>
                </Form.Group>
              )}
            </>
          ) : (
            <p>No members found.</p>
          )}
        </Row>
      )}
    </div>
  );
};

ManageMembers.propTypes = {
  profileId: PropTypes.string.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired, // members must be an array and is required
};

export default ManageMembers;
