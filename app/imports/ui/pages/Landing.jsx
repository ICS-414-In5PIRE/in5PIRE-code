import React from 'react';
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import { Parallax } from 'react-parallax';
import { Fade, Slide } from 'react-awesome-reveal';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (
  <div>
    {/* Parallax Header Section */}
    <Parallax
      bgImage="https://uploads-ssl.webflow.com/5fdaca5a4d51110c2f760a05/60e84fdf2c90eff59bf3a293_spire-hero-image.jpg"
      strength={500}
      bgImageStyle={{
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className="mb-5"
    >
      <section id={PAGE_IDS.LANDING} className="min-vh-100 min-vw-100 d-flex align-items-center text-center text-white container-fluid overlay-gradient">
        <Container id={PAGE_IDS.LANDING}>
          <div className="container ">
            <div className="row">
              <div className="col-12">
                <h1 className="text-uppercase display-1">In5PIRE Tool</h1>
                <h5 className="mt-3 bm-4">This tool allows users to analyze spreadsheet data and be able
                  to visualize the data you need.
                </h5>
                <div>
                  <a href="/userguide" className="btn btn-brand ms-3"> Get Started</a>
                  <a href="/About" className="btn btn-light ms-3" data-test="about-us-link"> About us</a>

                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
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
              <Card.Img variant="top" src="/images/landing4.jpg" />
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
              <Card.Img variant="top" src="/images/landing1.jpg" />
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
              <Card.Img variant="top" src="/images/landing2.jpg" />
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
            <Image src="/images/landing3.jpg" fluid rounded />
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
            <Image src="/images/landing5.jpg" fluid rounded />
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
          <a href="/signin" className="btn btn-brand ms-3"> Get Started</a>
        </Col>
      </Row>
    </Container>
  </div>

);

export default Landing;
