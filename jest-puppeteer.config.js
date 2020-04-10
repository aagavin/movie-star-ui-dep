// jest-puppeteer.config.js
module.exports = {
  server: {
    command: 'SKIP_PREFLIGHT_CHECK=true ionic serve',
    port: 8100,
  },
  launch: {
    dumpio: false,
    headless: 'false',
  }
}