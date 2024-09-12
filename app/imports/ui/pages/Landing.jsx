import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/* A simple static component to render some text for the landing page. */
const Landing = () => (



  <section id = "hero" className="land-img min-vh-100 min-vw-100 d-flex align-items-center text-center text-white container-fluid">
    <div className="container ">
      <div className="row">
        <div className="col-12">
          <h1 className="text-uppercase display-1">In5PIRE Tool</h1>
          <h5 className="mt-3 bm-4">This tool allows users to analyze spreadsheet data and be able
            to visualize the data you need. </h5>
          <div>
            <a href="#" className="btn btn-brand ms-3"> Get Started</a>
            <a href="/about" className="btn btn-light ms-3"> About us</a>
          </div>
        </div>
      </div>
    </div>
  </section>

);

export default Landing;
