import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
// import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const staticFinancialsPublications = {
  staticFinancials: 'StaticFinancials',
  staticFinancialsAdmin: 'StaticFinancialsAdmin',
};

class StaticFinancialsCollection extends BaseCollection {
  constructor() {
    super('StaticFinancials', new SimpleSchema({
      customerName: String,
      year: Number,
      assets: Number,
      liabilities: Number,
      netPosition: Number,
      cashOnHand: Number,
      investment: Number,
      liquidity: Number,
      debt: Number,
      revenues: Number,
      opex: Number,
      netIncome: Number,
      cashFlow: {
        inflow: Number,
        outflow: Number,
        net: Number,
      },
      incrementalFringeBenefits: {
        admin: Number,
        mgmtStaff: Number,
        mgmt: Number,
      },
    }));
  }

  define({
    customerName,
    year,
    assets,
    liabilities,
    netPosition,
    cashOnHand,
    investment,
    liquidity,
    debt,
    revenues,
    opex,
    netIncome,
    cashFlow,
    incrementalFringeBenefits,
  }) {
    const docID = this._collection.insert({
      customerName,
      year,
      assets,
      liabilities,
      netPosition,
      cashOnHand,
      investment,
      liquidity,
      debt,
      revenues,
      opex,
      netIncome,
      cashFlow,
      incrementalFringeBenefits,
    });
    return docID;
  }

  update(docID, {
    customerName,
    year,
    assets,
    liabilities,
    netPosition,
    cashOnHand,
    investment,
    liquidity,
    debt,
    revenues,
    opex,
    netIncome,
    cashFlow,
    incrementalFringeBenefits,
  }) {
    const updateData = {};
    if (customerName) updateData.customerName = customerName;
    if (_.isNumber(year)) updateData.year = year;
    if (_.isNumber(assets)) updateData.assets = assets;
    if (_.isNumber(liabilities)) updateData.liabilities = liabilities;
    if (_.isNumber(netPosition)) updateData.netPosition = netPosition;
    if (_.isNumber(cashOnHand)) updateData.cashOnHand = cashOnHand;
    if (_.isNumber(investment)) updateData.investment = investment;
    if (_.isNumber(liquidity)) updateData.liquidity = liquidity;
    if (_.isNumber(debt)) updateData.debt = debt;
    if (_.isNumber(revenues)) updateData.revenues = revenues;
    if (_.isNumber(opex)) updateData.opex = opex;
    if (_.isNumber(netIncome)) updateData.netIncome = netIncome;
    if (cashFlow) updateData.cashFlow = cashFlow;
    if (incrementalFringeBenefits) updateData.incrementalFringeBenefits = incrementalFringeBenefits;

    this._collection.update(docID, { $set: updateData });
  }

  removeIt(docIDOrCustomer) {
    let doc;
    if (this.isValidID(docIDOrCustomer)) {
      doc = this.findDoc(docIDOrCustomer);
    } else {
      doc = this._collection.findOne({ customerName: docIDOrCustomer });
    }
    if (!doc) {
      throw new Meteor.Error('Document not found', `No document found with ID or customer name: ${docIDOrCustomer}`);
    }
    this._collection.remove(doc._id);
    return true;
  }

  isValidID(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;

      Meteor.publish(staticFinancialsPublications.staticFinancials, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      Meteor.publish(staticFinancialsPublications.staticFinancialsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeStaticFinancials() {
    if (Meteor.isClient) {
      return Meteor.subscribe(staticFinancialsPublications.staticFinancials);
    }
    return null;
  }

  subscribeStaticFinancialsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(staticFinancialsPublications.staticFinancialsAdmin);
    }
    return null;
  }

  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const {
      customerName, year, assets, liabilities, netPosition, cashOnHand,
      investment, liquidity, debt, revenues, opex, netIncome, cashFlow, incrementalFringeBenefits,
    } = doc;

    return {
      customerName,
      year,
      assets,
      liabilities,
      netPosition,
      cashOnHand,
      investment,
      liquidity,
      debt,
      revenues,
      opex,
      netIncome,
      cashFlow,
      incrementalFringeBenefits,
    };
  }
}

export const StaticFinancials = new StaticFinancialsCollection();
