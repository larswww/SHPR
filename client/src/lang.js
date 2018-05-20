'use strict'
import Vue from 'vue'
import Vuei18n from 'vue-i18n'
import cn from './lang/cn.json'
import en from './lang/en.json'
import th from './lang/th.json'

Vue.use(Vuei18n)

const locale = localStorage.getItem('language') || 'cn'

const messages = {cn, en, th}

const i18n = new Vuei18n({
  locale,
  messages
})

export default i18n