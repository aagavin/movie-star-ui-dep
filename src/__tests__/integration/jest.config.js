
module.exports = {
  preset: 'jest-puppeteer',
  testTimeout: 35000,
  testMatch: ['**/*.test.ts'],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  }
};