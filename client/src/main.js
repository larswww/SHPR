// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store.js'
import router from './router.js'
import i18n from './lang.js'
import BootstrapVue from 'bootstrap-vue'
import VueFlashMessage from 'vue-flash-message'

//todo use individual components instead
Vue.use(BootstrapVue)
Vue.use(VueFlashMessage);

Vue.config.productionTip = false


// router.redirect({
//   '*': '/home'
// })

// router.start(App, '#app')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
