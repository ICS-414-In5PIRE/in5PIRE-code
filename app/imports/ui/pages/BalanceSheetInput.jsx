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
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { parseCSV } from '../components/CsvComponents/parseCsv';

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
      canEdit: false,
      csvData: null,
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
      const subscriptionOne = FinancialProfiles.subscribeProfiles();
      const rdy = subscription.ready() && subscriptionOne.ready();
      const username = Meteor.user()?.username;
      const balanceSheetData = BalanceSheetInputs.find({ owner: username, profileId, year: selectedYear }).fetch();
      const profileData = FinancialProfiles.findOne(profileId);
      const member = profileData?.members.find(m => m.userId === Meteor.userId());
      const canEdit = member ? member.role === 'admin' || member.role === 'analyst' : false;

      this.setState({
        isLoading: !rdy,
        record: balanceSheetData,
        isSubmit: balanceSheetData.length === 0,
        canEdit,
      });
    });

    const options = {};
    const yearOptions = generateYears();
    options.yearOptions = yearOptions;
    this.setState({ dropdownOptions: options });
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedYear, csvData } = this.state;
    const { profileId } = this.props;

    if (prevState.selectedYear !== selectedYear || prevProps.profileId !== profileId) {
      // First check if we have CSV data for this year
      if (csvData) {
        const yearData = csvData.find(row => Number(row.year) === Number(selectedYear));
        if (yearData) {
          // Don't fetch from database if we have CSV data
          return;
        }
      }

      // Only fetch from database if we don't have CSV data
      const username = Meteor.user()?.username;
      const balanceSheetData = BalanceSheetInputs.find({
        owner: username,
        profileId,
        year: selectedYear,
      }).fetch();

      // Check if a record exists for the selected year
      const isExistingRecord = balanceSheetData.length > 0;
      this.setState({
        record: isExistingRecord ? balanceSheetData : [],
        isSubmit: !isExistingRecord,
      });
      this.handleSnackBar(false, '', false);
    }
  }

  // Fires when the component unmounts
  componentWillUnmount() {
    if (this.tracker) {
      this.tracker.stop();
    }
  }

  handleViewOverview = () => {
    const { profileId, navigate } = this.props;
    navigate(`/profile-balance-sheet/${profileId}`);
  };

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

  // Handle snackbar
  handleSnackBar = (isOpen, message, isError) => {
    this.setState({ snackBar: { isOpen: isOpen, message: message, isError: isError } });
  };

  handleFileUpload = async (e) => {
    const { profileId } = this.props;
    const file = e.target.files[0];
    const owner = Meteor.user()?.username;

    try {
      const validatedData = await parseCSV(file, 'balanceSheet');
      const headers = validatedData[0];
      const dataRows = validatedData.slice(1);

      const formattedData = dataRows
        .map(row => {
          const rowData = {
            profileId,
            owner,
          };
          headers.forEach((header, index) => {
            let value = row[index];
            // Clean up numeric values
            if (typeof value === 'string') {
              // Remove spaces, commas and handle parentheses for negative numbers
              value = value.trim();
              if (value === '-') {
                value = 0;
              } else if (value.includes('(') && value.includes(')')) {
                // Handle negative numbers in parentheses
                value = -Number(value.replace(/[(),\s]/g, ''));
              } else {
                value = Number(value.replace(/[,\s]/g, '')) || 0;
              }
            }
            rowData[header] = value;
          });
          return rowData;
        })
        .filter(row => row.year > 0);

      this.setState({
        csvData: formattedData,
      }, () => {
        this.handleSnackBar(true, 'CSV data loaded. Select a year to view data.', false);
      });

    } catch (error) {
      this.handleSnackBar(true, `Error parsing CSV: ${error}`, true);
    }
  };

  handleYearChange = (e, { value }) => {
    const { csvData } = this.state;
    const { profileId } = this.props;
    const owner = Meteor.user()?.username;

    this.setState({
      selectedYear: value,
      isSubmit: true,
    });

    if (csvData && csvData.length > 0) {
      const yearData = csvData.find(row => Number(row.year) === Number(value));

      if (yearData) {
        // Make sure we keep the current profileId and owner
        const recordData = {
          ...yearData,
          profileId: profileId, // Use current profileId
          owner: owner, // Use current owner
        };

        this.setState({
          record: [recordData],
          isSubmit: true,
        }, () => {
          console.log('Updated record state:', this.state.record);
        });
      }
    }
  };

  // Render the component
  render() {
    const { isLoading, activeItem, selectedYear, record, snackBar, dropdownOptions, isSubmit, canEdit } = this.state;

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
                    <CashAndCashEquivalents formData={record[0]} handleChange={this.handleChange} canEdit={canEdit} />
                  )}
                  {activeItem === 'Other Assets' && (
                    <OtherAssets formData={record[0]} handleChange={this.handleChange} canEdit={canEdit} />
                  )}
                  {activeItem === 'Liabilities' && (
                    <Liabilities formData={record[0]} handleChange={this.handleChange} canEdit={canEdit} />
                  )}
                  {activeItem === 'Commitments And Contingencies' && (
                    <CommitmentsAndContingencies formData={record[0]} handleChange={this.handleChange} canEdit={canEdit} />
                  )}
                </Segment>
              </div>
              <InputSheetMessage snackBar={snackBar} handleSnackBar={this.handleSnackBar} />
              <Grid className="py-3">
                <Grid.Column textAlign="right">
                  {canEdit && (
                    <>
                      <Form.Field>
                        <h1>upload csv</h1>
                        <input
                          type="file"
                          accept=".csv"
                          onChange={this.handleFileUpload}
                        />
                      </Form.Field>
                      <Button primary type="submit" onClick={this.handleSubmit}>
                        {record.length > 0 && !isSubmit ? 'Update' : 'Submit'}
                      </Button>
                      {record.length > 0 && !isSubmit && (
                        <Button color="red" onClick={this.handleDelete}>
                          Delete
                        </Button>
                      )}
                    </>
                  )}
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

BalanceSheetInput.propTypes = {
  profileId: PropTypes.string.isRequired,
  navigate: PropTypes.string.isRequired,
};

export default BalanceSheetInput;
