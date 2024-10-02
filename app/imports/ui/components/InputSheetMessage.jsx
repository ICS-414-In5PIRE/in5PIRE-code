import React, { useEffect } from 'react';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const InputSheetMessage = ({ snackBar, handleSnackBar }) => {
  // useEffect hook to handle the snackbar message closing after 5 seconds
  useEffect(() => {
    if (snackBar.isOpen) {
      setTimeout(() => {
        handleSnackBar(false, snackBar.message, snackBar.isError);
      }, 5000);
    }
  }, [snackBar]);

  return (
    <Message
      floating
      visible={snackBar.isOpen}
      error={snackBar.isError}
      success={!snackBar.isError}
      header={snackBar.isError ? 'Error' : 'Success'}
      content={snackBar.message}
    />
  );
};

InputSheetMessage.propTypes = {
  snackBar: PropTypes.shape({
    isOpen: PropTypes.bool,
    isError: PropTypes.bool,
    message: PropTypes.string,
  }).isRequired,
  handleSnackBar: PropTypes.func.isRequired,
};

export default InputSheetMessage;
