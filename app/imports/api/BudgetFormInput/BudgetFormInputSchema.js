import SimpleSchema from 'simpl-schema';

export const BudgetFormInputSchema = new SimpleSchema({
  year: {
    type: Number,
    optional: false,
  },
  owner: {
    type: String,
    optional: false,
  },
  profileId: {
    type: String,
    optional: false,
  },
  // Revenue fields
  fivePercent: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  revenues: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  generalFund: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  coreOperatingBudget: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  totalRevenue: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  // Expenses fields
  personnel: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  program: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  contracts: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  grants: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  travel: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  equipment: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  overhead: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  debtService: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  other: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  totalExpenses: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  // Admin personnel and fringe fields
  salaryAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  pensionAccumulationAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  retireeHealthInsuranceAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  postEmploymentBenefitsAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  employeesHealthFundAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  socialSecurityAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  medicareAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  workersCompensationAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  unemploymentCompensationAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  pensionAdministrationAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  fringeBenefitsAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  personnelAndFringeAdmin: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  // Management personnel and fringe fields
  salaryManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  pensionAccumulationManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  retireeHealthInsuranceManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  postEmploymentBenefitsManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  employeesHealthFundManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  socialSecurityManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  medicareManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  workersCompensationManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  unemploymentCompensationManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  pensionAdministrationManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  fringeBenefitsManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  personnelAndFringeManagement: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  // Management staff personnel and fringe fields
  salaryStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  pensionAccumulationStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  retireeHealthInsuranceStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  postEmploymentBenefitsStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  employeesHealthFundStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  socialSecurityStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  medicareStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  workersCompensationStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  unemploymentCompensationStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  pensionAdministrationStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  fringeBenefitsStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  personnelAndFringeStaff: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  // Surplus fields
  management: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  supportServices: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  beneficiaryAdvocacy: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
  surplusDeficit: {
    type: Number,
    optional: true,
    defaultValue: null,
  },
});
