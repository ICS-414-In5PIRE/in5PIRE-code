import React from 'react';
import { Image } from 'react-bootstrap';

const AboutUs = () => (
  <>
    <section id="about" className="section-padding">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h1 className="display-4 fw-semibold">About Us</h1>
              <div className="line" />
              <p>In5pire is here to declutter your process and highlight what truly matters</p>
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
          <Image src="../../../public/images/Unknown_person.jpg" alt="Ben Smith" roundedCircle />
          <h2>Bobby Roth</h2>
          <p>Placeholder</p>
        </div>
        <div className="member">
          <Image src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="Jason" roundedCircle />
          <h2>Brayden Danielson</h2>
          <p>Placeholder</p>
        </div>
        <div className="member">
          <Image src="https://miro.medium.com/max/814/1*Ri024ZNn0dtXQDmswflYFw.jpeg" alt="Chris Jones" roundedCircle />
          <h2>Dao Mcgill</h2>
          <p>Placeholder</p>
        </div>
        <div className="member">
          <Image src="https://miro.medium.com/max/814/1*Ri024ZNn0dtXQDmswflYFw.jpeg" alt="Chris Jones" roundedCircle />
          <h2>Emily Hsu</h2>
          <p>Placeholder</p>
        </div>
        <div className="member">
          <Image src="https://miro.medium.com/max/814/1*Ri024ZNn0dtXQDmswflYFw.jpeg" alt="Chris Jones" roundedCircle />
          <h2>Zachary Stoddard</h2>
          <p>Placeholder</p>
        </div>
        <div className="member">
          <Image src="https://miro.medium.com/max/814/1*Ri024ZNn0dtXQDmswflYFw.jpeg" alt="Chris Jones" roundedCircle />
          <h2>Shedrick Klifford Ulibas</h2>
          <p>Placeholder</p>
        </div>
        <div className="member">
          <Image src="https://miro.medium.com/max/814/1*Ri024ZNn0dtXQDmswflYFw.jpeg" alt="Chris Jones" roundedCircle />
          <h2>Luke Pagtulingan</h2>
          <p>Placeholder</p>
        </div>
        <div className="member">
          <Image src="https://miro.medium.com/max/814/1*Ri024ZNn0dtXQDmswflYFw.jpeg" alt="Chris Jones" roundedCircle />
          <h2>Sean Sunoo</h2>
          <p>Placeholder</p>
        </div>

      </div>

    </section>

  </>
);

export default AboutUs;
