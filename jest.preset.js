const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['text', 'html'], // to show coverage report in the terminal
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
};
