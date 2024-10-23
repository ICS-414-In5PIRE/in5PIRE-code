import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Email } from 'meteor/email'; // Use Meteor's email package
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import { ROLES } from '../../api/role/Role';
import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';

const verificationCodes = new Map(); // Store codes temporarily in memory

Meteor.methods({
  // Method to send the verification code to the user's email
  sendVerificationCode(email) {
    check(email, String);

    // Generate a random verification code
    const code = Random.hexString(6);
    verificationCodes.set(email, code); // Store the code with the email key

    // Send the email with the verification code
    Email.send({
      to: email,
      from: 'no-reply@example.com', // Configure sender address
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}`,
    });
  },

  // Method to verify the code
  verifyCode({ email, code }) {
    check(email, String);
    check(code, String);

    const storedCode = verificationCodes.get(email);
    if (storedCode === code) {
      verificationCodes.delete(email); // Remove the code after verification
      return true; // Success, correct code entered
    }

    // Throw an error if the code is invalid
    throw new Meteor.Error('invalid-code', 'The verification code is incorrect');
  },

  // Method to remove a financial profile
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

  // Method to invite a user to a financial profile by email
  inviteUserToProfileByEmail({ profileId, email, role }) {
    check(profileId, String);
    check(email, String);
    check(role, String);

    FinancialProfiles.inviteUserByEmail(profileId, email, role);
  },

  // Method to update a user's role in a financial profile
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

  // Method to get a financial profile by its ID
  getProfile(profileId) {
    check(profileId, String);

    const profile = FinancialProfiles.findOne(profileId);
    if (!profile) {
      throw new Meteor.Error('Profile not found');
    }

    return profile;
  },

  // Method to remove a member from a financial profile
  'FinancialProfiles.removeMember'(profileId, userId) {
    check(profileId, String);
    check(userId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized');
    }

    FinancialProfiles.removeMember(profileId, userId);
  },
});
