const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    baseURL: 'https://getcloudapp.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
