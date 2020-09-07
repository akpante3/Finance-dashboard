import Vue from 'vue'
import router from './router'
import App from './App.vue'
import AppInput from '@/components/partials/AppInput';
import store from '@/store'
import nprogress from '@/utils/nprogress'
import { authenticateUser } from '@/utils/utils';
import vSelect from "vue-select";

Vue.component('app-input', AppInput)
Vue.component("v-select", vSelect);
// handle outside clicks
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      if (!(el == event.target || el.contains(event.target))) {
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});


window.iziToast = require('izitoast');
window.moment = require('moment');

Vue.config.productionTip = false



router.beforeEach((to, from, next) => {
  if (to.name !== 'update-password' && to.name !== 'new-password' && to.name !== 'password-reset' && to.name !== 'log-in' && !authenticateUser().isValid){
    next({ name: 'log-in' })
  } else {
    next()
  }
})



new Vue({
  nprogress,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
