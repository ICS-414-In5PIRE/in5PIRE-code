import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Button, ListGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';

const MemberListDropdown = ({ members }) => {
  const [dropdownEnabled, setDropdownEnabled] = useState(false);

  const toggleDropdown = () => {
    setDropdownEnabled(!dropdownEnabled);
  };

  return (
    <>
      {/* Toggle Button */}
      <Button variant="primary" onClick={toggleDropdown}>
        {dropdownEnabled ? 'Hide Member List' : 'Show Member List'}
      </Button>

      {/* Display member list when dropdownEnabled is true */}
      {dropdownEnabled && (
        <ListGroup className="mt-3">
          {members.map((member) => {
            const user = Meteor.users.findOne({ _id: member.userId });
            const userEmail = user && user.emails && user.emails[0] ? user.emails[0].address : 'Unknown Email';

            return (
              <ListGroup.Item key={member.userId}>
                {userEmail} - {member.role}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </>
  );
};

// Define PropTypes
MemberListDropdown.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MemberListDropdown;
