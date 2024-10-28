import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BalanceSheetInput from '../../pages/BalanceSheetInput';

// The purpose of this is to use functional components like useParams while maintaing the class compononent style fo the BalanceSheet
const BalanceSheetInputWrapper = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  return <BalanceSheetInput navigate={navigate} profileId={profileId} />;
};

export default BalanceSheetInputWrapper;
