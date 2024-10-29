import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as XLSX from 'xlsx';
import { Table, Header, Container, Button, Icon, Grid, Dropdown, GridRow, GridColumn, Divider, Segment } from 'semantic-ui-react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { parseCSV } from '../components/CsvComponents/parseCsv';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * UploadFile: Allows the user to upload a spreadsheet or .csv file
 * and import the data into a table with validation for CSV files.
 */

const UploadFile = ({ schemaType }) => {
  const [tableData, setTableData] = useState([]);
  const [availableSheetNames, setAvailableSheetNames] = useState([]);
  const [activeSheet, setActiveSheet] = useState(null);
  const [storedWorkbook, setStoredWorkbook] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to handle file upload and conversion
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setError(null);
      setSuccess(null);
      const fileName = file.name.toLowerCase();
      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target.result;
        const data = new Uint8Array(arrayBuffer);

        // Handle Excel files (.xlsx, .xls, .xlsm)
        if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.xlsm')) {
          const wb = XLSX.read(data, { type: 'array' });
          const sheetNames = wb.SheetNames;
          setAvailableSheetNames(sheetNames);
          setStoredWorkbook(wb);
          setActiveSheet(sheetNames[0]);
          const firstSheet = wb.Sheets[sheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          setTableData(jsonData);
          setSuccess('File uploaded successfully!');

          // Handle CSV files with validation
        } else if (fileName.endsWith('.csv')) {
          try {
            const parsedData = await parseCSV(file, schemaType);
            setTableData(parsedData);
            setAvailableSheetNames([]);
            setActiveSheet(null);
            setStoredWorkbook(null);
            setSuccess('CSV file validated and uploaded successfully!');
          } catch (errorMsg) {
            setError(errorMsg);
          }
        } else {
          setError('Unsupported file type! Please upload a supported file type (.xls, .xlsx, .xlsm, .csv).');
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Function to handle sheet selection
  const handleSheetChange = (e, { value }) => {
    setActiveSheet(value);
    if (storedWorkbook) {
      const selectedSheet = storedWorkbook.Sheets[value];
      const jsonData = XLSX.utils.sheet_to_json(selectedSheet, { header: 1 });
      setTableData(jsonData);
    } else {
      setError('Workbook not found. Please upload the file again.');
    }
  };

  // Render table from the tableData array using Semantic UI
  const renderTable = () => (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          {Array.isArray(tableData[0]) && tableData[0].map((colHeader, index) => (
            <Table.HeaderCell key={index}>{colHeader}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.slice(1).map((row, rowIndex) => (
          <Table.Row key={rowIndex}>
            {Array.isArray(row) ? (
              row.map((cell, cellIndex) => (
                <Table.Cell key={cellIndex}>{cell}</Table.Cell>
              ))
            ) : (
              // If row is not an array, display an error message or skip
              <Table.Cell colSpan={tableData[0]?.length || 1}>Error: Row data is invalid</Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );

  return (
    <Container id={PAGE_IDS.UPLOAD_FILE} style={{ marginTop: '20px' }}>
      <Segment>
        <Grid columns={2} relaxed="very" stackable>
          <Grid.Column textAlign="center">
            <Header as="h2" icon textAlign="center">
              <Icon name="file excel outline" />
              <Header.Content>Upload Files</Header.Content>
            </Header>
            <p>Upload your files and import your data. </p>
            <p>Current accepted formats: .xls, .xlsx, .xlsm, .csv</p>
            <Button as="label" htmlFor="fileInput" primary icon="upload" content="Upload File" />
            <input
              id="fileInput"
              type="file"
              accept=".xlsx, .xls, .xlsm, .csv"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </Grid.Column>
          <GridColumn textAlign="center">
            <Header as="h2" icon textAlign="center">
              <Icon name="file alternate outline" />
              <Header.Content>Download Template</Header.Content>
            </Header>
            <p>Download our template and enter your data in an easily readable and accessible format.</p>
            <a href="https://raw.githubusercontent.com/bobbyir/bobbyir.github.io/main/financemodeltest.xlsx" target="_blank" rel="noopener noreferrer">
              <Button primary icon labelPosition="left">
                <Icon name="download" />
                Download Template
              </Button>
            </a>
          </GridColumn>
        </Grid>
        <Divider vertical>OR</Divider>
      </Segment>

      {/* Link to CSV Instructions */}
      <p style={{ marginTop: '20px' }}>
        <Link to="/csv-instructions">View CSV Formatting Instructions</Link>
      </p>

      {/* Sheet selection dropdown if multiple sheets are available */}
      {availableSheetNames.length > 0 && (
        <Dropdown
          placeholder="Select Sheet"
          fluid
          selection
          options={availableSheetNames.map((sheetName) => ({
            key: sheetName,
            text: sheetName,
            value: sheetName,
          }))}
          onChange={handleSheetChange}
          value={activeSheet}
          style={{ marginTop: '20px' }}
        />
      )}

      {/* Display success or error messages */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Render data table if data is available */}
      {tableData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Header as="h3">Data from the {activeSheet || 'CSV'} Sheet:</Header>
          {renderTable()}
        </div>
      )}

      {/* Additional information and images */}
      <Image src="/images/Upload3.png" fluid rounded className="mt-3" />
      <Grid>
        <Divider />
        <GridRow columns={2}>
          <GridColumn>
            <Image src="/images/Upload1.png" fluid rounded />
          </GridColumn>
          <GridColumn>
            <h2>Upload the File</h2>
            <h4>Upload and import your data from your excel spreadsheets or CSV files by uploading them here. The data will show on a table below.</h4>
          </GridColumn>
        </GridRow>
        <Divider />
        <GridRow columns={2}>
          <GridColumn>
            <Image src="/images/Upload5.png" fluid rounded />
          </GridColumn>
          <GridColumn>
            <h2>Uploaded File Will be Added to Forms</h2>
          </GridColumn>
        </GridRow>
        <Divider />
        <GridRow columns={2}>
          <GridColumn>
            <Image src="/images/Upload4.png" fluid rounded />
          </GridColumn>
          <GridColumn>
            <h2>Values Will be Shown and Can Be Manually Changed Before Submitting</h2>
          </GridColumn>
        </GridRow>
        <Divider />
      </Grid>
    </Container>
  );
};

// Define propTypes to validate 'schemaType'
UploadFile.propTypes = {
  schemaType: PropTypes.string,
};

// Set default prop for schemaType
UploadFile.defaultProps = {
  schemaType: 'balanceSheet',
};

export default UploadFile;
