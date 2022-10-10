const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|my-project|redux-persist)/)',
  ],
};
