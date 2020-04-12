// jest-puppeteer.config.js
module.exports = {
  server: {
    command: 'ionic serve --ci --no-open',
    port: 8100,
  },
  launch: {
    dumpio: false,
    headless: 'false',
    defaultViewport: {
      width: 415,
      height: 730,
      isMobile: true,
      hasTouch: true
    }
  }
}