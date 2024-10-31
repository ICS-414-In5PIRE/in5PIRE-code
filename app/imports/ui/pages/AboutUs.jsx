import React from 'react';
import { Container, Image } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const AboutUs = () => (
  <Container id={PAGE_IDS.ABOUT_US}>
    <section id="about-us" className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h1 className="display-4 fw-semibold">About Us</h1>
              <div className="line" />
              <p>In5pire is here to declutter your process and highlight what truly matters.</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-6">
            <Image className="img-fluid" style={{ maxHeight: '450px', maxWidth: '100%' }} src="/images/aboutus.png" alt="About Us landscape" />
          </div>
          <div className="col-lg-5">
            <h1>In5pire</h1>
            <p>
              Using In5pire, we simplify your life by turning complex data into clear, actionable insights. Our tools streamline workflows, reduce cognitive load, and empower quick, informed decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h1 className="title">Our Team</h1>
      <div className="team-row">
        <div className="member">
          <Image src="https://avatars.githubusercontent.com/u/110771308?v=4" alt="Bobby Roth" roundedCircle />
          <h2>Bobby Roth</h2>
          <a href="https://github.com/bobbyir" target="_blank" rel="noreferrer noopener">GitHub Profile</a>
        </div>
        <div className="member">
          <Image src="https://avatars.githubusercontent.com/u/143555858?v=4" alt="Brayden Danielson" roundedCircle />
          <h2>Brayden Danielson</h2>
          <a href="https://github.com/bfd2" target="_blank" rel="noreferrer noopener">GitHub Profile</a>
        </div>
        <div className="member">
          <Image src="https://avatars.githubusercontent.com/u/77309217?v=4" alt="Dao McGill" roundedCircle />
          <h2>Dao McGill</h2>
          <a href="https://github.com/daomcgill" target="_blank" rel="noreferrer noopener">GitHub Profile</a>
        </div>
        <div className="member">
          <Image src="https://avatars.githubusercontent.com/u/156912540?v=4" alt="Emily Hsu" roundedCircle />
          <h2>Emily Hsu</h2>
          <a href="https://github.com/ehsuGit" target="_blank" rel="noreferrer noopener">GitHub Profile</a>
        </div>
        <div className="member">
          <Image src="https://avatars.githubusercontent.com/u/107680213?v=4" alt="Shedrick Klifford Ulibas" roundedCircle />
          <h2>Shedrick Klifford Ulibas</h2>
          <a href="https://github.com/skulibas" target="_blank" rel="noreferrer noopener">GitHub Profile</a>
        </div>
        <div className="member">
          <Image src="https://avatars.githubusercontent.com/u/87156222?v=4" alt="Luke Pagtulingan" roundedCircle />
          <h2>Luke Pagtulingan</h2>
          <a href="https://github.com/lukepag" target="_blank" rel="noreferrer noopener">GitHub Profile</a>
        </div>
        <div className="member">
          <Image src="https://avatars.githubusercontent.com/u/97641529?v=4" alt="Sean Sunoo" roundedCircle />
          <h2>Sean Sunoo</h2>
          <a href="https://github.com/ssunoo2" target="_blank" rel="noreferrer noopener">GitHub Profile</a>
        </div>
      </div>
    </section>
  </Container>
);

export default AboutUs;
