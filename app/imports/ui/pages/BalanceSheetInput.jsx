import React from 'react';
import { Form, Segment, Container, Grid, Button, Menu, Dropdown } from 'semantic-ui-react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import OtherAssets from '../components/BalanceSheetComponents/OtherAssets';
import CashAndCashEquivalents from '../components/BalanceSheetComponents/CashAndCashEquivalents';
import Liabilities from '../components/BalanceSheetComponents/Liabilities';
import CommitmentsAndContingencies from '../components/BalanceSheetComponents/CommitmentsAndContingencies';
import { PAGE_IDS } from '../utilities/PageIDs';
import Loader from '../components/Loader';
import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputCollection';
import { defineMethod, removeItMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import InputSheetMessage from '../components/InputSheetMessage';
import { generateYears } from '../utilities/ComboBox';

/**
 * BalanceSheetInput class component for entering balance sheet data using Semantic UI React Form.
 */
class BalanceSheetInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBar: {
        isOpen: false,
        message: '',
        isError: false,
      },
      activeItem: 'Cash And Equivalents',
      isLoading: true,
      selectedYear: 2024,
      record: [],
      dropdownOptions: {},
      isSubmit: true,
    };
    this.tracker = null;
    // this.navigate = null;
  }

  // Fires when the component mounts
  componentDidMount() {
    const { profileId } = this.props;
    this.tracker = Tracker.autorun(() => {
      const { selectedYear } = this.state;
      const subscription = BalanceSheetInputs.subscribeBalanceSheet();
      const rdy = subscription.ready();
      const username = Meteor.user()?.username;
      const balanceSheetData = BalanceSheetInputs.find({ owner: username, profileId, year: selectedYear }).fetch();
      this.setState({ isLoading: !rdy, record: balanceSheetData, isSubmit: balanceSheetData.length === 0 });
    });

    const options = {};
    const yearOptions = generateYears();
    options.yearOptions = yearOptions;
    this.setState({ dropdownOptions: options });
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedYear } = this.state;
    const { profileId } = this.props;
    if (prevState.selectedYear !== selectedYear || prevProps.profileId !== profileId) {
      const username = Meteor.user()?.username;
      const balanceSheetData = BalanceSheetInputs.find({
        owner: username,
        profileId,
        year: selectedYear,
      }).fetch();
      // Check if a record exists for the selected year
      const isExistingRecord = balanceSheetData.length > 0;
      this.setState({ record: isExistingRecord ? balanceSheetData : [] });
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

  handleSubmit = () => {
    const { record, selectedYear } = this.state;
    const { profileId } = this.props;
    const collectionName = BalanceSheetInputs.getCollectionName();
    const data = JSON.parse(JSON.stringify(record));

    if (data.length === 0) {
      data.push({});
    }

    const owner = Meteor.user()?.username;
    const balanceSheetData = BalanceSheetInputs.find({
      owner,
      profileId,
      year: selectedYear,
    }).fetch();

    if (balanceSheetData.length === 0) {
      data[0].year = selectedYear;
      data[0].owner = owner;
      data[0].profileId = profileId;

      defineMethod.callPromise({ collectionName: collectionName, definitionData: data[0] })
        .then((response) => {
          const isError = response.status <= 0;
          const errorMessage = isError ? response.errorMessage : 'Record has been inserted successfully!';
          this.handleSnackBar(true, errorMessage, isError);
          this.setState({ isSubmit: false });
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

  handleDelete = () => {
    const { selectedYear } = this.state;
    const { profileId } = this.props;
    const collectionName = BalanceSheetInputs.getCollectionName();
    const owner = Meteor.user()?.username;

    const balanceSheetData = BalanceSheetInputs.find({
      owner,
      profileId,
      year: selectedYear,
    }).fetch();

    if (balanceSheetData.length === 0) {
      this.handleSnackBar(true, 'No record found to delete for the selected year.', true);
      return;
    }

    const recordId = balanceSheetData[0]._id;

    swal({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      buttons: ['Cancel', 'Delete'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // Proceed with deletion
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
      } else {
        // Optionally handle cancellation here
        this.handleSnackBar(true, 'Deletion canceled.', false);
      }
    });
  };

  // Handle year change
  handleYearChange = (e, { value }) => this.setState({ selectedYear: value });

  // Handle snackbar
  handleSnackBar = (isOpen, message, isError) => {
    this.setState({ snackBar: { isOpen: isOpen, message: message, isError: isError } });
  };

  // Render the component
  render() {
    const { isLoading, activeItem, selectedYear, record, snackBar, dropdownOptions, isSubmit } = this.state;

    if (isLoading) {
      return (
        <Loader text="Loading balance sheet input..." />
      );
    }

    return (
      <Container id={PAGE_IDS.BALANCE_SHEET_INPUT}>
        <Grid.Column textAlign="left">
          <Button labelPosition="left" icon="left chevron" content="Back to Scenarios" onClick={this.handleBackToScenarios} />
        </Grid.Column>
        <Grid centered>
          <Grid.Column>
            <br />
            <h2>Balance Sheet Input</h2>
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
                    <CashAndCashEquivalents formData={record[0]} handleChange={this.handleChange} />
                  )}
                  {activeItem === 'Other Assets' && (
                    <OtherAssets formData={record[0]} handleChange={this.handleChange} />
                  )}
                  {activeItem === 'Liabilities' && (
                    <Liabilities formData={record[0]} handleChange={this.handleChange} />
                  )}
                  {activeItem === 'Commitments And Contingencies' && (
                    <CommitmentsAndContingencies formData={record[0]} handleChange={this.handleChange} />
                  )}
                </Segment>
              </div>
              <InputSheetMessage snackBar={snackBar} handleSnackBar={this.handleSnackBar} />
              <Grid className="py-3">
                <Grid.Column textAlign="right">
                  <Button primary type="submit" onClick={this.handleSubmit}>
                    {record.length > 0 && !isSubmit ? 'Update' : 'Submit'}
                  </Button>
                  {
                    record.length > 0 && !isSubmit && (
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

BalanceSheetInput.propTypes = {
  profileId: PropTypes.string.isRequired,
  navigate: PropTypes.string.isRequired,
};

export default BalanceSheetInput;
