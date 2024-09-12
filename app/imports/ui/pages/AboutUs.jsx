import React from 'react';
import { Image } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <>
      <section id="about" className="section-padding">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h1 className="display-4 fw-semibold">About Us</h1>
                <div className="line"></div>  {/* This could be styled as a thin, horizontal rule to visually separate the title from the content */}
                <p>Hello, we are In5pire. We...</p>  {/* Update content as necessary */}
              </div>
            </div>
          </div>
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-6">
              {/* Consider adding 'className="img-fluid"' if you want the image to be responsive */}
              <Image style={{ height: '450px', width: '550px' }} src="/images/aboutus.png" alt="Landscape" />
            </div>
            <div className="col-lg-5">
              <h1>In5pire</h1>
              <p>
                Using In5pire, we make your life more convenient by transforming complex and overwhelming data into clear, actionable insights. Our tools are designed to streamline your workflow, reduce the cognitive load, and empower you with the information you need to make informed decisions quickly. Whether you're analyzing financial spreadsheets, managing large datasets, or needing a clearer view of your business metrics, In5pire is here to declutter your process and highlight what truly matters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>

  );
}

export default AboutUs;
