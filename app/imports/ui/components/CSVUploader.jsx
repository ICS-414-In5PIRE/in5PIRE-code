import React, { useState } from 'react';
import Papa from 'papaparse';

const CSVUploader = () => {
  const [csvData, setCsvData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      // eslint-disable-next-line no-use-before-define
      parseCSV(file); // Call the parsing function with the file
    }
  };

  const parseCSV = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        setCsvData(results.data); // Save the parsed data in the state
        console.log('Parsed CSV Data:', results.data); // Log the data to see the result
      },
      header: true, // Optional: Parse CSV with headers if needed
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {csvData && (
        <div>
          <h3>CSV Data:</h3>
          <pre>{JSON.stringify(csvData, null, 2)}</pre> {/* Display parsed data */}
        </div>
      )}
    </div>
  );
};

export default CSVUploader;
