/**
 * Generates an array of year options for the dropdown menu.
 */
export const generateYears = () => {
  const pastYears = Math.floor(50 / 2);

  const years = Array.from(new Array(50), (_, index) => {
    const year = 2024 - pastYears + index;
    return { key: year, value: year, text: year };
  });
  return years;
};
