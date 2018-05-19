'use strict'
import Vue from 'vue'
import Vuei18n from 'vue-i18n'
import cn from './lang/cn.json'
import en from './lang/en.json'

Vue.use(Vuei18n)

const locale = 'cn'

const messages = {
  cn: cn,
  en: en,
}

console.log(messages)

const i18n = new Vuei18n({
  locale,
  messages
})

export default i18n