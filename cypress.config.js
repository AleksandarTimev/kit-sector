const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "598wpq",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000" // Set base URL for e2e testing
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});