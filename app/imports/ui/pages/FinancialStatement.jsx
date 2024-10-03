import React, { useState } from 'react';
import { Menu, Grid, Message, Form, Container, Button, Segment } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
import Revenues from '../components/FinancialStatementComponents/Revenues';
import NetPosition from '../components/FinancialStatementComponents/NetPosition';

const FinancialStatement = () => {
  const [formData, setFormData] = useState({
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeItem, setActiveItem] = useState('Net Position');

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = () => {
    try {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError('Submission failed. Please try again.');
    }
  };

  const handleItemClick = (e, { name }) => setActiveItem(name);

  if (submitted) {
    return (
      <Container>
        <Message positive>
          <Message.Header>Form submitted successfully!</Message.Header>
        </Message>
      </Container>
    );
  }

  return (
    <Container id={PAGE_IDS.AUDITED_FS}>
      <Grid centered>
        <Grid.Column>
          <h2>Audited Financial Statement</h2>
          {submitted ? (
            <Message positive>
              <Message.Header>Form submitted successfully!</Message.Header>
            </Message>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Menu pointing secondary>
                <Menu.Item
                  name="Net Position"
                  active={activeItem === 'Net Position'}
                  onClick={handleItemClick}
                />
                <Menu.Item
                  name="Revenues"
                  active={activeItem === 'Revenues'}
                  onClick={handleItemClick}
                />
              </Menu>
              <Segment>
                {activeItem === 'Revenues' && (
                  <Revenues formData={formData} handleChange={handleChange} />
                )}
                {activeItem === 'Net Position' && (
                  <NetPosition formData={formData} handleChange={handleChange} />
                )}
              </Segment>
              {error && (
                <Message negative>
                  <Message.Header>Submission failed</Message.Header>
                  <p>{error}</p>
                </Message>
              )}
              <Grid className="py-3">
                <Grid.Column textAlign="right">
                  <Button primary type="submit">
                    Submit
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          )}
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default FinancialStatement;
