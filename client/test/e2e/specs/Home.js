'use strict'

module.exports = {

  'remove tokens': function (browser) {
    const devServer = browser.globals.devServerURL
    browser.url(devServer)
      .waitForElementVisible('#app', 5000)
      .execute(function () {
        window.localStorage.setItem('token', null)
        window.localStorage.setItem('language', null)
      })
  },

  'home page renders': function (browser) {
    browser
      .assert.elementPresent('body')
      .assert.containsText('th', '🍕')
      .assert.elementCount('body', 1)
  },

  'home page has top navbar': function (browser) {
    browser
      .expect.element('.fixed-top').to.be.present

  },

  'home page has bottom navbar': function (browser) {
    browser
      .expect.element('.fixed-bottom').to.be.present
    browser.end()

  }

}