'use strict'

module.exports = {

  'venue paths work in lowercase': function (browser) {
    browser.url(`${browser.globals.devServerURL}/#/venue/bella napoli`)
      .waitForElementVisible('#venue', 5000)
  },

  'venue path works in upcase': function (browser) {
    browser.url(`${browser.globals.devServerURL}/#/venue/Bella Napoli`)
      .waitForElementVisible('#venue', 5000)
    browser.end()
  }

}

