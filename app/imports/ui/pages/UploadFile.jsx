import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Table, Header, Container, Button, Icon, Grid, Dropdown, GridRow, GridColumn, Divider, Segment } from 'semantic-ui-react';
import { Image } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * UploadFile: Allows the user to upload a spreadsheet or .csv file
 * and import the data into a table.
 *
 */

const UploadFile = () => {
  const [tableData, setTableData] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState(null);
  const [workbook, setWorkbook] = useState(null);

  // Function to handle file upload and conversion
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      const reader = new FileReader();

      reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const data = new Uint8Array(arrayBuffer); // Create a Uint8Array from the buffer

        // If the file is an Excel file (.xlsx, .xls, .xlsm)
        if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls') || fileName.endsWith('.xlsm')) {
          let workbook = XLSX.read(data, { type: 'array' }); // Read as ArrayBuffer

          // Get sheet names
          let sheetNames = workbook.SheetNames;
          setSheetNames(sheetNames);
          setWorkbook(workbook); // Store workbook in state for future access

          // Automatically select the first sheet
          setSelectedSheet(sheetNames[0]);

          // Load the first sheet by default
          const firstSheet = workbook.Sheets[sheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
          setTableData(jsonData);
        } else if (fileName.endsWith('.csv')) { // If the file is a CSV file
          const workbook = XLSX.read(data, { type: 'array' }); // Read as ArrayBuffer for CSV as well

          // CSV will only have one "sheet"
          const csvSheet = workbook.Sheets[workbook.SheetNames[0]];
          const jsonData = XLSX.utils.sheet_to_json(csvSheet, { header: 1 });
          setTableData(jsonData);
          setSheetNames([]); // CSV has no multiple sheets
          setSelectedSheet(null);
          setWorkbook(null);
        } else {
          alert('Unsupported file type! Please upload a supported file type.');
        }
      };
      reader.readAsArrayBuffer(file); // Use readAsArrayBuffer for both Excel and CSV
    }
  };

  // Function to handle sheet selection
  const handleSheetChange = (e, { value }) => {
    setSelectedSheet(value);

    // Access the workbook stored in the state
    if (workbook) {
      let selectedSheet = workbook.Sheets[value];
      const jsonData = XLSX.utils.sheet_to_json(selectedSheet, { header: 1 });
      setTableData(jsonData);
    } else {
      alert('Workbook not found. Please upload the file again.');
    }
  };

  // Render table from the tableData array using Semantic UI
  // TODO?: Make table render prettier.
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
      <br />
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

      {/* Sheet selection dropdown if multiple sheets are available */}
      {sheetNames.length > 0 && (
        <Dropdown
          placeholder="Select Sheet"
          fluid
          selection
          options={sheetNames.map((sheetName) => ({
            key: sheetName,
            text: sheetName,
            value: sheetName,
          }))}
          onChange={handleSheetChange}
          value={selectedSheet}
          style={{ marginTop: '20px' }}
        />
      )}

      {/* TODO: Allow horizontal scroll */}
      {tableData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <Header as="h3">Data from the {selectedSheet ? selectedSheet : 'Excel/CSV'} Sheet:</Header>
          {renderTable()}
        </div>
      )}

      {/* Bottom footer section (needs cleanup) */}
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

export default UploadFile;
