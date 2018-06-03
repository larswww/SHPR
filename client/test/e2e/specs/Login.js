'use strict'

module.exports = {

  'remove tokes and open signup page': function (browser) {
    browser.execute(function () {
      window.localStorage.setItem('token', null)
      window.localStorage.setItem('language', null)
    })

    browser.url(`${browser.globals.devServerURL}/#/signup`)

      .waitForElementVisible('#login', 5000)
  },

  'login using credentials': function (browser) {
    browser.setValue('input[type=email]', 'hi@larsw.net')
    browser.setValue('input[type=password]', 'indulger')
    browser.click('#login > form > button')
    .waitForElementPresent('#userpage', 5000, false)
  },

  'user page has reviewed venues': function (browser) {
    browser.assert.containsText('#userpage > h2:nth-child(1)', '你评论的场地')
    browser.expect.element('#userpage > ul:nth-child(2) > li:nth-child(1) > a').to.be.present
  },

  'user page has venues to try': function (browser) {
    browser.assert.containsText('#userpage > h2:nth-child(3)', '尝试披萨')
    browser.expect.element('#userpage > ul:nth-child(4) > li:nth-child(1) > a').to.be.present
    browser.end()
  }

}

