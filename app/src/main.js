// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// eslint-disable-next-line
import VueResource from 'vue-resource';

Vue.use(VueResource)
Vue.config.productionTip = false
require('./styles/materialize/css/materialize.min.css')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
