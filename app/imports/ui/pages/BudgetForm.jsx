import React, { useState } from 'react';
import { Form, Segment, Container, Message, Grid, Button, Menu } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
import Revenue from '../components/BudgetFormComponents/Revenue';
import Expenses from '../components/BudgetFormComponents/Expenses';
import Surplus from '../components/BudgetFormComponents/Surplus';

/**
 * BudgetForm component for entering budget data using Semantic UI React Form.
 */
const BudgetForm = () => {
  const [formData, setFormData] = useState({
    fivePercent: '',
    revenues: '',
    generalFund: '',
    coreOperatingBudget: '',
    totalRevenue: '',
    personnel: '',
    managementSalary: '',
    program: '',
    contracts: '',
    grants: '',
    travel: '',
    equipment: '',
    overhead: '',
    debtService: '',
    other: '',
    totalExpenses: '',
    management: '',
    supportServices: '',
    beneficiaryAdvocacy: '',
  });
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeItem, setActiveItem] = useState('Revenue');

  // Handle input changes
  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handles menu item change
  const handleItemClick = (e, { name }) => setActiveItem(name);

  // Handle form submission
  const handleSubmit = () => {
    try {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError('Submission failed. Please try again.');
    }
  };

  // Render success message after submission
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
    <Container id={PAGE_IDS.BUDGET_FORM}>
      <Grid centered>
        <Grid.Column>
          <br />
          <h2>Budget Form</h2>
          <hr />
          {submitted ? (
            <Message positive>
              <Message.Header>Form submitted successfully!</Message.Header>
            </Message>
          ) : (
            <Form onSubmit={handleSubmit}>
              <div>
                <Menu pointing secondary>
                  <Menu.Item
                    name="Revenue"
                    active={activeItem === 'Revenue'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name="Expenses"
                    active={activeItem === 'Expenses'}
                    onClick={handleItemClick}
                  />
                  <Menu.Item
                    name="Surplus"
                    active={activeItem === 'Surplus'}
                    onClick={handleItemClick}
                  />
                </Menu>

                <Segment>
                  {activeItem === 'Revenue' && (
                    <Revenue formData={formData} handleChange={handleChange} />
                  )}
                  {activeItem === 'Expenses' && (
                    <Expenses formData={formData} handleChange={handleChange} />
                  )}
                  {activeItem === 'Surplus' && (
                    <Surplus formData={formData} handleChange={handleChange} />
                  )}
                </Segment>
              </div>
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

export default BudgetForm;
