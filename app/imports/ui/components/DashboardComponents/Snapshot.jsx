import React from 'react';
import { Table, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/**
 * Snapshot component to display static financial data.
 */
const Snapshot = ({ data }) => (
  <div>
    <Header as="h3">Snapshot</Header>
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Asset/Item</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {data.map((item, index) => (
          <Table.Row key={index}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.value}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
);

// Define PropTypes for type checking
Snapshot.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired, // Name of the asset/item
      value: PropTypes.string.isRequired, // Value of the asset/item
    }),
  ).isRequired,
};

export default Snapshot;
