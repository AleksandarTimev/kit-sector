const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "598wpq",

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },

  baseUrl: "http://localhost:3000" // Add this line to set the base URL
});