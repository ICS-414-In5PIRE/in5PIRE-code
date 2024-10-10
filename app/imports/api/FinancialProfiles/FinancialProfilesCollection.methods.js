import { Meteor } from 'meteor/meteor';
import { FinancialProfiles } from './FinancialProfilesCollection';

// export const inviteUserByEmail = function (profileId, email, role) {
//   const profile = this.findDoc(profileId);
//   if (!profile) {
//     throw new Meteor.Error('Profile not found');
//   }
//
//   // Ensure the current user is the owner or an admin
//   const currentUserId = Meteor.userId();
//   const isOwnerOrAdmin = profile.owner === currentUserId ||
//     profile.members.some(member => member.userId === currentUserId && member.role === 'admin');
//
//   if (!isOwnerOrAdmin) {
//     throw new Meteor.Error('Not authorized. You must be admin of this scenario');
//   }
//
//   // Find the user profile by email using findByEmail
//   const userToInvite = this.findByEmail(email);
//   if (!userToInvite) {
//     throw new Meteor.Error('User not found');
//   }
//
//   const userId = userToInvite.userID; // Get the userID from the found profile
//
//   // Check if the user is already a member of the profile
//   const isAlreadyMember = profile.members.some(member => member.userId === userId);
//   if (isAlreadyMember) {
//     throw new Meteor.Error('User is already a member of this profile');
//   }
//
//   // Add the user to the profile with the given role
//   this._collection.update(profileId, {
//     $push: {
//       members: {
//         userId,
//         role,
//       },
//     },
//   });
// };
export const inviteUserByEmail = function (profileId, email, role) {
  // Use FinancialProfiles._collection directly instead of 'this'
  const profile = FinancialProfiles.findOne(profileId);
  if (!profile) {
    throw new Meteor.Error('Profile not found');
  }

  // Ensure the current user is the owner or an admin
  const currentUserId = Meteor.userId();
  const isOwnerOrAdmin = profile.owner === currentUserId ||
    profile.members.some(member => member.userId === currentUserId && member.role === 'admin');

  if (!isOwnerOrAdmin) {
    throw new Meteor.Error('Not authorized. You must be an admin of this profile.');
  }

  // Find the user by email using Meteor.users
  const userToInvite = Meteor.users.findOne({ 'emails.address': email });
  if (!userToInvite) {
    throw new Meteor.Error('User not found');
  }

  const userId = userToInvite._id; // Get the userID from the found profile

  // Check if the user is already a member of the profile
  const isAlreadyMember = profile.members.some(member => member.userId === userId);
  if (isAlreadyMember) {
    throw new Meteor.Error('User is already a member of this profile');
  }

  // Add the user to the profile with the given role
  FinancialProfiles._collection.update(profileId, {
    $push: {
      members: {
        userId,
        role,
      },
    },
  });
};
