import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import NotFound from '../pages/NotFound';
import SignUp from '../pages/SignUp';
import SignOut from '../pages/SignOut';
import SignIn from '../pages/SignIn';
import NotAuthorized from '../pages/NotAuthorized';
import { ROLE } from '../../api/role/Role';
import LoadingSpinner from '../components/LoadingSpinner';
import ManageDatabase from '../pages/ManageDatabase';
import AboutUs from '../pages/AboutUs';
import NewNav from '../components/NewNav';
import FinancialProfilesPage from '../pages/FinancialProfiles';
import AddFinancialProfile from '../pages/AddFinancialProfile';
import Dashboard from '../pages/Dashboard';
import FAQ from '../pages/FAQ';
import ContactUs from '../pages/ContactUs';
import UserGuide from '../pages/UserGuide';
import UploadFile from '../pages/UploadFile';
import EditFinancialProfile from '../pages/EditFinancialProfile';
import BalanceSheetInputWrapper from '../components/BalanceSheetComponents/BalanceSheetWrapper';
import ProfileBalanceSheetOverview from '../pages/ProfileBalanceSheetOverview';
import BudgetFormInputWrapper from '../components/BudgetFormComponents/BudgetFormInputWrapper';
import ProfileBudgetFormOverview from '../pages/ProfileBudgetFormOverview';
import FinancialStatementWrapper from '../components/FinancialStatementComponents/FinancialStatementWrapper';
import ProfileFinancialStatementOverview from '../pages/ProfileFinancialStatementOverview';
import CSVInstructionsPage from '../pages/CSVInstructionsPage';
import ProfileDashboard from '../pages/ProfileDashboard';
/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NewNav />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/userguide" element={<UserGuide />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/home" element={<ProtectedRoute><Landing /></ProtectedRoute>} />
          <Route path="/financial-profiles/" element={<ProtectedRoute><FinancialProfilesPage /></ProtectedRoute>} />
          <Route path="/edit-financial-profile/:profileId" element={<ProtectedRoute><EditFinancialProfile /></ProtectedRoute>} />
          <Route path="/add-financial-profile/" element={<ProtectedRoute><AddFinancialProfile /></ProtectedRoute>} />
          <Route path="/profile-balance-sheet/:profileId" element={<ProtectedRoute><ProfileBalanceSheetOverview /></ProtectedRoute>} />
          <Route path="/profile-budget-form/:profileId" element={<ProtectedRoute><ProfileBudgetFormOverview /></ProtectedRoute>} />
          <Route path="/profile-audited-fs/:profileId" element={<ProtectedRoute><ProfileFinancialStatementOverview /></ProtectedRoute>} />
          <Route path="/csv-instructions" element={<ProtectedRoute><CSVInstructionsPage /></ProtectedRoute>} />
          <Route path="/manage-database" element={<AdminProtectedRoute ready={ready}><ManageDatabase /></AdminProtectedRoute>} />
          <Route path="/notauthorized" element={<NotAuthorized />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/balance-sheet/:profileId" element={<ProtectedRoute><BalanceSheetInputWrapper /></ProtectedRoute>} />
          <Route path="/audited-fs/:profileId" element={<ProtectedRoute><FinancialStatementWrapper /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profiledashboard/:profileId" element={<ProtectedRoute><ProfileDashboard /></ProtectedRoute>} />
          <Route path="/budget-form/:profileId" element={<ProtectedRoute><BudgetFormInputWrapper /></ProtectedRoute>} />
          <Route path="/upload-file" element={<ProtectedRoute><UploadFile /></ProtectedRoute>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

/*
 * ProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  console.log('ProtectedRoute', isLogged);
  return isLogged ? children : <Navigate to="/signin" />;
};

/**
 * AdminProtectedRoute (see React Router v6 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN]);
  console.log('AdminProtectedRoute', isLogged, isAdmin);
  return (isLogged && isAdmin) ? children : <Navigate to="/notauthorized" />;
};

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

ProtectedRoute.defaultProps = {
  children: <Landing />,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  ready: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

AdminProtectedRoute.defaultProps = {
  ready: false,
  children: <Landing />,
};

export default App;
