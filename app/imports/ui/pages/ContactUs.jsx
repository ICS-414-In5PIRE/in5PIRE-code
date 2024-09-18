import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const ContactUsPage = () => (
  <div id="contact-us-page">
    <Container className="py-5" id={PAGE_IDS.CONTACT_US}>
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4 text-primary">Contact Us</h1>
          <p className="lead text-muted">We are a small student group working on this project. Here is how you can get in touch with us.</p>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={8}>
          {/* Submit GitHub Issue */}
          <Card className="shadow-sm contact-card mb-5">
            <Card.Body className="text-center">
              <h5 className="text-primary mb-3">Submit a GitHub Issue</h5>
              <p className="mb-4">If you encounter a bug or have a feature request, please submit an issue on our GitHub repository.</p>
              <Button variant="outline-primary" href="https://github.com/ICS-414-In5PIRE/in5PIRE-code" target="_blank" size="lg">
                GitHub Issues
              </Button>
            </Card.Body>
          </Card>

          {/* Email Us */}
          <Card className="shadow-sm contact-card mb-5">
            <Card.Body className="text-center">
              <h5 className="text-primary mb-3">Email Us</h5>
              <p className="mb-4">For general inquiries or academic-related questions, feel free to send us an email.</p>
              <Button variant="outline-primary" href="mailto:your-email@example.com" size="lg">
                Email Us
              </Button>
            </Card.Body>
          </Card>

          {/* GitHub Discussions */}
          <Card className="shadow-sm contact-card">
            <Card.Body className="text-center">
              <h5 className="text-primary mb-3">Join our GitHub Discussions</h5>
              <p className="mb-4">Join the conversation and ask questions or discuss ideas about the project on GitHub Discussions.</p>
              <Button variant="outline-primary" href="https://github.com/orgs/ICS-414-In5PIRE/discussions" target="_blank" size="lg">
                GitHub Discussions
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
);

export default ContactUsPage;
