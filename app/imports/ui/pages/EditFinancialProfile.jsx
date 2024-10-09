import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';
import { BalanceSheetInputs } from '../../api/BalanceSheetInput/BalanceSheetInputsCollection';

const EditFinancialProfile = () => {
  const { profileId } = useParams();
  const navigate = useNavigate();

  const { profile, balanceSheets, isLoading } = useTracker(() => {
    const profileSub = Meteor.subscribe('FinancialProfiles');
    const balanceSheetsSub = BalanceSheetInputs.subscribeBalanceSheet();

    const loading = !profileSub.ready() || !balanceSheetsSub.ready();
    const profileData = FinancialProfiles.findOne(profileId);
    const balanceSheetData = BalanceSheetInputs.find({ profileId }).fetch();

    return { profile: profileData, balanceSheets: balanceSheetData, isLoading: loading };
  }, [profileId]);

  if (isLoading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container>
        <p>Financial profile not found.</p>
      </Container>
    );
  }

  const handleAddBalanceSheet = () => {
    navigate(`/add-balance-sheet/${profileId}`);
  };

  const handleDeleteBalanceSheet = (balanceSheetId) => {
    Meteor.call('BalanceSheetInputs.remove', balanceSheetId, (error) => {
      if (error) {
        swal('Error', 'Error deleting balance sheet.', 'error');
      }
    });
  };

  return (
    <Container>
      <h2>Edit Financial Profile: {profile.title}</h2>

      {/* Balance Sheets Section */}
      <h3>Balance Sheets</h3>
      {balanceSheets.length > 0 ? (
        <ListGroup>
          {balanceSheets.map((sheet) => (
            <ListGroup.Item key={sheet._id} className="d-flex justify-content-between align-items-center">
              Balance Sheet for Year {sheet.year}
              <Button variant="danger" onClick={() => handleDeleteBalanceSheet(sheet._id)}>Delete</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p>No balance sheets linked to this profile.</p>
      )}
      <Button className="mt-2" onClick={handleAddBalanceSheet}>Add New Balance Sheet</Button>

      {/* Placeholder sections for Budgets and Audited Statements */}
      <h3 className="mt-4">Budgets</h3>
      <p>Coming soon...</p>

      <h3 className="mt-4">Audited Statements</h3>
      <p>Coming soon...</p>
    </Container>
  );
};

export default EditFinancialProfile;
