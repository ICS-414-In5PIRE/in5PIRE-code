// import React from 'react';
// import { Form, Segment, Container, Grid, Button, Menu, Dropdown } from 'semantic-ui-react';
// import { Tracker } from 'meteor/tracker';
// import { Meteor } from 'meteor/meteor';
// import PropTypes from 'prop-types';
// import swal from 'sweetalert';
// import OtherAssets from '../components/BalanceSheetComponents/OtherAssets';
// import CashAndCashEquivalents from '../components/BalanceSheetComponents/CashAndCashEquivalents';
// import Liabilities from '../components/BalanceSheetComponents/Liabilities';
// import CommitmentsAndContingencies from '../components/BalanceSheetComponents/CommitmentsAndContingencies';
// import { PAGE_IDS } from '../utilities/PageIDs';
// import Loader from '../components/Loader';
// import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputCollection';
// import { defineMethod, removeItMethod, updateMethod } from '../../api/base/BaseCollection.methods';
// import InputSheetMessage from '../components/InputSheetMessage';
// import { generateYears } from '../utilities/ComboBox';
//
// /**
//  * BalanceSheetInput class component for entering balance sheet data using Semantic UI React Form.
//  */
// class BalanceSheetInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       snackBar: {
//         isOpen: false,
//         message: '',
//         isError: false,
//       },
//       activeItem: 'Cash And Equivalents',
//       isLoading: true,
//       selectedYear: 2024,
//       record: [],
//     };
//     this.tracker = null;
//     // this.navigate = null;
//   }
//
//   // Fires when the component mounts
//   componentDidMount() {
//     const { profileId } = this.props;
//     this.tracker = Tracker.autorun(() => {
//       const { selectedYear } = this.state;
//       const subscription = BalanceSheetInputs.subscribeBalanceSheet();
//       const rdy = subscription.ready();
//       const username = Meteor.user()?.username;
//       const balanceSheetData = BalanceSheetInputs.find({ owner: username, profileId, year: selectedYear }).fetch();
//       this.setState({ isLoading: !rdy, record: balanceSheetData, isSubmit: balanceSheetData.length === 0 });
//     });
//
//     const options = {};
//     const yearOptions = generateYears();
//     options.yearOptions = yearOptions;
//     this.setState({ dropdownOptions: options });
//   }
//
//   componentDidUpdate(prevProps, prevState) {
//     const { selectedYear } = this.state;
//     const { profileId } = this.props;
//     if (prevState.selectedYear !== selectedYear || prevProps.profileId !== profileId) {
//       const username = Meteor.user()?.username;
//       const balanceSheetData = BalanceSheetInputs.find({
//         owner: username,
//         profileId,
//         year: selectedYear,
//       }).fetch();
//       // Check if a record exists for the selected year
//       const isExistingRecord = balanceSheetData.length > 0;
//       this.setState({ record: isExistingRecord ? balanceSheetData : [] });
//       this.handleSnackBar(false, '', false);
//     }
//   }
//
//   // Fires when the component unmounts
//   componentWillUnmount() {
//     if (this.tracker) {
//       this.tracker.stop();
//     }
//   }
//
//   handleViewOverview = () => {
//     const { profileId, navigate } = this.props;
//     navigate(`/profile-balance-sheet/${profileId}`);
//   };
//
//   handleBackToScenarios = () => {
//     const { navigate } = this.props;
//     navigate('/financial-profiles');
//   };
//
//   // Handle input changes
//   handleChange = (e, { name, value }) => {
//     const { record } = this.state;
//     const updatedFormData = JSON.parse(JSON.stringify(record));
//     if (updatedFormData.length === 0) {
//       updatedFormData.push({});
//     }
//     updatedFormData[0][name] = value;
//     this.setState({ record: updatedFormData }, () => {
//     });
//   };
//
//   // Handles menu item change
//   handleItemClick = (e, { name }) => {
//     this.setState({ activeItem: name });
//   };
//
//   handleSubmit = () => {
//     const { record, selectedYear } = this.state;
//     const { profileId } = this.props;
//     const collectionName = BalanceSheetInputs.getCollectionName();
//     const data = JSON.parse(JSON.stringify(record));
//
//     if (data.length === 0) {
//       data.push({});
//     }
//
//     const owner = Meteor.user()?.username;
//     const balanceSheetData = BalanceSheetInputs.find({
//       owner,
//       profileId,
//       year: selectedYear,
//     }).fetch();
//
//     if (balanceSheetData.length === 0) {
//       data[0].year = selectedYear;
//       data[0].owner = owner;
//       data[0].profileId = profileId;
//
//       defineMethod.callPromise({ collectionName: collectionName, definitionData: data[0] })
//         .then((response) => {
//           const isError = response.status <= 0;
//           const errorMessage = isError ? response.errorMessage : 'Record has been inserted successfully!';
//           this.handleSnackBar(true, errorMessage, isError);
//           this.setState({ isSubmit: false });
//         })
//         .catch((error) => {
//           if (error) {
//             this.handleSnackBar(true, 'Something went wrong!', true);
//           }
//         });
//     } else {
//       data[0].id = record[0]._id;
//       data[0].profileId = profileId;
//
//       updateMethod.callPromise({ collectionName, updateData: data[0] })
//         .then(() => {
//           this.handleSnackBar(true, 'Item updated successfully', false);
//         })
//         .catch((error) => {
//           if (error) {
//             this.handleSnackBar(true, 'Something went wrong!', true);
//           }
//         });
//     }
//   };
//
//   handleDelete = () => {
//     const { selectedYear } = this.state;
//     const { profileId } = this.props;
//     const collectionName = BalanceSheetInputs.getCollectionName();
//     const owner = Meteor.user()?.username;
//
//     const balanceSheetData = BalanceSheetInputs.find({
//       owner,
//       profileId,
//       year: selectedYear,
//     }).fetch();
//
//     if (balanceSheetData.length === 0) {
//       this.handleSnackBar(true, 'No record found to delete for the selected year.', true);
//       return;
//     }
//
//     const recordId = balanceSheetData[0]._id;
//
//     swal({
//       title: 'Are you sure?',
//       text: 'This action cannot be undone.',
//       icon: 'warning',
//       buttons: ['Cancel', 'Delete'],
//       dangerMode: true,
//     }).then((willDelete) => {
//       if (willDelete) {
//         // Proceed with deletion
//         removeItMethod.callPromise({ collectionName, instance: recordId })
//           .then(() => {
//             this.handleSnackBar(true, 'Record has been deleted successfully!', false);
//             this.setState({ record: [] });
//           })
//           .catch((error) => {
//             if (error) {
//               this.handleSnackBar(true, 'Something went wrong!', true);
//             }
//           });
//       } else {
//         // Optionally handle cancellation here
//         this.handleSnackBar(true, 'Deletion canceled.', false);
//       }
//     });
//   };
//
//   // Handle year change
//   handleYearChange = (e, { value }) => this.setState({ selectedYear: value });
//
//   // Handle snackbar
//   handleSnackBar = (isOpen, message, isError) => {
//     this.setState({ snackBar: { isOpen: isOpen, message: message, isError: isError } });
//   };
//
//   // Render the component
//   render() {
//     const { isLoading, selectedYear, record, snackBar, dropdownOptions, isSubmit } = this.state;
//
//     if (isLoading) {
//       return <Loader text="Loading balance sheet input..." />;
//     }
//
//     return (
//       <Container id={PAGE_IDS.BALANCE_SHEET_INPUT}>
//         <Grid.Column textAlign="left">
//           <Button labelPosition="left" icon="left chevron" content="Back to Scenarios" onClick={this.handleBackToScenarios} />
//         </Grid.Column>
//         <Grid centered>
//           <Grid.Column>
//             <br />
//             <h2>Balance Sheet Input</h2>
//             <hr />
//             <Form>
//               <Form.Field>
//                 Select Year
//                 <Dropdown
//                   placeholder="Select Year"
//                   selection
//                   options={dropdownOptions.yearOptions}
//                   value={selectedYear}
//                   onChange={this.handleYearChange}
//                 />
//               </Form.Field>
//
//               {/* Display all sections in one column */}
//               <Segment>
//                 <h3>Cash And Cash Equivalents</h3>
//                 <CashAndCashEquivalents formData={record[0]} handleChange={this.handleChange} />
//               </Segment>
//
//               <Segment>
//                 <h3>Other Assets</h3>
//                 <OtherAssets formData={record[0]} handleChange={this.handleChange} />
//               </Segment>
//
//               <Segment>
//                 <h3>Liabilities</h3>
//                 <Liabilities formData={record[0]} handleChange={this.handleChange} />
//               </Segment>
//
//               <Segment>
//                 <h3>Commitments And Contingencies</h3>
//                 <CommitmentsAndContingencies formData={record[0]} handleChange={this.handleChange} />
//               </Segment>
//
//               <InputSheetMessage snackBar={snackBar} handleSnackBar={this.handleSnackBar} />
//
//               <Grid className="py-3">
//                 <Grid.Column textAlign="right">
//                   <Button primary type="submit" onClick={this.handleSubmit}>
//                     {record.length > 0 && !isSubmit ? 'Update' : 'Submit'}
//                   </Button>
//                   {record.length > 0 && !isSubmit && (
//                     <Button color="red" onClick={this.handleDelete}>
//                       Delete
//                     </Button>
//                   )}
//                   <Button primary onClick={this.handleViewOverview}>
//                     View Overview
//                   </Button>
//                 </Grid.Column>
//               </Grid>
//             </Form>
//           </Grid.Column>
//         </Grid>
//       </Container>
//     );
//   }
// }
//
// BalanceSheetInput.propTypes = {
//   profileId: PropTypes.string.isRequired,
//   navigate: PropTypes.string.isRequired,
// };
//
// export default BalanceSheetInput;

import React from 'react';
import { Form, Segment, Container, Grid, Button } from 'semantic-ui-react';
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

class BalanceSheetInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBar: {
        isOpen: false,
        message: '',
        isError: false,
      },
      // activeItem: 'Cash And Equivalents',
      isLoading: true,
      records: {}, // Store data for all years
    };
    this.tracker = null;
  }

  componentDidMount() {
    const { profileId } = this.props;
    this.tracker = Tracker.autorun(() => {
      const subscription = BalanceSheetInputs.subscribeBalanceSheet();
      const rdy = subscription.ready();
      const username = Meteor.user()?.username;
      const records = {};
      for (let year = 2020; year <= 2024; year++) {
        records[year] = BalanceSheetInputs.find({ owner: username, profileId, year }).fetch()[0] || {};
      }
      this.setState({ isLoading: !rdy, records });
    });
  }

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

  handleChange = (year, name, value) => {
    const { records } = this.state;
    const updatedRecords = { ...records };
    if (!updatedRecords[year]) {
      updatedRecords[year] = {};
    }
    updatedRecords[year][name] = value;
    this.setState({ records: updatedRecords });
  };

  handleSubmit = () => {
    const { records } = this.state;
    const { profileId } = this.props;
    const collectionName = BalanceSheetInputs.getCollectionName();
    const owner = Meteor.user()?.username;

    Object.keys(records).forEach((year) => {
      const data = { ...records[year], year: parseInt(year, 10), owner, profileId };
      if (!data._id) {
        defineMethod.callPromise({ collectionName, definitionData: data })
          .then(() => this.handleSnackBar(true, `Record for ${year} added successfully!`, false))
          .catch(() => this.handleSnackBar(true, `Failed to add record for ${year}`, true));
      } else {
        updateMethod.callPromise({ collectionName, updateData: data })
          .then(() => this.handleSnackBar(true, `Record for ${year} updated successfully!`, false))
          .catch(() => this.handleSnackBar(true, `Failed to update record for ${year}`, true));
      }
    });
  };

  handleSnackBar = (isOpen, message, isError) => {
    this.setState({ snackBar: { isOpen, message, isError } });
  };

  render() {
    const { isLoading, records, snackBar } = this.state;

    if (isLoading) {
      return <Loader text="Loading balance sheet input..." />;
    }

    return (
      <Container id={PAGE_IDS.BALANCE_SHEET_INPUT}>
        <Grid>
          <Grid.Column textAlign="left">
            <Button labelPosition="left" icon="left chevron" content="Back to Scenarios" onClick={this.handleBackToScenarios} />
          </Grid.Column>
        </Grid>
        <h2>Balance Sheet Input</h2>
        <hr />
        <Form>
          <Segment>
            <h3>Cash And Cash Equivalents</h3>
            <Grid columns={5}>
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <Grid.Column key={year}>
                  <h4>{year}</h4>
                  <CashAndCashEquivalents
                    formData={records[year]}
                    handleChange={(e, { name, value }) => this.handleChange(year, name, value)}
                  />
                </Grid.Column>
              ))}
            </Grid>
          </Segment>

          <Segment>
            <h3>Other Assets</h3>
            <Grid columns={5}>
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <Grid.Column key={year}>
                  <h4>{year}</h4>
                  <OtherAssets
                    formData={records[year]}
                    handleChange={(e, { name, value }) => this.handleChange(year, name, value)}
                  />
                </Grid.Column>
              ))}
            </Grid>
          </Segment>

          <Segment>
            <h3>Liabilities</h3>
            <Grid columns={5}>
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <Grid.Column key={year}>
                  <h4>{year}</h4>
                  <Liabilities
                    formData={records[year]}
                    handleChange={(e, { name, value }) => this.handleChange(year, name, value)}
                  />
                </Grid.Column>
              ))}
            </Grid>
          </Segment>

          <Segment>
            <h3>Commitments And Contingencies</h3>
            <Grid columns={5}>
              {[2020, 2021, 2022, 2023, 2024].map((year) => (
                <Grid.Column key={year}>
                  <h4>{year}</h4>
                  <CommitmentsAndContingencies
                    formData={records[year]}
                    handleChange={(e, { name, value }) => this.handleChange(year, name, value)}
                  />
                </Grid.Column>
              ))}
            </Grid>
          </Segment>

          <InputSheetMessage snackBar={snackBar} handleSnackBar={this.handleSnackBar} />

          <Grid>
            <Grid.Column textAlign="right">
              <Button primary type="submit" onClick={this.handleSubmit}>
                Submit All
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      </Container>
    );
  }
}

BalanceSheetInput.propTypes = {
  profileId: PropTypes.string.isRequired,
};

export default BalanceSheetInput;
