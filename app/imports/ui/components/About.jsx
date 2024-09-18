import React from 'react';
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap';
import { Fade, Slide } from 'react-awesome-reveal';
import { Parallax } from 'react-parallax';

const AboutPage = () => (
  <div>
    {/* Parallax Header Section */}
    <Parallax
      bgImage="/images/GraphPlaceholder.png"
      strength={500}
      className="mb-5"
    >
      <div style={{ height: '500px' }} className="d-flex justify-content-center align-items-center">
        <h1 className="display-3 text-white">About Our App</h1>
      </div>
    </Parallax>

    <Container className="py-5">
      {/* Key Features Section with Animations */}
      <Row className="text-center mb-5">
        <Col>
          <h2 className="mb-4">Key Features</h2>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Fade>
            <Card className="shadow-sm h-100">
              <Card.Img variant="top" src="/images/GraphPlaceholder.png" />
              <Card.Body>
                <Card.Title>Financial Modeling</Card.Title>
                <Card.Text>
                  Build accurate financial representations with variables linked across multiple sheets.
                </Card.Text>
              </Card.Body>
            </Card>
          </Fade>
        </Col>
        <Col md={4} className="mb-4">
          <Slide direction="left">
            <Card className="shadow-sm h-100">
              <Card.Img variant="top" src="/images/GraphPlaceholder.png" />
              <Card.Body>
                <Card.Title>Comprehensive Reports</Card.Title>
                <Card.Text>
                  Automatically generate reports, including income statements and balance sheets.
                </Card.Text>
              </Card.Body>
            </Card>
          </Slide>
        </Col>
        <Col md={4} className="mb-4">
          <Fade>
            <Card className="shadow-sm h-100">
              <Card.Img variant="top" src="/images/GraphPlaceholder.png" />
              <Card.Body>
                <Card.Title>Advanced Forecasting</Card.Title>
                <Card.Text>
                  Project long-term financial trajectories over 4, 8, or 12 years.
                </Card.Text>
              </Card.Body>
            </Card>
          </Fade>
        </Col>
      </Row>

      {/* Benefits Section with Image Animations */}
      <Row className="my-5 text-center">
        <Col>
          <h2 className="mb-4">Why Choose Us?</h2>
        </Col>
      </Row>
      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4">
          <Slide direction="right">
            <Image src="/images/GraphPlaceholder.png" fluid rounded />
          </Slide>
        </Col>
        <Col md={6} className="mb-4">
          <Fade>
            <Card className="border-0 h-100">
              <Card.Body>
                <Card.Title>User-Friendly Interface</Card.Title>
                <Card.Text>
                  Our platform is designed with simplicity in mind, making it accessible for all users.
                </Card.Text>
              </Card.Body>
            </Card>
          </Fade>
        </Col>
      </Row>

      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4 order-md-2">
          <Slide direction="left">
            <Image src="/images/GraphPlaceholder.png" fluid rounded />
          </Slide>
        </Col>
        <Col md={6} className="mb-4 order-md-1">
          <Fade>
            <Card className="border-0 h-100">
              <Card.Body>
                <Card.Title>Customizable Models</Card.Title>
                <Card.Text>
                  Tailor your financial models to fit your specific needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Fade>
        </Col>
      </Row>

      {/* Call to Action Section */}
      <Row className="mt-5 text-center">
        <Col>
          <h3>Ready to take control of your financial future?</h3>
          <p>Sign up today and start building better financial models.</p>
          <Button variant="primary" size="lg">Get Started</Button>
        </Col>
      </Row>
    </Container>
  </div>
);

export default AboutPage;
