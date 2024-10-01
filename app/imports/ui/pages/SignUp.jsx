import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, TextField, SubmitField } from 'uniforms-bootstrap5';
import { FaUserPlus } from 'react-icons/fa'; // Import an icon for the avatar
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
        return 'Email is not valid';
      }
      if (Meteor.isClient && this.isSet) {
        Meteor.call('userProfiles.isEmailUnique', this.value.toLowerCase(), (error, result) => {
          if (!result) {
            this.validationContext.addValidationErrors([{ name: 'email', type: 'notUnique' }]);
          }
        });
      }
      return null;
    },
  },
  password: {
    type: String,
    custom() {
      if (this.value.includes(' ')) {
        return 'noSpacesAllowed';
      }
      return null;
    },
  },
  confirmPassword: {
    type: String,
    custom() {
      const password = this.field('password').value;
      if (this.value !== password) {
        return 'passwordMismatch';
      }
      return null;
    },
  },
});

const bridge = new SimpleSchema2Bridge(schema);

const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const submit = (doc) => {
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
    <Container id={PAGE_IDS.SIGN_UP} fluid className="sign-in-register">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} sm={8} md={6} lg={5}>
          <Card
            className="p-4 shadow-lg"
            style={{ margin: '20px auto', width: '350px', maxWidth: '100%' }}
          >
            <Card.Body>
              {/* Centered Avatar Icon */}
              <div className="text-center mb-4">
                <div
                  className="avatar bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: '45px', height: '45px', margin: '0 auto' }}
                >
                  <FaUserPlus size={30} />
                </div>
                <h2 className="mt-3">Register</h2>
              </div>

              {/* Sign-up Form */}
              <AutoForm schema={bridge} onSubmit={submit}>
                <TextField
                  id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME}
                  name="firstName"
                  placeholder="First Name"
                  className="mb-3"
                  inputClassName="input-no-border"
                />
                <TextField
                  id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME}
                  name="lastName"
                  placeholder="Last Name"
                  className="mb-3"
                  inputClassName="input-no-border"
                />
                <TextField
                  id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL}
                  name="email"
                  placeholder="Email"
                  className="mb-3"
                  inputClassName="input-no-border"
                />
                <TextField
                  id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD}
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="mb-3"
                  inputClassName="input-no-border"
                />
                <TextField
                  id={COMPONENT_IDS.SIGN_UP_FORM_CONFIRM_PASSWORD}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className="mb-3"
                  inputClassName="input-no-border"

                />
                <ErrorsField />
                {/* Sign Up Button */}
                <SubmitField
                  id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT}
                  value="Register"
                />
              </AutoForm>

              {/* Sign In Link */}
              <div className="text-center mt-3">
                <p>
                  Already have an account? <Link to="/signin">Sign In</Link>
                </p>
              </div>
            </Card.Body>
          </Card>

          {/* Error Alert */}
          {error && (
            <Alert variant="danger" className="mt-3">
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
