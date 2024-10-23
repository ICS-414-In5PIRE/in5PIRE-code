import { FinancialProfiles } from '../../api/FinancialProfiles/FinancialProfilesCollection';

/**
 * Generates an array of year options for the dropdown menu.
 */
export const generateYears = () => {
  const pastYears = Math.floor(50 / 2);

  const years = Array.from(new Array(50), (_, index) => {
    const year = 2024 - pastYears + index;
    return { key: year, value: year, text: year };
  });
  return years;
};

/**
 * Generates profiles for the current user.
 */
export const generateProfiles = (owner, members) => {
  const profiles = FinancialProfiles.find({
    $or: [
      { owner: owner }, // Owner
      { 'members.userId': members }, // Members
    ],
  }).fetch();

  const profilesWithKeys = profiles.map((profile) => {
    const { createdAt, ...rest } = profile;
    return {
      ...rest,
      key: profile._id,
      value: profile.title,
      text: profile.title,
    };
  });

  return profilesWithKeys;
};
