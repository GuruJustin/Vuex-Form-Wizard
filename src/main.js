import Vue from 'vue'
import Vuex from 'vuex'
import Store from './store/index'

Vue.use(Vuex);

import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false

new Vue({
  el: "#app",
  store: Store,
  render: h => h(App),
}).$mount('#app')
