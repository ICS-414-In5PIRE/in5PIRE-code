import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Meteor } from 'meteor/meteor';

const UpdateDashboardButton = ({ profileId, year }) => {
  const handleClick = () => {
    Meteor.call('staticFinancials.updateFromBudgetForm', { profileId, year }, (error) => {
      if (error) {
        console.error('Error updating static financials:', error);
        alert('Failed to update dashboard data. Check console for details.');
      } else {
        alert('Dashboard data updated successfully!');
      }
    });
  };

  return (
    <button type="button" onClick={handleClick}>
      Update Dashboard Data
    </button>
  );
};

// Define PropTypes for the component
UpdateDashboardButton.propTypes = {
  profileId: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
};

export default UpdateDashboardButton;
