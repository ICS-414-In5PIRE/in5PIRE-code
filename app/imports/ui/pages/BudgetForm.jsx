import React from 'react';
import { Form, Segment, Container, Grid, Button, Menu, Dropdown } from 'semantic-ui-react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import Revenue from '../components/BudgetFormComponents/Revenue';
import Expenses from '../components/BudgetFormComponents/Expenses';
import Surplus from '../components/BudgetFormComponents/Surplus';
import Loader from '../components/Loader';
import { BudgetFormInput } from '../../api/BudgetFormInput/BudgetFormInputCollection';
import { generateYears } from '../utilities/ComboBox';
import { defineMethod, removeItMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import InputSheetMessage from '../components/InputSheetMessage';

/**
 * BudgetForm component for entering budget data using Semantic UI React Form.
 *
 */
class BudgetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBar: {
        isOpen: false,
        message: '',
        isError: false,
      },
      activeItem: 'Revenue',
      isLoading: true,
      selectedYear: 2024,
      record: [],
      dropdownOptions: {},
      isSubmit: true,
    };
    this.tracker = null;
  }

  // Fires when the component mounts
  componentDidMount() {
    const { profileId } = this.props;
    console.log('Profile ID on mount:', profileId);
    this.tracker = Tracker.autorun(() => {
      const { selectedYear } = this.state;
      const subscription = BudgetFormInput.subscribeBudgetForm();
      const rdy = subscription.ready();
      const username = Meteor.user()?.username;
      const budgetFormData = BudgetFormInput.find({ owner: username, profileId, year: selectedYear }).fetch();
      this.setState({ isLoading: !rdy, record: budgetFormData, isSubmit: budgetFormData.length === 0 });
    });

    const options = {};
    const yearOptions = generateYears();
    options.yearOptions = yearOptions;
    this.setState({ dropdownOptions: options });
  }

  // Fires when the component updates
  componentDidUpdate(prevProps, prevState) {
    const { selectedYear } = this.state;
    const { profileId } = this.props;
    if (prevState.selectedYear !== selectedYear || prevProps.profileId !== profileId) {
      const username = Meteor.user()?.username;
      const budgetFormData = BudgetFormInput.find({ owner: username, year: selectedYear, profileId: profileId }).fetch();
      this.setState({ record: budgetFormData.length > 0 ? budgetFormData : [] });
      this.handleSnackBar(false, '', false);
    }
  }

  // Fires when the component unmounts
  componentWillUnmount() {
    if (this.tracker) {
      this.tracker.stop();
    }
  }

  handleBackToScenarios = () => {
    const { navigate } = this.props;
    navigate('/financial-profiles');
  };

  handleViewOverview = () => {
    const { profileId, navigate } = this.props;
    navigate(`/profile-budget-form/${profileId}`);
  };

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
    const { profileId } = this.props;
    const collectionName = BudgetFormInput.getCollectionName();
    const data = JSON.parse(JSON.stringify(record));

    if (data.length === 0) {
      data.push({});
    }

    const owner = Meteor.user()?.username;
    const budgetFormData = BudgetFormInput.find({ owner, year: selectedYear, profileId }).fetch();

    if (budgetFormData.length === 0) {
      data[0].year = selectedYear;
      data[0].owner = owner;
      data[0].profileId = profileId;

      defineMethod.callPromise({ collectionName, definitionData: data[0] })
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
      data[0].profileId = profileId;

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
    const { profileId } = this.props;
    const collectionName = BudgetFormInput.getCollectionName();
    const owner = Meteor.user()?.username;

    const budgetFormData = BudgetFormInput.find({ owner, year: selectedYear, profileId }).fetch();
    if (budgetFormData.length === 0) {
      this.handleSnackBar(true, 'No record found to delete for the selected year.', true);
      return;
    }

    const recordId = budgetFormData[0]._id;

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
    const { isLoading, activeItem, selectedYear, record, snackBar, dropdownOptions, isSubmit } = this.state;
    const username = Meteor.user()?.username;
    const budgetFormData = BudgetFormInput.find({ owner: username, year: selectedYear }).fetch();

    if (isLoading) {
      return (
        <Loader text="Loading budget form input..." />
      );
    }

    return (
      <Container id={PAGE_IDS.BUDGET_FORM}>
        <Grid.Column textAlign="left">
          <Button labelPosition="left" icon="left chevron" content="Back to Scenarios" onClick={this.handleBackToScenarios} />
        </Grid.Column>
        <Grid centered>
          <Grid.Column>
            <br />
            <h2>Budget Form</h2>
            <hr />
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
              <div>
                <Menu pointing secondary>
                  <Menu.Item
                    name="Revenue"
                    active={activeItem === 'Revenue'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Expenses"
                    active={activeItem === 'Expenses'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name="Surplus"
                    active={activeItem === 'Surplus'}
                    onClick={this.handleItemClick}
                  />
                </Menu>

                <Segment>
                  {activeItem === 'Revenue' && (
                    <Revenue formData={record[0]} handleChange={this.handleChange} />
                  )}
                  {activeItem === 'Expenses' && (
                    <Expenses formData={record[0]} handleChange={this.handleChange} />
                  )}
                  {activeItem === 'Surplus' && (
                    <Surplus formData={record[0]} handleChange={this.handleChange} />
                  )}
                </Segment>
              </div>
              <InputSheetMessage snackBar={snackBar} handleSnackBar={this.handleSnackBar} />
              <Grid className="py-3">
                <Grid.Column textAlign="right">
                  <Button primary type="submit" onClick={this.handleSubmit}>
                    {budgetFormData.length > 0 && !isSubmit ? 'Update' : 'Submit'}
                  </Button>
                  {
                    budgetFormData.length > 0 && !isSubmit && (
                      <Button color="red" onClick={this.handleDelete}>
                        Delete
                      </Button>
                    )
                  }
                  <Button primary onClick={this.handleViewOverview}>
                    View Overview
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

BudgetForm.propTypes = {
  profileId: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
};

export default BudgetForm;
