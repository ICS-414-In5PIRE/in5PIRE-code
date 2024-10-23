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

  updateUserRoleInProfile({ profileId, userId, newRole }) {
    check(profileId, String);
    check(userId, String);
    check(newRole, String);

    const profile = FinancialProfiles.findOne(profileId);
    if (!profile) {
      throw new Meteor.Error('Profile not found');
    }

    const currentUserId = Meteor.userId();
    const isOwnerOrAdmin = profile.owner === currentUserId ||
      profile.members.some(member => member.userId === currentUserId && member.role === 'admin');

    if (!isOwnerOrAdmin) {
      throw new Meteor.Error('Not authorized');
    }

    const memberIndex = profile.members.findIndex(member => member.userId === userId);
    if (memberIndex === -1) {
      throw new Meteor.Error('User not found in members');
    }
    const memberField = `members.${memberIndex}.role`;
    const updateResult = FinancialProfiles._collection.update(
      { _id: profileId },
      { $set: { [memberField]: newRole } },
    );

    if (updateResult === 0) {
      throw new Meteor.Error('Update failed');
    }

    return 'Role updated successfully';
  },

  getProfile(profileId) {
    check(profileId, String);
    const profile = FinancialProfiles.findOne(profileId);
    if (!profile) {
      throw new Meteor.Error('Profile not found');
    }
    return profile;
  },

  'FinancialProfiles.removeMember'(profileId, userId) {
    check(profileId, String);
    check(userId, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }
    FinancialProfiles.removeMember(profileId, userId);
  },
});
