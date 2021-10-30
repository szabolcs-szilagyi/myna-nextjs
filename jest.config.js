module.exports = {
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/test/mocks/styleMock.js',
  },
  testPathIgnorePatterns: [
    '<rootDir>/cypress'
  ]
};
