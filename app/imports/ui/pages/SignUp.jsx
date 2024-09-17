import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

// Custom validation function
const validateEmail = (email) => {
  const emailWithTLDRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailWithTLDRegex.test(email);
};

// Define the schema
const schema = new SimpleSchema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    regEx: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    custom() {
      if (!validateEmail(this.value)) {
        return 'emailNotValid'; // Return custom error code
      }
      return null;
    },
  },
  password: {
    type: String,
  },
});

const bridge = new SimpleSchema2Bridge(schema);

const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const submit = (doc) => {
    const collectionName = UserProfiles.getCollectionName();
    const definitionData = doc;

    // Validate email manually if needed
    if (!validateEmail(doc.email)) {
      setError('Please enter a valid email address with a valid top-level domain.');
      return;
    }

    // create the new UserProfile
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        // log the new user in.
        const { email, password } = doc;
        Meteor.loginWithPassword(email, password, (err) => {
          if (err) {
            setError(err.reason);
          } else {
            setError('');
            setRedirectToRef(true);
          }
        });
      })
      .catch((err) => setError(err.reason));
  };

  if (redirectToReferer) {
    return <Navigate to="/home" />;
  }
  return (
    <Container id={PAGE_IDS.SIGN_UP} className="py-3 sign-in-register">
      <Row className="justify-content-center">
        <Col xs={5}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card className="border-0 shadow-lg custom-card">
              <Card.Body>
                <h2>Register</h2>
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} name="firstName" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME} name="lastName" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" type="password" />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
                <Row>
                  <Col>
                    <p className="sign-in-register">
                      Already have an account? Login <Link to="/signin">here</Link>
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
          {error === '' ? (
            ''
          ) : (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
