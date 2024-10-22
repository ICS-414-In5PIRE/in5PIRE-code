import React from 'react';
import { useParams } from 'react-router-dom';
import BalanceSheetInput from '../../pages/BalanceSheetInput';

// The purpose of this is to use functional components like useParams while maintaing the class compononent style fo the BalanceSheet
const BalanceSheetInputWrapper = () => {
  const { profileId } = useParams();
  return <BalanceSheetInput profileId={profileId} />;
};

export default BalanceSheetInputWrapper;
