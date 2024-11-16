import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ProfileSnapshot = ({ data }) => {
  const currentYear = new Date().getFullYear();

  // Extract unique years and sort them
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
      {/* Horizontal scrolling for large charts */}
      <div style={{ overflowX: 'auto' }}>
        <Table celled striped selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Asset/Item</Table.HeaderCell>
              {years.map(year => (
                <Table.HeaderCell
                  key={year}
                  style={{
                    backgroundColor: year > currentYear ? 'rgba(144, 238, 144, 0.3)' : 'transparent',
                  }}
                >
                  {year}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Object.keys(assets).map((assetName, index) => (
              <Table.Row
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? 'rgba(240, 240, 240, 0.5)' : 'transparent',
                  transition: 'background-color 0.2s ease-in-out',
                }}
                className="table-row"
              >
                <Table.Cell>{assetName}</Table.Cell>
                {years.map(year => (
                  <Table.Cell
                    key={`${assetName}-${year}`}
                    style={{
                      backgroundColor: year > currentYear ? 'rgba(144, 238, 144, 0.2)' : 'transparent',
                      padding: '12px 8px',
                    }}
                  >
                    {assets[assetName][year] !== undefined ? assets[assetName][year] : 'N/A'}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <style>{`
        .table-row:hover {
          background-color: rgba(200, 200, 200, 0.2); /* Hover effect */
        }
      `}
      </style>
    </div>
  );
};

ProfileSnapshot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      year: PropTypes.number.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Value of the asset/item
    }),
  ).isRequired,
};

export default ProfileSnapshot;
