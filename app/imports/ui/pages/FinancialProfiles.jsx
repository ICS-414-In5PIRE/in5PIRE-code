import React from 'react';
import { Container } from 'react-bootstrap';

const FinancialProfiles = () => {
  <Container>
    <h1>User's Financial Profiles</h1>
  </Container>

  /* Listing the Cards */
  <Container className="mx-auto px-0 ">
    <Row className="justify-content-left">
        <Col className="pb-3 financial-profile-card">

          {/*Card 1*/}
          <Container className="py-3">
            <Card id="Financial-Card">
              <CardHeader className="d-flex justify-content-center" id="browse-club-card-name"><h1>{club.name}</h1></CardHeader>
              <Row>
                <Col>
                  <Image src={club.image} className="img-thumbnail m-4 p-4" />
                </Col>
                <Col className="d-flex flex-column">
                  <Row className="px-4 pt-4">
                    <h2> Club Type</h2>
                    <p>{club.type}</p>
                  </Row>
                  <Row className="px-4">
                    <h2> Contact Person</h2>
                    <p>{club.owner}</p>
                  </Row>
                  <Row className="px-4">
                    <h2> Contact email</h2>
                    <a href={`mailto:${club.ownerMail}`}>{club.ownerMail}</a>
                  </Row>
                </Col>
              </Row>
              <Row className="px-4">
                <h2>Club Purpose</h2>
                <p>{club.description}</p>
              </Row>
              {(currentUser) ? (
                  <Card.Footer>
                    <Row>
                      {(isAdmin) ? ''
                        : (
                          <Col>
                            {(isMember) ? (
                              <Button className="btn-danger" onClick={() => onLeaveClub(club)} id="leave-club-btn">Leave Club</Button>
                            ) : <Button className="btn-success" onClick={() => onJoinClub(club)} id="join-club-btn">Join Club</Button>}
                          </Col>
                        )}
                      <Col className="d-flex justify-content-end">
                        {(canEdit) ? (
                          <Link to={`/${club._id}`}>
                            <Button id="edit-club-link">Edit Club</Button>
                          </Link>
                        ) : ''}
                      </Col>
                    </Row>
                  </Card.Footer>
                ) :
                ''}
            </Card>
          </Container>

        </Col>
      ))}
    </Row>
  </Container>;
};

export default FinancialProfiles;
