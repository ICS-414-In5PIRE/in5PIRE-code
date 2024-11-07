import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ProfileSnapshot = ({ data }) => {
  // make sure there's multiple entries for each year
  const years = [...new Set(data.map(item => item.year))].sort();

  // Map the data for each year
  const assets = {};
  data.forEach(item => {
    if (!assets[item.name]) assets[item.name] = {};
    assets[item.name][item.year] = item.value;
  });

  return (
    <div>
      <Header as="h3">Snapshot</Header>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Asset/Item</Table.HeaderCell>
            {years.map(year => (
              <Table.HeaderCell key={year}>{year}</Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {Object.keys(assets).map((assetName, index) => (
            <Table.Row key={index}>
              <Table.Cell>{assetName}</Table.Cell>
              {years.map(year => (
                <Table.Cell key={`${assetName}-${year}`}>
                  {assets[assetName][year] !== undefined ? assets[assetName][year] : 'N/A'}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

// Define PropTypes for type checking
ProfileSnapshot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // Name of the asset/item
      year: PropTypes.number.isRequired, // Year
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Value of the asset/item
    }),
  ).isRequired,
};

export default ProfileSnapshot;
