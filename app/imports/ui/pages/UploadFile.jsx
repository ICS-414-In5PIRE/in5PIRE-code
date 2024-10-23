import React, { useState, useContext } from 'react';
import * as XLSX from 'xlsx';
import { Table, Header, Container, Button, Icon, Grid } from 'semantic-ui-react';
import { PAGE_IDS } from '../utilities/PageIDs';
import { DataContext } from '../utilities/DataContext';

/**
 * UploadFile: Allows the user to upload a spreadsheet or .csv file
 * and import the data into a table.
 */

const UploadFile = () => {
  const [tableData, setTableData] = useState([]);
  const [cashEquivalents, setCashEquivalents] = useState(null); // Initialize as null
  const { setUploadedData } = useContext(DataContext); // Access setUploadedData from context

  // Function to handle file upload and conversion
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      const reader = new FileReader();

      // If the file is an .xlsx or .xls file
      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Reads the fifth sheet in the workbook (for now)
          const firstSheetName = workbook.SheetNames[4]; // adjust if needed
          const worksheet = workbook.Sheets[firstSheetName];

          // Convert the sheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setTableData(jsonData);

          // Assume years start from column 9 (2020 in this case), and continue across subsequent columns
          const years = [2020, 2021, 2022, 2023, 2024]; // Adjust as necessary based on your table
          const startingYearColumnIndex = 9; // Adjust if needed

          const cashAndEquivalents = {
            pettyCash: {},
            cash: {},
            cashInBanks: {},
          };

          // Extract values for each year
          years.forEach((year, index) => {
            cashAndEquivalents.pettyCash[year] = jsonData[11]?.[startingYearColumnIndex + index]; // Petty Cash values
            cashAndEquivalents.cash[year] = jsonData[12]?.[startingYearColumnIndex + index]; // Cash values
            cashAndEquivalents.cashInBanks[year] = jsonData[13]?.[startingYearColumnIndex + index]; // Cash in Banks values
          });

          setCashEquivalents(cashAndEquivalents);
          setUploadedData(cashAndEquivalents); // Update the context with the extracted data
        };
        reader.readAsArrayBuffer(file);
      }
      // If the file is a .csv file
      else if (fileName.endsWith('.csv')) {
        reader.onload = (event) => {
          const csvData = event.target.result;
          const workbook = XLSX.read(csvData, { type: 'string' });

          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convert the CSV sheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setTableData(jsonData);

          const years = [2020, 2021, 2022, 2023, 2024]; // Adjust as necessary
          const startingYearColumnIndex = 9; // Adjust if needed

          const cashAndEquivalents = {
            pettyCash: {},
            cash: {},
            cashInBanks: {},
          };

          // Extract values for each year
          years.forEach((year, index) => {
            cashAndEquivalents.pettyCash[year] = jsonData[11]?.[startingYearColumnIndex + index]; // Petty Cash values
            cashAndEquivalents.cash[year] = jsonData[12]?.[startingYearColumnIndex + index]; // Cash values
            cashAndEquivalents.cashInBanks[year] = jsonData[13]?.[startingYearColumnIndex + index]; // Cash in Banks values
          });

          setCashEquivalents(cashAndEquivalents);
          setUploadedData(cashAndEquivalents); // Update the context with the extracted data
        };
        reader.readAsText(file); // For CSV, use `readAsText`
      } else {
        alert('Unsupported file type! Please upload a supported file type.');
      }
    }
  };

  // Render table from the tableData array using Semantic UI
  const renderTable = () => (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          {tableData[0]?.map((colHeader, index) => (
            <Table.HeaderCell key={index}>{colHeader}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.slice(1).map((row, rowIndex) => (
          <Table.Row key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <Table.Cell key={cellIndex}>{cell}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  return (
    <Container id={PAGE_IDS.UPLOAD_FILE} style={{ marginTop: '20px' }}>
      <Header as="h2" icon textAlign="center">
        <Icon name="file excel outline" />
        <Header.Content>Upload Files</Header.Content>
      </Header>

      <h3>Import your data from your excel spreadsheets or CSV files by uploading them here. The data will show on a table below.</h3>
      <p>Current accepted formats: .xls, .xlsx, .xlsm, .csv</p>

      <Grid>
        <Grid.Column textAlign="center">
          <Button as="label" htmlFor="fileInput" primary icon="upload" content="Upload File" />
          <input
            id="fileInput"
            type="file"
            accept=".xlsx, .xls, .xlsm, .csv"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </Grid.Column>
      </Grid>

      {tableData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Header as="h3">Data from the File:</Header>
          {renderTable()}
        </div>
      )}

      {/* Display extracted Cash and Cash Equivalents */}
      {cashEquivalents && cashEquivalents.pettyCash && cashEquivalents.cash && cashEquivalents.cashInBanks && (
        <div style={{ marginTop: '20px' }}>
          <h4>Cash and Cash Equivalents Extracted Data by Year:</h4>
          <div>
            {Object.keys(cashEquivalents.pettyCash).map((year) => (
              <div key={year}>
                <p>Year {year}:</p>
                <p>Petty Cash: {cashEquivalents.pettyCash[year]}</p>
                <p>Cash: {cashEquivalents.cash[year]}</p>
                <p>Cash in Banks: {cashEquivalents.cashInBanks[year]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
};

export default UploadFile;
