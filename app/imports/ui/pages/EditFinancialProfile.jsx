import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(FinancialProfiles._schema);

/* Renders the EditFinancialProfiles page for editing a single document. */
const EditFinancialProfiles = () => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to FinancialProfiles.
    const subscription = FinancialProfiles.subscribeFinancialProfiles();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = FinancialProfiles.findDoc(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  // On successful submit, insert the data.
  const submit = (data) => {
    const { title, type, description, image } = data;
    const collectionName = FinancialProfiles.getCollectionName();
    const updateData = { id: _id, title, type, description, image };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Item updated successfully', 'success'));
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_FINANCIAL_PROFILES} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Edit Your Financial Profile</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="title" />
                <SelectField name="type" />
                <TextField name="description" />
                <TextField name="image" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditFinancialProfiles;
