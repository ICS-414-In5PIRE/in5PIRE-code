import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BudgetForm from '../../pages/BudgetForm';

const BudgetFormWrapper = () => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  return <BudgetForm navigate={navigate} profileId={profileId} />;
};

export default BudgetFormWrapper;
