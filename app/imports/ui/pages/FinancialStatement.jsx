import React from 'react';
import { Menu, Grid, Form, Container, Button, Segment, Dropdown } from 'semantic-ui-react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { PAGE_IDS } from '../utilities/PageIDs';
import Revenues from '../components/FinancialStatementComponents/Revenues';
import NetPosition from '../components/FinancialStatementComponents/NetPosition';
import { generateYears } from '../utilities/ComboBox';
import { defineMethod, removeItMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import InputSheetMessage from '../components/InputSheetMessage';
import { FinancialStatementInput } from '../../api/FinancialStatementInput/FinancialStatementInputCollection';
import Loader from '../components/Loader';

/**
 * FinancialStatement component for entering audited financial statement data using Semantic UI React Form.
 *
 */
class FinancialStatement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBar: {
        isOpen: false,
        message: '',
        isError: false,
      },
      activeItem: 'Net Position',
      isLoading: true,
      selectedYear: 2024,
      record: [],
      dropdownOptions: {},
    };
    this.tracker = null;
  }

  // Fires when the component mounts
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      const { selectedYear } = this.state;
      const subscription = FinancialStatementInput.subscribeFinancialStatement();
      const rdy = subscription.ready();
      const username = Meteor.user()?.username;
      const financialStatementData = FinancialStatementInput.find({ owner: username, year: selectedYear }).fetch();
      this.setState({ isLoading: !rdy, record: financialStatementData });
    });

    const options = {};
    const yearOptions = generateYears();
    options.yearOptions = yearOptions;
    this.setState({ dropdownOptions: options });
  }

  // Fires when the component updates
  componentDidUpdate(prevProps, prevState) {
    const { selectedYear } = this.state;
    if (prevState.selectedYear !== selectedYear) {
      const username = Meteor.user()?.username;
      const financialStatementData = FinancialStatementInput.find({ owner: username, year: selectedYear }).fetch();
      this.setState({ record: financialStatementData.length > 0 ? financialStatementData : [] });
      this.handleSnackBar(false, '', false);
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
    const updatedFormData = JSON.parse(JSON.stringify(record));
    if (updatedFormData.length === 0) {
      updatedFormData.push({});
    }
    updatedFormData[0][name] = value;
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
    const collectionName = FinancialStatementInput.getCollectionName();
    const data = JSON.parse(JSON.stringify(record));
    if (data.length === 0) {
      data.push({});
    }
    const owner = Meteor.user()?.username;
    const financialStatementData = FinancialStatementInput.find({ owner: owner, year: selectedYear }).fetch();
    if (financialStatementData.length === 0) {
      data[0].year = selectedYear;
      data[0].owner = owner;
      defineMethod.callPromise({ collectionName: collectionName, definitionData: data[0] })
        .then((response) => {
          const isError = response.status <= 0;
          const errorMessage = isError ? response.errorMessage : 'Record has been inserted successfully!';
          this.handleSnackBar(true, errorMessage, isError);
        })
        .catch((error) => {
          if (error) {
            this.handleSnackBar(true, 'Something went wrong!', true);
          }
        });
    } else {
      data[0].id = record[0]._id;
      updateMethod.callPromise({ collectionName, updateData: data[0] })
        .then(() => {
          this.handleSnackBar(true, 'Item updated successfully', false);
        })
        .catch((error) => {
          if (error) {
            this.handleSnackBar(true, 'Something went wrong!', true);
          }
        });
    }
  };

  // Handles delete
  handleDelete = () => {
    const { selectedYear } = this.state;
    const collectionName = FinancialStatementInput.getCollectionName();
    const owner = Meteor.user()?.username;

    const financialStatementData = FinancialStatementInput.find({ owner: owner, year: selectedYear }).fetch();
    const recordId = financialStatementData[0]._id;

    removeItMethod.callPromise({ collectionName, instance: recordId })
      .then(() => {
        this.handleSnackBar(true, 'Record has been deleted successfully!', false);
        this.setState({ record: [] });
      })
      .catch((error) => {
        if (error) {
          this.handleSnackBar(true, 'Something went wrong!', true);
        }
      });
  };

  // Handle year change
  handleYearChange = (e, { value }) => this.setState({ selectedYear: value });

  // Handle snackbar
  handleSnackBar = (isOpen, message, isError) => {
    this.setState({ snackBar: { isOpen: isOpen, message: message, isError: isError } });
  };

  render() {
    const { isLoading, activeItem, selectedYear, record, snackBar, dropdownOptions } = this.state;
    const username = Meteor.user()?.username;
    const financialStatementData = FinancialStatementInput.find({ owner: username, year: selectedYear }).fetch();

    if (isLoading) {
      return (
        <Loader text="Loading financial statement input..." />
      );
    }

    return (
      <Container id={PAGE_IDS.AUDITED_FS}>
        <Grid centered>
          <Grid.Column>
            <h2>Audited Financial Statement</h2>
            <Form>
              <Form.Field>
                Select Year
                <Dropdown
                  placeholder="Select Year"
                  selection
                  options={dropdownOptions.yearOptions}
                  value={selectedYear}
                  onChange={this.handleYearChange}
                />
              </Form.Field>
              <Menu pointing secondary>
                <Menu.Item
                  name="Net Position"
                  active={activeItem === 'Net Position'}
                  onClick={this.handleItemClick}
                />
                <Menu.Item
                  name="Revenues"
                  active={activeItem === 'Revenues'}
                  onClick={this.handleItemClick}
                />
              </Menu>
              <Segment>
                {activeItem === 'Net Position' && (
                  <NetPosition formData={record[0]} handleChange={this.handleChange} />
                )}
                {activeItem === 'Revenues' && (
                  <Revenues formData={record[0]} handleChange={this.handleChange} />
                )}
              </Segment>
              <InputSheetMessage snackBar={snackBar} handleSnackBar={this.handleSnackBar} />
              <Grid className="py-3">
                <Grid.Column textAlign="right">
                  <Button primary type="submit" onClick={this.handleSubmit}>
                    {financialStatementData.length > 0 ? 'Update' : 'Submit'}
                  </Button>
                  {
                    financialStatementData.length > 0 && (
                      <Button color="red" onClick={this.handleDelete}>
                        Delete
                      </Button>
                    )
                  }
                </Grid.Column>
              </Grid>
            </Form>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default FinancialStatement;
