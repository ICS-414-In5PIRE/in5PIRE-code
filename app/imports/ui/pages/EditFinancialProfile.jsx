import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { updateMethod, removeItMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import MemberListDropdown from '../components/Financial Profiles/ListMembers';
import InviteUsers from '../components/Financial Profiles/InviteUsers';
import ManageMembers from '../components/Financial Profiles/ManageMembers';

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

  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'This will delete the financial profile and cannot be undone!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          removeItMethod.callPromise({ collectionName: FinancialProfiles.getCollectionName(), instance: profileId })
            .then(() => {
              swal('Profile deleted successfully', { icon: 'success' });
              navigate('/financial-profiles');
            })
            .catch(error => swal('Error', error.message, 'error'));
        }
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  let fRef = null;

  return (
    <Container id={PAGE_IDS.EDIT_FINANCIAL_PROFILE} className="py-3">

      {/* Edit Profile Information Card */}
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
                  <Row>
                    <Col className="pt-1">
                      <Button variant="danger" onClick={handleDelete}>
                        Delete Financial Profile
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pt-1">
                      <Button variant="secondary" onClick={() => navigate('/financial-profiles')}>
                        Back to Financial Profiles
                      </Button>
                    </Col>
                  </Row>
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          )}
          {/* List the members */}
          <MemberListDropdown members={members} />
          {/* invite new members */}
          <InviteUsers profileId={profileId} />
          {/* change roles or delete members */}
          <ManageMembers profileId={profileId} members={members} />
        </Col>
      </Row>
    </Container>
  );
};

export default EditFinancialProfile;
