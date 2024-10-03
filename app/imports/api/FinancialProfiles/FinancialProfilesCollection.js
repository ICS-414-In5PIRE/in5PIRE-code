import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

// Define the allowed values for profile type
export const financialProfileTypes = ['Personal', 'Business'];

// Define the publications for financial profiles
export const financialProfilesPublications = {
  profiles: 'FinancialProfiles',
  profilesAdmin: 'FinancialProfilesAdmin',
};

class FinancialProfilesCollection extends BaseCollection {
  constructor() {
    super('FinancialProfiles', new SimpleSchema({
      title: String,
      type: {
        type: String,
        allowedValues: financialProfileTypes,
        defaultValue: 'Personal',
      },
      description: {
        type: String,
        optional: true,
      },
      owner: String,
      createdAt: {
        type: Date,
        defaultValue: new Date(),
      },
      lastEditedAt: {
        type: Date,
        optional: true,
      },
      image: {
        type: String,
        optional: true,
      },
      members: {
        type: Array,
        optional: true,
      },
      'members.$': {
        type: Object,
      },
      'members.$.userId': String,
      'members.$.role': {
        type: String,
        allowedValues: ['admin', 'viewer'],
      },
    }));
  }

  /**
   * Defines a new financial profile.
   * @param title the title of the profile.
   * @param type the type of profile (Personal/Business).
   * @param owner the owner (user) of the profile.
   * @param description the description of the profile (optional).
   * @param image the image associated with the profile (optional).
   * @return {String} the docID of the new profile document.
   */
  define({ title, type, owner, description, image }) {
    const docID = this._collection.insert({
      title,
      type,
      owner,
      description,
      image,
      createdAt: new Date(),
    });
    return docID;
  }

  /**
   * Updates the given profile document.
   * @param docID the id of the document to update.
   * @param title the new title (optional).
   * @param type the new type (optional).
   * @param description the new description (optional).
   * @param image the new image (optional).
   * @param lastEditedAt the new last edited date (optional).
   */
  update(docID, { title, type, description, image, lastEditedAt }) {
    const updateData = {};
    if (title) {
      updateData.title = title;
    }
    if (type && financialProfileTypes.includes(type)) {
      updateData.type = type;
    }
    if (description) {
      updateData.description = description;
    }
    if (image) {
      updateData.image = image;
    }
    if (lastEditedAt) {
      updateData.lastEditedAt = lastEditedAt;
    } else {
      updateData.lastEditedAt = new Date();
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * Removes a profile from the collection.
   * @param { String | Object } profile A profile document or docID in this collection.
   * @returns true
   */
  removeIt(profile) {
    const doc = this.findDoc(profile);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Publishes the financial profiles.
   * It publishes all profiles for admin and profiles associated with an owner.
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;

      // Publishes profiles associated with the logged-in user
      Meteor.publish(financialProfilesPublications.profiles, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      // Publishes all profiles for admin users
      Meteor.publish(financialProfilesPublications.profilesAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for profiles owned by the current user.
   */
  subscribeProfiles() {
    if (Meteor.isClient) {
      return Meteor.subscribe(financialProfilesPublications.profiles);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeProfilesAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(financialProfilesPublications.profilesAdmin);
    }
    return null;
  }

  /**
   * Ensures that the user has a valid role for defining, updating, or removing profiles.
   * @param userId The userId of the logged-in user.
   * @throws { Meteor.Error } If the user does not have a valid role.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of the profile for restoring or defining purposes.
   * @param docID
   * @return {{owner: *, description: *, type: *, title: *, createdAt: *, image: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const { title, type, owner, description, createdAt, image } = doc;
    return { title, type, owner, description, createdAt, image };
  }
}

/**
 * Provides the singleton instance of the FinancialProfilesCollection to all other entities.
 */
export const FinancialProfiles = new FinancialProfilesCollection();
