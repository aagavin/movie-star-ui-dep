


module.exports = {
  server: {
    command: "cd ..;ionic serve --no-open --no-livereload -p 8000",
    launchTimeout: 10000,
    port: 8000
  },
  launch: {
    headless: process.env.HEADLESS === true ? true : false,
    defaultViewport: {
      width: 1280,
      height: 960
    },
    slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
  }
}