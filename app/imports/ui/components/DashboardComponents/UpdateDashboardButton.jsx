import React from 'react';
import { Meteor } from 'meteor/meteor';

const UpdateDashboardButton = ({ profileId, year }) => {
  const handleClick = () => {
    Meteor.call('dashboard.updateData', { profileId, year }, (error, result) => {
      if (error) {
        console.error('Error updating dashboard:', error);
        alert('Failed to update dashboard data. Check console for details.');
      } else {
        alert('Dashboard data updated successfully!');
      }
    });
  };

  return (
    <button onClick={handleClick}>
      Update Dashboard Data
    </button>
  );
};

export default UpdateDashboardButton;
