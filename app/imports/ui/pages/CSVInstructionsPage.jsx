import React from 'react';
import { csvSchemaGuide } from '../components/CsvComponents/csvShemaGuide';

const CSVInstructionsPage = () => (
  <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
    <h1>CSV Formatting Instructions</h1>
    <p>Follow these instructions to format your CSV files correctly before uploading:</p>
    <h2>General Instructions</h2>
    <p>{csvSchemaGuide.generalInstructions}</p>

    {Object.keys(csvSchemaGuide.schemas).map(schemaKey => {
      const schema = csvSchemaGuide.schemas[schemaKey];
      return (
        <div key={schemaKey}>
          <h2>{schema.title}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Field Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Type</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Requirement</th>
              </tr>
            </thead>
            <tbody>
              {schema.fields.map(field => (
                <tr key={field.name}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{field.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{field.description}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{field.type}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{field.required ? 'Required' : 'Optional'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    })}

    <h2>Example Format</h2>
    <pre style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
      {csvSchemaGuide.examples}
    </pre>
  </div>
);

export default CSVInstructionsPage;
