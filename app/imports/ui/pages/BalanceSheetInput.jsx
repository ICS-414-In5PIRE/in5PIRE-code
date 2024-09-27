import React from 'react';
import { Form, Segment, Container, Message, Grid, Button, Menu, Dropdown, Input } from 'semantic-ui-react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import OtherAssets from '../components/BalanceSheetComponents/OtherAssets';
import CashAndCashEquivalents from '../components/BalanceSheetComponents/CashAndCashEquivalents';
import Liabilities from '../components/BalanceSheetComponents/Liabilities';
import CommitmentsAndContingencies from '../components/BalanceSheetComponents/CommitmentsAndContingencies';
import { PAGE_IDS } from '../utilities/PageIDs';
import Loader from '../components/Loader';
import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputsCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

/**
 * yearOptions is an array of years for the dropdown menu.
 */
const yearOptions = Array.from(new Array(50), (val, index) => {
  const year = 2024 - index;
  return { key: year, value: year, text: year };
});

/**
 * BalanceSheetInput class component for entering balance sheet data using Semantic UI React Form.
 */
class BalanceSheetInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      activeItem: 'Cash And Equivalents',
      isLoading: true,
      selectedYear: 2024,
      record: {},
    };
    this.tracker = null;
  }

  // Fires when the component mounts
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      const { selectedYear } = this.state;
      const subscription = BalanceSheetInputs.subscribeBalanceSheet();
      const rdy = subscription.ready();
      const username = Meteor.user()?.username;
      const balanceSheetData = BalanceSheetInputs.find({ owner: username, year: selectedYear }).fetch();

      this.setState({ isLoading: !rdy, record: balanceSheetData[0] });
    });
  }

  // Fires when the component updates
  componentDidUpdate(prevProps, prevState) {
    const { selectedYear } = this.state;
    if (prevState.selectedYear !== selectedYear) {
      const username = Meteor.user()?.username;
      const balanceSheetData = BalanceSheetInputs.find({ owner: username, year: selectedYear }).fetch();
      console.log(balanceSheetData.length > 0 ? balanceSheetData[0] : {});
      this.setState({ record: balanceSheetData.length > 0 ? balanceSheetData[0] : {} });
    }
  }

  // Fires when the component unmounts
  componentWillUnmount() {
    if (this.tracker) {
      this.tracker.stop();
    }
  }

  // Handle input changes
  handleChange = (e, { name, value }) => {
    const { record } = this.state;

    const updatedFormData = { ...record, [name]: value };

    this.setState({ record: updatedFormData }, () => {
    });
  };

  // Handles menu item change
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  // Handle form submission
  handleSubmit = () => {
    const { record, selectedYear } = this.state;
    const collectionName = BalanceSheetInputs.getCollectionName();
    if ((!('owner' in record) && !('year' in record))) {
      const owner = Meteor.user()?.username;
      const data = { ...record, owner: owner, year: selectedYear };
      defineMethod.callPromise({ collectionName: collectionName, definitionData: data })
        .then(() => {
          this.setState(({ record: data }));
        })
        .catch((error) => {
          if (error) {
            this.setState({ error: error.message });
          }
        });
    }
  };

  // Handle year change
  handleYearChange = (e, { value }) => this.setState({ selectedYear: value });

  // Render the component
  render() {
    const { error, isLoading, activeItem, selectedYear, record } = this.state;

    if (isLoading) {
      return (
        <Loader text="Loading balance sheet input..." />
      );
    }

    return (
      <Container id={PAGE_IDS.BALANCE_SHEET_INPUT}>
        <Grid centered>
          <Grid.Column>
            <h2>Balance Sheet Input</h2>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                Select Year
                <Dropdown
                  placeholder="Select Year"
                  selection
                  options={yearOptions}
                  value={selectedYear}
                  onChange={this.handleYearChange}
                />
              </Form.Field>
              <div>
                <Menu pointing secondary>
                  <Menu.Item
                    name="Cash And Equivalents"
                    active={activeItem === 'Cash And Equivalents'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Other Assets"
                    active={activeItem === 'Other Assets'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Liabilities"
                    active={activeItem === 'Liabilities'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Commitments And Contingencies"
                    active={activeItem === 'Commitments And Contingencies'}
                    onClick={this.handleItemClick}
                  />
                </Menu>

                <Segment>
                  {activeItem === 'Cash And Equivalents' && (
                    <CashAndCashEquivalents formData={record} handleChange={this.handleChange} />
                  )}
                  {activeItem === 'Other Assets' && (
                    <OtherAssets formData={record} handleChange={this.handleChange} />
                  )}
                  {activeItem === 'Liabilities' && (
                    <Liabilities formData={record} handleChange={this.handleChange} />
                  )}
                  {activeItem === 'Commitments And Contingencies' && (
                    <CommitmentsAndContingencies formData={record} handleChange={this.handleChange} />
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
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default BalanceSheetInput;
