/// <reference types="cypress" />
/// <reference path="../support/index.d.ts" />

/**
 * @type {Cypress.PluginConfig}
 */

const browserify = require("@cypress/browserify-preprocessor")
const cucumber = require("cypress-cucumber-preprocessor").default
const resolve = require("resolve")
const os = require("os")
//import * as mochawesome from 'mochawesome';

module.exports = (on, config) => {
  on('after:run', (results) => {
    const options = {
      reportDir: 'cypress/reports/mochawesome',
      overwrite: false,
      html: false,
      json: true,
    };
   // return mochawesome.create(results, options);
  });

  const options = {
    ...browserify.defaultOptions,
    typescript: resolve.sync("typescript", {
      baseDir: config.projectRoot + "/cypress",
    }), 
  }

  let storeDetails
  const storeType = config.env.TAGS

  if (storeType.includes("current") || storeType.includes("smoke")) {
    storeDetails = storeType
      .substring(0, storeType.indexOf("-"))
      .replace("@", "")
      .concat("-", config.env.environment)
  } else {
    storeDetails = storeType
      .replace("@", "")
      .concat("-", config.env.environment)
  }

  const configFile = require(`../config/config.json`)
  config.env.urls = configFile[config.env.environment]
  config.env.storeDetails = configFile[storeDetails]

  const networkInterfaces = os.networkInterfaces()
  config.hosts["*.localhost"] = networkInterfaces["Wi-Fi"]
    ? networkInterfaces["Wi-Fi"][1].address
    : networkInterfaces["wlp1s0"][0]["address"]
    ? networkInterfaces["wlp1s0"][0]["address"]
    : networkInterfaces["en0"][1].address

  on("file:preprocessor", cucumber(options))

  return Object.assign({}, config, {
    supportFile: "cypress/support/index.ts",
  })
}