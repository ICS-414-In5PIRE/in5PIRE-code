import React, { useEffect, useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Card, Image, Button, Header, Grid, Icon, Dropdown } from 'semantic-ui-react';
import { FinancialProfiles } from '../../../api/FinancialProfiles/FinancialProfilesCollection';
import MemberListDropdown from './ListMembers';
import { parseCSV } from '../CsvComponents/parseCsv';

const FinancialProfileCard = ({
  title,
  imgSrc,
  profileType,
  description,
  createdDate,
  editedDate,
  userRole,
  profileId,
}) => {
  const navigate = useNavigate();
  const [selectedForm, setSelectedForm] = useState('');
  const uploadOptions = [
    { key: 'balanceSheet', text: 'Balance Sheet', value: 'balanceSheet' },
    { key: 'budgetForm', text: 'Budget Form', value: 'budgetForm' },
    { key: 'financialStatement', text: 'Financial Statements', value: 'financialStatement' },
  ];

  const { members } = useTracker(() => {
    const profile = FinancialProfiles.findOne(profileId);
    return { members: profile ? profile.members : [] };
  });

  const onFileUpload = async (event, currentProfileId, currentForm) => {
    const file = event.target.files[0];

    if (!file) {
      swal('Error', 'No file selected.', 'error');
      return;
    }

    try {
      // Parse the uploaded file
      const parsedData = await parseCSV(file, currentForm);

      // Insert parsed data into the database, linked to the profileId
      Meteor.call(
        'FinancialProfiles.updateFormData',
        { profileId: currentProfileId, formType: currentForm, data: parsedData },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', `Successfully uploaded ${currentForm} data.`, 'success');
          }
        },
      );
    } catch (error) {
      swal('Error', `Failed to parse file: ${error}`, 'error');
    }
  };

  const handleEditProfile = () => {
    navigate(`/edit-financial-profile/${profileId}`);
  };

  const handleEditBalanceSheet = () => {
    navigate(`/balance-sheet/${profileId}`);
  };

  const handleEditBudgetForm = () => {
    navigate(`/budget-form/${profileId}`);
  };

  const handleEditFinancialStatement = () => {
    navigate(`/audited-fs/${profileId}`);
  };

  const handleViewProfileDashboard = () => {
    navigate(`/profiledashboard/${profileId}`);
  };

  useEffect(() => {
    // Subscribe to userEmails to get access to users' emails
    const userEmailSubscription = Meteor.subscribe('userEmails');
    return () => {
      userEmailSubscription.stop(); // Clean up on unmount
    };
  }, []);

  return (
    <Card fluid>
      <Image src={imgSrc || '/images/GraphPlaceholder.png'} />
      <Card.Content>
        <Header as="h1" textAlign="center" style={{ marginBottom: '20px' }}>
          {title}
        </Header>
        <Grid textAlign="center">
          <Grid.Row>
            <p><strong>Profile Type: </strong>{profileType}</p>
          </Grid.Row>
          <Grid.Row>
            <p>{description}</p>
          </Grid.Row>
          <Grid.Row>
            <p style={{ fontSize: '0.8em', color: 'gray' }}>Created: {createdDate}</p>
            <p style={{ fontSize: '0.8em', color: 'gray' }}>Last Edited: {editedDate}</p>
          </Grid.Row>
        </Grid>
      </Card.Content>
      <Card.Content extra>
        <Grid columns={1}>
          {userRole === 'admin' && (
            <Grid.Column>
              <Button className="mb-2" fluid color="grey" onClick={handleEditProfile}>
                <Icon name="edit" /> Edit Scenario
              </Button>

              <Button className="mb-2" fluid color="blue" onClick={handleEditBalanceSheet}>
                <Icon name="edit" /> Edit Balance Sheet
              </Button>

              <Button className="mb-2" fluid color="blue" onClick={handleEditBudgetForm}>
                <Icon name="edit" /> Edit Budget Form
              </Button>

              <Button className="mb-2" fluid color="blue" onClick={handleEditFinancialStatement}>
                <Icon name="edit" /> Edit Audited Financial Statement
              </Button>

              <>
                <Dropdown
                  placeholder="Select Form to Upload"
                  fluid
                  selection
                  options={uploadOptions}
                  onChange={(e, { value }) => setSelectedForm(value)}
                  value={selectedForm}
                />
                <Button
                  color="blue"
                  fluid
                  disabled={!selectedForm}
                  onClick={() => document.getElementById(`file-upload-${profileId}`).click()}
                >
                  Upload {selectedForm && uploadOptions.find((opt) => opt.value === selectedForm)?.text}
                </Button>
                <input
                  type="file"
                  id={`file-upload-${profileId}`}
                  hidden
                  accept=".csv"
                  onChange={(e) => onFileUpload(e, profileId, selectedForm)}
                />

              </>
            </Grid.Column>

          )}
          <Grid.Column>
            <Button fluid color="teal" onClick={handleViewProfileDashboard}>
              <Icon name="dashboard" /> View Profile Dashboard
            </Button>
          </Grid.Column>
        </Grid>
      </Card.Content>
      <Card.Content extra>
        {/* Members Dropdown */}
        <MemberListDropdown members={members} />
      </Card.Content>
      {userRole !== 'admin' && (
        <Card.Content extra>
          <Button
            color="red"
            fluid
            onClick={() => {
              swal({
                title: 'Are you sure?',
                text: 'You will be removed from this profile!',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  Meteor.call('FinancialProfiles.removeMember', profileId, Meteor.userId(), (error) => {
                    if (error) {
                      swal('Error', error.message, 'error');
                    } else {
                      swal('Success', 'You have been removed from the profile', 'success');
                      navigate('/financial-profiles');
                    }
                  });
                }
              });
            }}
          >
            Leave Profile
          </Button>
        </Card.Content>
      )}
    </Card>
  );
};

// PropTypes for validation
FinancialProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  profileType: PropTypes.string,
  description: PropTypes.string,
  createdDate: PropTypes.string,
  editedDate: PropTypes.string,
  userRole: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
};

// Default props for optional fields
FinancialProfileCard.defaultProps = {
  profileType: 'Unknown',
  description: 'No description available.',
  createdDate: 'Not available',
  editedDate: 'Not available',
};

export default FinancialProfileCard;
