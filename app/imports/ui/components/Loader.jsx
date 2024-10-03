import { Container, Spinner } from 'react-bootstrap';
import React from 'react';
import PropTypes from 'prop-types';

const Loader = ({ text }) => (
  <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="text-center">
      <Spinner animation="border" role="status" />
      <h2 style={{ marginTop: '1rem' }}>{text}</h2>
    </div>
  </Container>
);

Loader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Loader;
