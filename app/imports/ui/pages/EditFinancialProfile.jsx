import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row, Form, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

const formSchema = new SimpleSchema({
  title: String,
  type: {
    type: String,
    allowedValues: ['Personal', 'Business'],
    defaultValue: 'Personal',
  },
  description: {
    type: String,
    optional: true,
  },
  image: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditFinancialProfile = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [updatedRole, setUpdatedRole] = useState('viewer');

  // Subscribe to the userEmails and FinancialProfiles collection
  useEffect(() => {
    const userEmailSubscription = Meteor.subscribe('userEmails');
    return () => {
      userEmailSubscription.stop();
    };
  }, []);

  const { profile, isLoading, members } = useTracker(() => {
    const subscription = Meteor.subscribe('FinancialProfiles');
    const profileData = FinancialProfiles.findOne(profileId);
    return {
      profile: profileData,
      members: profileData ? profileData.members : [],
      isLoading: !subscription.ready(),
    };
  }, [profileId]);

  useEffect(() => {
    if (profile) {
      setFormData({
        title: profile.title,
        type: profile.type,
        description: profile.description,
        image: profile.image,
      });
    }
  }, [profile]);

  const submit = (data, formRef) => {
    const { title, type, description, image } = data;
    const collectionName = FinancialProfiles.getCollectionName();
    const updateData = { id: profileId, title, type, description, image };

    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Financial profile updated successfully', 'success');
        formRef.reset();
        navigate('/financial-profiles');
      });
  };

  const handleMemberChange = (e) => {
    const selectedUserId = e.target.value;
    const member = members.find(m => m.userId === selectedUserId);

    if (!member) {
      console.error('Selected member not found');
      return;
    }

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
      swal('Error', 'You are the owner of this profile and cannot change your own role.', 'error');
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  let fRef = null;

  return (
    <Container id={PAGE_IDS.EDIT_FINANCIAL_PROFILE} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Financial Profile</h2></Col>
          {formData && (
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} model={formData} onSubmit={data => submit(data, fRef)}>
              <Card>
                <Card.Body>
                  <TextField name="title" />
                  <SelectField name="type" />
                  <TextField name="description" />
                  <TextField name="image" placeholder="Enter image URL (optional)" />
                  <SubmitField value="Update Profile" />
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          )}

          {/* List of members */}
          <Row className="px-4 pt-4">
            <h2>Members</h2>
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

                {/* Show the role change option only when a member is selected */}
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
        </Col>
      </Row>
    </Container>
  );
};

export default EditFinancialProfile;