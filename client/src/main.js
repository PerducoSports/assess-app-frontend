// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// ==========================
// DONT TOUCH
// ==========================

import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store/store'

Vue.config.productionTip = false
Vue.use(vuetify)

/* eslint-disable no-new */
new Vue({
  store: store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
