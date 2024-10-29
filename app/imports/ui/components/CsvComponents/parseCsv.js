import Papa from 'papaparse';
import { csvSchemaGuide } from './csvShemaGuide';

export const parseCSV = (file, schemaType = 'balanceSheet') => new Promise((resolve, reject) => {
  if (!csvSchemaGuide.schemas[schemaType]) {
    reject(`Schema type "${schemaType}" not found in csvSchemaGuide.`);
    return;
  }

  const fields = csvSchemaGuide.schemas[schemaType].fields;
  const validHeaders = fields.map(f => f.name);

  Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: results => {
      const fileHeaders = Object.keys(results.data[0]);

      // Validate headers
      if (!fileHeaders.every(header => validHeaders.includes(header))) {
        reject('CSV file headers do not match the required schema.');
        return;
      }

      try {
        // Convert each row into an array following the schema order
        const validatedData = results.data.map(row => validHeaders.map(header => (row[header] === undefined ? 0 : row[header])));

        // Insert headers as the first row in validatedData for rendering
        validatedData.unshift(validHeaders);

        resolve(validatedData);
      } catch (error) {
        reject(error.message);
      }
    },
    error: error => reject(`Error parsing CSV: ${error.message}`),
  });
});
