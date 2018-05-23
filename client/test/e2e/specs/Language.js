'use strict'

module.exports = {
  'the default language is chinese': function (browser) {
    browser.url(browser.globals.devServerURL)
      .waitForElementVisible('#app', 5000)

    browser.assert.containsText('#app > div.container > div > div > table > thead > tr > th:nth-child(2)', '上海最好的比萨饼')

  },


  'changing language to english works': function (browser) {

    browser.click('#__BVID__7__BV_toggle_')
    browser.click('#__BVID__7 > div > a:nth-child(1)')
    browser.assert.containsText('#app > div.container > div > div > table > thead > tr > th:nth-child(2)', 'Shanghai Pizza Rankings')
  },


  'venue page is in english after language change': function (browser) {
    browser.click()

    browser.end()

  }

}