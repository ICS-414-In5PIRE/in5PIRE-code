import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { StaticFinancials } from '../../api/financial/StaticFinancialsCollection';

// Call publish for all the collections.
MATPCollections.collections.forEach(c => c.publish());

// alanning:roles publication
// Recommended code to publish roles for each user.
// eslint-disable-next-line consistent-return
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  this.ready();
});

// Publish StaticFinancials for regular users
Meteor.publish('staticFinancials', function publishStaticFinancials() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return StaticFinancials._collection.find({ owner: username });
  }
  return this.ready();
});

// publish emails
Meteor.publish('userEmails', function publishUserEmails() {
  if (this.userId) {
    return Meteor.users.find({}, { fields: { emails: 1 } }); // Publish only emails field
  }
  return this.ready();
});

// Publish StaticFinancials for admin users
Meteor.publish('staticFinancialsAdmin', function publishStaticFinancialsAdmin() {
  if (this.userId && Roles.userIsInRole(this.userId, 'ADMIN')) {
    return StaticFinancials._collection.find();
  }
  return this.ready();
});
