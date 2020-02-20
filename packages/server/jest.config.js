/* eslint-disable no-undef */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globalSetup: "<rootDir>/src/testUtils/callSetup.js",
  globals: {
    "ts-jest": {
      diagnostics: false
    }
  },
  collectCoverageFrom: [
    "**/*.{ts, tsx, js}",
    "!**/node_modules/**",
    "!**/dist/**"
  ],
  roots: ['./src']
};