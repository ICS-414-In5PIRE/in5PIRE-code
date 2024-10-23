import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const DataContext = createContext();

// Create a provider component
export const DataProvider = ({ children }) => {
  const [uploadedData, setUploadedData] = useState(null);

  const value = useMemo(() => ({ uploadedData, setUploadedData }), [uploadedData]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
