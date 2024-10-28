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
import { FaLock } from 'react-icons/fa';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/**
 * 2FA Setup Instructions:
 * ----------------------------------------
 * 1. Install MailDev: `npm install -g maildev` and run `maildev`.
 * 2. Set `MAIL_URL="smtp://localhost:1025"` in your terminal or settings file.
 * 3. Start the Meteor app and trigger email sending (e.g., via login).
 * 4. View emails at `http://localhost:1080` in MailDev. You should also be able to see the code
 *    your terminal (where you are running Meteor).
 */

const SignIn = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [twoFactorRequired, setTwoFactorRequired] = useState(false); // Track if 2FA is required
  const [verificationCode, setVerificationCode] = useState(''); // Store the user's entered verification code
  const [formData, setFormData] = useState({ email: '', rememberMe: true });

  // Load remembered email if present
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData({ email: rememberedEmail, rememberMe: true });
    }
  }, []);

  // Define form schema
  const schema = new SimpleSchema({
    email: String,
    password: String,
    rememberMe: {
      type: Boolean,
      optional: true,
      defaultValue: true,
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  // Handle email/password login
  const submit = (doc) => {
    const { email, password, rememberMe } = doc;

    Meteor.loginWithPassword({ email }, password, (loginError) => {
      if (loginError) {
        setError(loginError.reason);
      } else {
        // Call server to send verification code
        Meteor.call('sendVerificationCode', email, (sendError) => {
          if (sendError) {
            setError('Failed to send verification code');
          } else {
            setTwoFactorRequired(true); // Switch to 2FA input mode
          }
        });

        // Handle remember me logic
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
      }
    });
  };

  // Handle verification code submission
  const verifyCode = () => {
    Meteor.call('verifyCode', { email: formData.email, code: verificationCode }, (verifyError) => {
      if (verifyError) {
        setError('Invalid verification code');
      } else {
        setRedirect(true); // Redirect after successful verification
      }
    });
  };

  // Redirect to home page on successful verification
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

              {!twoFactorRequired ? (
              // Show regular login form if 2FA is not required yet
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
              ) : (
              // Show verification code input field after email/password login
                <>
                  <p>Please enter the verification code sent to your email</p>
                  <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                  <button type="button" className="btn btn-primary" onClick={verifyCode}>
                    Verify
                  </button>
                </>
              )}

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

          {/* Display error messages if present */}
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
