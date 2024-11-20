import { Meteor } from 'meteor/meteor';
import { ROLE } from '../../api/role/Role';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';

/* eslint-disable no-console */

function createUser(email, role, firstName, lastName, password) {
  console.log(`  Creating user ${email} with role ${role}.`);
  if (role === ROLE.ADMIN) {
    return AdminProfiles.define({ email, firstName, lastName, password });
  }
  return UserProfiles.define({ email, firstName, lastName, password });

}

function createOrRetrieveFinancialProfile(userEmail, title) {
  const profile = FinancialProfiles.findOne({ owner: userEmail });
  if (profile) {
    return profile._id;
  }

  return FinancialProfiles.define({ title, type: 'Personal', owner: userEmail });

}

if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    const userProfiles = {};
    Meteor.settings.defaultAccounts.forEach(({ email, password, role, firstName, lastName }) => {
      const profileId = createUser(email, role, firstName, lastName, password);
      const financialProfileId = createOrRetrieveFinancialProfile(email, `${firstName}'s Financial Profile`);
      userProfiles[email] = { profileId, financialProfileId };
    });
    global.userProfiles = userProfiles;
  } else {
    console.log('Cannot initialize the database! Please invoke meteor with a settings file.');
  }
}
