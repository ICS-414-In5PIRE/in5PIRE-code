import React from 'react';
import { Form, Segment, Container, Grid, Button, Menu, Dropdown } from 'semantic-ui-react';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import OtherAssets from '../components/BalanceSheetComponents/OtherAssets';
import CashAndCashEquivalents from '../components/BalanceSheetComponents/CashAndCashEquivalents';
import Liabilities from '../components/BalanceSheetComponents/Liabilities';
import CommitmentsAndContingencies from '../components/BalanceSheetComponents/CommitmentsAndContingencies';
import { PAGE_IDS } from '../utilities/PageIDs';
import Loader from '../components/Loader';
import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputsCollection';
import { defineMethod, removeItMethod, updateMethod } from '../../api/base/BaseCollection.methods';
import InputSheetMessage from '../components/InputSheetMessage';
import { generateYears, generateProfiles } from '../utilities/ComboBox';

/**
 * BalanceSheetInput class component for entering balance sheet data.
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
      profileId: null,
      hasSubmitted: false,
    };
    this.tracker = null;
  }

  // Fires when the component mounts
  componentDidMount() {
    this.tracker = Tracker.autorun(() => {
      this.populateDropdowns();
      this.grabRecords();
    });
  }

  // Fires when the component updates
  componentDidUpdate(prevProps, prevState) {
    const { selectedYear, profileId } = this.state;
    if (prevState.selectedYear !== selectedYear || prevState.profileId !== profileId) {
      const username = Meteor.user()?.username;
      const balanceSheetData = BalanceSheetInputs.find({
        owner: username,
        profileId,
        year: selectedYear,
      }).fetch();
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

  // Populates the dropdowns
  populateDropdowns = () => {
    const handler = Meteor.subscribe('FinancialProfiles');
    const isFinancialProfilesReady = handler.ready();
    const options = {};
    const yearOptions = generateYears();
    const profiles = generateProfiles(Meteor.user()?.username, Meteor.userId());
    options.yearOptions = yearOptions;
    options.profileOptions = profiles;
    this.setState({ dropdownOptions: options, profileId: profiles[0]?.value, isLoading: !isFinancialProfilesReady });
  };

  // Fetches the records
  grabRecords = () => {
    const { selectedYear, profileId } = this.state;
    const subscription = BalanceSheetInputs.subscribeBalanceSheet();
    const username = Meteor.user()?.username;
    const isBalanceSheetReady = subscription.ready();
    const balanceSheetData = BalanceSheetInputs.find({
      owner: username,
      profileId,
      year: selectedYear,
    }).fetch();
    this.setState({ isLoading: !isBalanceSheetReady, record: balanceSheetData, hasSubmitted: balanceSheetData.length > 0 });
  };

  // Handle input changes
  handleChange = (e, { name, value }) => {
    const { record } = this.state;
    const updatedFormData = JSON.parse(JSON.stringify(record));
    if (updatedFormData.length === 0) {
      updatedFormData.push({});
    }
    updatedFormData[0][name] = value;
    this.setState({ record: updatedFormData, hasSubmitted: false }, () => {
    });
  };

  // Handles menu item change
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  // Handles form submission
  handleSubmit = () => {
    const { record, selectedYear, profileId } = this.state;
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

    this.tracker = Tracker.autorun(() => {
      this.setState({ hasSubmitted: true });
      this.grabRecords();
    });
  };

  handleDelete = () => {
    const { selectedYear, profileId } = this.state;
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

  // Handle dropdown
  handleDropdown = (e, data) => {
    this.setState({ [data.name]: data.value });
  };

  // Handle snackbar
  handleSnackBar = (isOpen, message, isError) => {
    this.setState({ snackBar: { isOpen: isOpen, message: message, isError: isError } });
  };

  // Render the component
  render() {
    const { isLoading, activeItem, selectedYear, record, snackBar, dropdownOptions, profileId, hasSubmitted } = this.state;

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
            {
              dropdownOptions.profileOptions?.length < 0 || profileId == null ? (
                <div style={{ color: 'gray', textAlign: 'center', marginTop: '20px' }}>
                  <h3>
                    No profiles have been created for this user. Please create a profile
                    <a href="/add-financial-profile" style={{ marginLeft: '5px' }}>
                      here.
                    </a>
                  </h3>
                </div>
              ) : (
                <Form>
                  <Form.Field>
                    Select Year
                    <Dropdown
                      placeholder="Select Year"
                      selection
                      options={dropdownOptions.yearOptions}
                      value={selectedYear}
                      name="selectedYear"
                      onChange={(event, data) => this.handleDropdown(event, data)}
                    />
                  </Form.Field>
                  <Form.Field>
                    Select Profile
                    <Dropdown
                      placeholder="Select Profile"
                      selection
                      options={dropdownOptions.profileOptions}
                      value={profileId}
                      name="profileId"
                      onChange={(event, data) => this.handleDropdown(event, data)}
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
                        {record.length > 0 && hasSubmitted ? 'Update' : 'Submit'}
                      </Button>
                      {
                        record.length > 0 && hasSubmitted > 0 && (
                          <Button color="red" onClick={this.handleDelete}>
                            Delete
                          </Button>
                        )
                      }
                    </Grid.Column>
                  </Grid>
                </Form>
              )
            }
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default BalanceSheetInput;
