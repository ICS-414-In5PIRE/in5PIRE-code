import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { FinancialProfiles } from './FinancialProfilesCollection';

/**
 * Method to invite a user to a financial profile and assign a role.
 * @param profileId the ID of the financial profile.
 * @param userId the ID of the user to invite.
 * @param role the role to assign (admin/viewer).
 */
export const inviteUserToProfileMethod = new ValidatedMethod({
  name: 'FinancialProfiles.inviteUser',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ profileId, userId, role }) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to invite a user.');
    }

    if (Meteor.isServer) {
      const profile = FinancialProfiles.findOne(profileId);
      if (!profile) {
        throw new Meteor.Error('Profile not found');
      }

      // Check if the current user is the owner or an admin of the profile
      const currentUserId = this.userId;
      const isOwnerOrAdmin = profile.owner === currentUserId ||
        profile.members.some(member => member.userId === currentUserId && member.role === 'admin');

      if (!isOwnerOrAdmin) {
        throw new Meteor.Error('Not authorized');
      }

      // Add the user to the profile with the given role
      FinancialProfiles.update(profileId, {
        $push: {
          members: {
            userId,
            role,
          },
        },
      });
    }
  },
});

/**
 * Method to update the role of a user in a financial profile.
 * @param profileId the ID of the financial profile.
 * @param userId the ID of the user whose role is being updated.
 * @param newRole the new role to assign.
 */
export const updateUserRoleInProfileMethod = new ValidatedMethod({
  name: 'FinancialProfiles.updateUserRole',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ profileId, userId, newRole }) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to update a user role.');
    }

    if (Meteor.isServer) {
      const profile = FinancialProfiles.findOne(profileId);
      if (!profile) {
        throw new Meteor.Error('Profile not found');
      }

      const currentUserId = this.userId;
      const isOwnerOrAdmin = profile.owner === currentUserId ||
        profile.members.some(member => member.userId === currentUserId && member.role === 'admin');

      if (!isOwnerOrAdmin) {
        throw new Meteor.Error('Not authorized');
      }

      // Update the user's role in the profile
      FinancialProfiles.update({ _id: profileId, 'members.userId': userId }, {
        $set: {
          'members.$.role': newRole,
        },
      });
    }
  },
});

/**
 * Method to remove a user from a financial profile.
 * @param profileId the ID of the financial profile.
 * @param userId the ID of the user to remove.
 */
export const removeUserFromProfileMethod = new ValidatedMethod({
  name: 'FinancialProfiles.removeUser',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ profileId, userId }) {
    if (!this.userId) {
      throw new Meteor.Error('unauthorized', 'You must be logged in to remove a user.');
    }

    if (Meteor.isServer) {
      const profile = FinancialProfiles.findOne(profileId);
      if (!profile) {
        throw new Meteor.Error('Profile not found');
      }

      const currentUserId = this.userId;
      const isOwnerOrAdmin = profile.owner === currentUserId ||
        profile.members.some(member => member.userId === currentUserId && member.role === 'admin');

      if (!isOwnerOrAdmin) {
        throw new Meteor.Error('Not authorized');
      }

      // Remove the user from the profile
      FinancialProfiles.update(profileId, {
        $pull: {
          members: {
            userId,
          },
        },
      });
    }
  },
});
