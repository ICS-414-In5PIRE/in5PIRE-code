import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Table, Header, Container, Button, Icon, Grid } from 'semantic-ui-react';
import { Image } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/**
 * UploadFile: Allows the user to upload a spreadsheet or .csv file
 * and import the data into a table.
 */

const UploadFile = () => {
  const [tableData, setTableData] = useState([]);

  // Function to handle file upload and conversion
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      const reader = new FileReader();

      // If the file is an .xlsx file
      if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
        reader.onload = (event) => {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Reads the fifth sheet in the workbook (for now)
          const firstSheetName = workbook.SheetNames[4];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convert the sheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setTableData(jsonData);
        };
        reader.readAsArrayBuffer(file);
      } else if (fileName.endsWith('.csv')) {
        reader.onload = (event) => {
          const csvData = event.target.result;
          const workbook = XLSX.read(csvData, { type: 'string' });

          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convert the CSV sheet to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          setTableData(jsonData);
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

      {/* Image added below the table */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h2>Download Template and Edit Values</h2>
        <Image src="/images/Upload3.png" fluid rounded />
        <h2>Upload The File</h2>
        <Image src="/images/Upload1.png" fluid rounded />
        <h2>Uploaded File Will be Added to Forms</h2>
        <Image src="/images/Upload2.png" fluid rounded />
        <h2>Values Will be Shown and Can Be Manually Changed Before Submitting</h2>
        <Image src="/images/Upload4.png" fluid rounded />

      </div>
    </Container>
  );
};

export default UploadFile;
