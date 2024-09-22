import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const UserGuide = () => (
  <Container className="py-5" id={PAGE_IDS.USER_GUIDE}>
    {/* Section 1: Introduction */}
    <section className="mb-5">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="display-4 text-primary">User Guide</h1>
          <p className="lead text-muted">
            Welcome to the In5pire Financial Projection Tool. This guide will walk you through using the app to input financial data, view projections, and manage CSV uploads.
          </p>
        </Col>
      </Row>
    </section>

    {/* Section 2: Inputting Financial Data */}
    <section className="mb-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">1. Inputting Financial Data</h2>
          <p className="text-muted">
            To start, you can input your organization&#39;s financial data manually. This data includes various indicators that will help you assess the financial health of your organization.
            Follow these steps:
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-sm mb-4" style={{ width: '1000px' }}>
            <Card.Body>
              <h5 className="text-primary text-start">Step 1: Navigate to the Input Page</h5>
              <p className="text-muted text-start">In the app, go to the &quot;Balance Sheet Input&quot; section located in the main navigation under the Data Input dropdown. Here, you&#39;ll be able to manually enter your financial data.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-sm mb-4" style={{ width: '1000px' }}>
            <Card.Body>
              <h5 className="text-primary">Step 2: Enter Financial Indicators</h5>
              <p className="text-muted text-start">Enter data such as total revenue, operating costs, liabilities, assets, and any other key financial indicators.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-sm mb-4" style={{ width: '1000px' }}>
            <Card.Body>
              <h5 className="text-primary">Step 3: Save Your Data</h5>
              <p className="text-muted text-start">Once all relevant data is entered, click the &quot;Submit&quot; button to store your financial information securely.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-sm mb-4" style={{ width: '1000px' }}>
            <Card.Body>
              <h5 className="text-primary">Step 4: Review Data</h5>
              <p className="text-muted text-start">After saving, you&#39;ll be able to review your inputted data and ensure everything is correct before moving on to generating projections.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>

    {/* Section 3: Viewing Financial Projections */}
    <section className="mb-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">2. Viewing Financial Projections</h2>
          <p className="text-muted">
            After entering your data, you can generate financial projections. These projections provide insights into your organization&#39;s financial health, solvency, and other key indicators.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-sm mb-4" style={{ width: '1000px' }}>
            <Card.Body>
              <h5 className="text-primary">Step 1: Generate Projections</h5>
              <p className="text-muted text-start">Click the &quot;Generate Projections&quot; button after reviewing your data. The app will calculate projections based on your inputted financial data.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-sm mb-4" style={{ width: '1000px' }}>
            <Card.Body>
              <h5 className="text-primary">Step 2: View Graphs</h5>
              <p className="text-muted text-start">You can view interactive graphs showing your organization&#39;s financial health, solvency, and viability over time based on current data.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>

    {/* Section 4: CSV Upload */}
    <section className="mb-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">3. Uploading a CSV File</h2>
          <p className="text-muted">
            Instead of manually entering data, you can upload a CSV file with the required financial information. The app will parse the file and extract the relevant data automatically.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-sm mb-4" style={{ width: '1000px' }}>
            <Card.Body>
              <h5 className="text-primary">Step 1: Prepare Your CSV</h5>
              <p className="text-muted text-start">Ensure your CSV file follows the required format: columns for revenue, expenses, liabilities, assets, etc.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-sm mb-4" style={{ width: '1000px' }}>
            <Card.Body>
              <h5 className="text-primary">Step 2: Upload the File</h5>
              <p className="text-muted text-start">Navigate to the &quot;Upload CSV&quot; section, and click the &quot;Upload&quot; button. Select your CSV file and wait for the app to process the data.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Card className="shadow-sm mb-4" style={{ width: '1000px' }}>
            <Card.Body>
              <h5 className="text-primary">Step 3: Review Extracted Data</h5>
              <p className="text-muted text-start">After the upload is complete, review the extracted data to ensure accuracy before proceeding to generate projections.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </section>

    {/* Section 5: Support */}
    <section className="mb-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">4. Need Help?</h2>
          <p className="text-muted">
            If you encounter any issues while using the app or need further assistance, feel free to reach out to our support team via email or check the <a href="/faq">FAQ</a> section for more guidance.
          </p>
        </Col>
      </Row>
    </section>
  </Container>
);

export default UserGuide;
