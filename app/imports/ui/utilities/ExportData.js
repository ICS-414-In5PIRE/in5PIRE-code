import * as XLSX from 'xlsx';

/**
 * Exports table data to an Excel file.
 *
 * @param {Array} fields - Array of field names (row headers).
 * @param {Array} years - Array of years (column headers).
 * @param {Array} data - Array of data objects with year and field values.
 * @param {string} fileName - Name of the exported Excel file.
 */

export const exportToExcel = (fields, years, data, fileName = 'TableData') => {
  try {
    // Create header row
    const header = ['Field', ...years];

    // Create table rows
    const rows = fields.map(field => [
      field,
      ...years.map(year => {
        const entry = data.find(entry => entry.year === year);
        return entry && entry[field] !== undefined ? entry[field] : 'N/A';
      }),
    ]);

    // Combine header and rows into worksheet data
    const worksheetData = [header, ...rows];

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Write workbook to file
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
  }
};
