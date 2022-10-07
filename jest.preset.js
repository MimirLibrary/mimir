const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};
