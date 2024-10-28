import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FinancialStatement from '../../pages/FinancialStatement';

// The purpose of this is to use functional components like useParams while maintaing the class compononent style fo the BalanceSheet
const FinancialStatementWrapper = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  return <FinancialStatement navigate={navigate} profileId={profileId} />;
};

export default FinancialStatementWrapper;
