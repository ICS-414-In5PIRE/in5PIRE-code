import { Meteor } from 'meteor/meteor';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { StaticFinancials } from './StaticFinancialsCollection';

export const defineStaticFinancialsMethod = new ValidatedMethod({
  name: 'StaticFinancials.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ definitionData }) {
    if (Meteor.isServer) {
      StaticFinancials.assertValidRoleForMethod(this.userId);
      return StaticFinancials.define(definitionData);
    }
    return '';
  },
});

export const updateStaticFinancialsMethod = new ValidatedMethod({
  name: 'StaticFinancials.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ updateData }) {
    if (Meteor.isServer) {
      StaticFinancials.assertValidRoleForMethod(this.userId);
      const { docID } = updateData;
      return StaticFinancials.update(docID, updateData);
    }
    return '';
  },
});

export const removeStaticFinancialsMethod = new ValidatedMethod({
  name: 'StaticFinancials.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run({ instance }) {
    if (Meteor.isServer) {
      StaticFinancials.assertValidRoleForMethod(this.userId);
      return StaticFinancials.removeIt(instance);
    }
    return true;
  },
});
