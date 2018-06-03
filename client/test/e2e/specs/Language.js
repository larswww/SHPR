'use strict'

module.exports = {
  'the default language is chinese': function (browser) {
    browser.url(browser.globals.devServerURL)
      .waitForElementVisible('#app', 5000)
    browser.assert.containsText('#app > div.container > div > div > table > thead > tr > th:nth-child(2)', '上海最好的比萨饼')
  },

  'venue page is in Chinese': function (browser) {
    browser.url(`${browser.globals.devServerURL}/#/venue/bella napoli`)
      .waitForElementVisible('#venue', 5000)
    browser.assert.containsText('#app > div.container > div:nth-child(3) > button > a', '撰写评论')
    // browser.assert.containsText('#__BVID__13___BV_tab_button__', '签入')
  },

  'login page is Chinese': function (browser) {
    browser.url(`${browser.globals.devServerURL}/#/signup`)
      .waitForElementVisible('#login', 5000)
    browser.assert.containsText('#login > form > h2', '签入')
    browser.assert.containsText('#signup > h2', '注册到 上海PR')
  },

  'changing language to english works': function (browser) {
    browser.click('#__BVID__7__BV_toggle_')
    browser.click('#__BVID__7 > div > a:nth-child(1)')
    browser.assert.containsText('#signup > h2', 'Signup to SHPR')
  },

  'venues are reloaded after language change': function (browser) {
    browser.click('#app > nav.nav.nav-pills.fixed-bottom.bg-dark.nav-fill > a:nth-child(1)')
    browser.waitForElementVisible('#home', 5000)
    browser.assert.elementPresent('#home > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > a')

  },

  'venue page is in english after language change': function (browser) {
    browser.click('#home > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > a')
      .waitForElementVisible('#venue', 5000)
    browser.assert.containsText('#app > div.container > div:nth-child(3) > button > a', 'Write a Review')
    browser.assert.containsText('#__BVID__13___BV_tab_button__', 'Review')
    browser.end()
  }


}