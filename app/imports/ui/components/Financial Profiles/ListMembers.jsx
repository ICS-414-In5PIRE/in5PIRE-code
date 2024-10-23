import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { ListGroup, Button, Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const MemberListDropdown = ({ members }) => {
  const [dropdownEnabled, setDropdownEnabled] = useState(false);

  const toggleDropdown = () => {
    setDropdownEnabled(!dropdownEnabled);
  };

  return (
    <>
      <Row className="px-4">
        <Button
          onClick={toggleDropdown}
          style={{
            cursor: 'pointer',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            border: '1px solid #ced4da',
            borderRadius: '5px',
            fontSize: '1rem',
            color: '#007bff',
            display: 'inline-block',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#e2e6ea'; }} // Hover effect
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8f9fa'; }}
        >
          {dropdownEnabled ? 'Hide Member List' : 'Show Member List'}{' '}
          {dropdownEnabled ? <FaChevronUp /> : <FaChevronDown />}
        </Button>
      </Row>

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
