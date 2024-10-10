// imports/api/FinancialProfiles/methods.js

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { ROLES } from '../../api/role/Role';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';

Meteor.methods({
  'FinancialProfiles.remove'(profileId) {
    check(profileId, String);

    // Ensure the user is logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to perform this action.');
    }

    // Get the profile document
    const profile = FinancialProfiles.findDoc(profileId);
    if (!profile) {
      throw new Meteor.Error('profile-not-found', 'Profile not found.');
    }

    // Get the username of the logged-in user
    const username = Meteor.users.findOne(this.userId).username;

    // Check if the user is the owner of the profile or an admin
    if (profile.owner !== username && !Roles.userIsInRole(this.userId, ROLES.ADMIN)) {
      throw new Meteor.Error('not-authorized', 'You are not authorized to delete this profile.');
    }

    // Remove the profile from the collection
    FinancialProfiles._collection.remove(profileId);
  },

  inviteUserToProfileByEmail({ profileId, email, role }) {
    // Call your server-side function
    FinancialProfiles.inviteUserByEmail(profileId, email, role);
  },
});
