import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import {
  AutoForm,
  ErrorsField,
  TextField,
  SubmitField,
  BoolField,
} from 'uniforms-bootstrap5';
import { FaLock } from 'react-icons/fa'; // Import the lock icon
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  // State to hold initial form data
  const [formData, setFormData] = useState({ email: '', rememberMe: true });

  // Use useEffect to check for stored email when component mounts
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData({ email: rememberedEmail, rememberMe: true });
    }
  }, []);

  // Define the form schema, including the remember me checkbox
  const schema = new SimpleSchema({
    email: String,
    password: String,
    rememberMe: {
      type: Boolean,
      optional: true,
      defaultValue: true, // You can set default to true or false as per your preference
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password, rememberMe } = doc;

    Meteor.loginWithPassword({ email }, password, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        if (rememberMe) {
          // Store the email in localStorage
          localStorage.setItem('rememberedEmail', email);
        } else {
          // Remove the email from localStorage if it exists
          localStorage.removeItem('rememberedEmail');
        }
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Container id={PAGE_IDS.SIGN_IN} fluid className="sign-in-register">
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
                  <FaLock size={30} />
                </div>
                <h2 className="mt-3">Sign In</h2>
              </div>

              {/* Sign-in Form */}
              <AutoForm schema={bridge} onSubmit={submit} model={formData}>
                <TextField
                  className="mb-3"
                  inputClassName="input-no-border"
                  id={COMPONENT_IDS.SIGN_IN_FORM_EMAIL}
                  name="email"
                  placeholder="Enter email"
                />
                <TextField
                  className="mb-3"
                  inputClassName="input-no-border"
                  id={COMPONENT_IDS.SIGN_IN_FORM_PASSWORD}
                  name="password"
                  placeholder="Enter password"
                  type="password"
                />
                <BoolField
                  name="rememberMe"
                  label="Remember me"
                  className="form-check d-flex justify-content-center mb-3"
                />
                <ErrorsField />
                <SubmitField
                  id={COMPONENT_IDS.SIGN_IN_FORM_SUBMIT}
                  value="Sign In"
                />
              </AutoForm>

              {/* Forgot Password Link */}
              <div className="text-center mt-3">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-2">
                <p>
                  Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
                </p>

              </div>
            </Card.Body>
          </Card>

          {/* Error Alert */}
          {error && (
            <Alert variant="danger" className="mt-3">
              <Alert.Heading>Login was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
