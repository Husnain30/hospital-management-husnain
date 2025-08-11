import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

store.dispatch('auth/initAuth') // Restore token & user from sessionStorage

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

