module.exports = {
  moduleFileExtensions: ['js'],
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.spec.js'],
  collectCoverageFrom: ['lib/index.js'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node'
};
