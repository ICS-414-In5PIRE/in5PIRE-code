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

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,3}$/;
  return emailRegex.test(email.toLowerCase());
};

const schema = new SimpleSchema({
  firstName: {
    type: String,
    min: 1,
  },
  lastName: {
    type: String,
    min: 1,
  },
  email: {
    type: String,
    custom() {
      if (!validateEmail(this.value)) {
        return 'Email is not valid'; // If email is not valid
      }
      if (Meteor.isClient && this.isSet) {
        Meteor.call('userProfiles.isEmailUnique', this.value.toLowerCase(), (error, result) => {
          if (!result) {
            this.validationContext.addValidationErrors([{ name: 'email', type: 'notUnique' }]);
          }
        });
      }
      return null; // Ensures a return value in all cases
    },
  },
  password: {
    type: String,
    custom() {
      if (this.value.includes(' ')) {
        return 'noSpacesAllowed'; // If password includes spaces
      }
      return null; // Ensures a return value in all cases
    },
  },
  confirmPassword: {
    type: String,
    custom() {
      const password = this.field('password').value;
      if (this.value !== password) {
        return 'passwordMismatch'; // If passwords do not match
      }
      return null; // Ensures a return value in all cases
    },
  },
});

const bridge = new SimpleSchema2Bridge(schema);

const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const submit = (doc) => {
    // Check if passwords match before submitting
    if (doc.password !== doc.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const collectionName = UserProfiles.getCollectionName();
    const definitionData = { ...doc, email: doc.email.toLowerCase() };

    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
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
        <Col xs={12} md={6} lg={5}>
          <AutoForm schema={bridge} onSubmit={submit} model={{}}>
            <Card className="border-0 shadow-lg custom-card">
              <Card.Body>
                <h2>Register</h2>
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} name="firstName" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME} name="lastName" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" type="password" />
                <TextField
                  id={COMPONENT_IDS.SIGN_UP_FORM_CONFIRM_PASSWORD}
                  name="confirmPassword"
                  type="password"
                />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
                <Row>
                  <Col className="pt-3">
                    <p className="sign-in-register">
                      Already have an account? Login <Link to="/signin">here</Link>
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
          {error && (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              <p>{error}</p>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
