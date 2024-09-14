import Papa from 'papaparse';

export const parseCSV = (csvContent) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvContent, {
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
};
