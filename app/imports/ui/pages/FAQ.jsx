import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const FAQ = () => (
  <Container className="py-5" id={PAGE_IDS.FAQ}>
    <Row className="mb-5 text-center">
      <Col>
        <h1 className="display-4">Frequently Asked Questions</h1>
        <p className="lead">Here are some of the most common questions we get from users.</p>
      </Col>
    </Row>

    <Row>
      <Col md={{ span: 8, offset: 2 }}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>What is the In5PIRE Tool?</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt orci in pharetra scelerisque.
              Integer in varius felis. Fusce ut pulvinar nisl. Vivamus nec diam vehicula, tincidunt nunc a,
              pellentesque libero.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>How do I get started?</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec tincidunt odio, a dapibus orci.
              Aenean sit amet dui non metus ullamcorper feugiat. Morbi laoreet, libero a volutpat vestibulum, sapien
              leo hendrerit magna, et dictum neque purus id purus.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="2">
            <Accordion.Header>What types of data can I analyze?</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras id augue ut ex convallis gravida. Integer
              condimentum tortor id lacus auctor, ac lacinia turpis pharetra. Phasellus tincidunt justo vitae orci
              fermentum, eget sagittis libero egestas.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="3">
            <Accordion.Header>How do I import data?</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent blandit lectus nec ligula cursus,
              ac rutrum dolor porttitor. Nullam vitae lacus at turpis venenatis tempus. In vel ultricies ex.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="4">
            <Accordion.Header>How secure is my data?</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam laoreet, ante vel lobortis varius,
              sapien dui scelerisque eros, eget porttitor nunc magna sit amet ex. Nam laoreet, erat nec scelerisque
              congue, mi ligula volutpat dui, ut facilisis quam velit a nisl.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="5">
            <Accordion.Header>What support do you offer?</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit mi id lacus tincidunt
              sollicitudin. Nulla suscipit leo at ultricies ullamcorper. Aliquam eget mauris at urna consectetur
              mollis. Fusce ac urna nec lorem efficitur gravida.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  </Container>
);

export default FAQ;
