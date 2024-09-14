import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, SubmitField, TextField, SelectField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

// Create a schema to specify the structure of the data to appear in the form.
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

/* Renders the AddFinancialProfile page for adding a new financial profile. */
const AddFinancialProfile = () => {
  const navigate = useNavigate();
  // On submit, insert the data.
  const submit = (data, formRef) => {
    const { title, type, description, image } = data;
    const owner = Meteor.user().username;
    const collectionName = FinancialProfiles.getCollectionName();
    const definitionData = { title, type, description, image, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Financial profile added successfully', 'success');
        formRef.reset();
        navigate('/financial-profiles');
      });
  };

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  let fRef = null;
  return (
    <Container id={PAGE_IDS.ADD_FINANCIAL_PROFILE} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Financial Profile</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="title" />
                <SelectField name="type" />
                <TextField name="description" />
                <TextField name="image" placeholder="Enter image URL (optional)" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default AddFinancialProfile;
