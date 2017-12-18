import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMask from 'v-mask';

import App from './App.vue';
import { VueMaskDirective } from 'v-mask';
import Chat from './Chat.vue';
import ChatRequest from './ChatRequest.vue';
import VueValidate from 'vuelidate';
import VueSocketio from 'vue-socket.io';
import VueLocalStorage from 'vue-ls';
import router from './router';

import 'vue-awesome/icons/flag';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue'

var node = document.createElement("div");
node.id = 'dynamicId';
document.body.appendChild(node);

Vue.use(VueResource);
Vue.use(VueMask);
Vue.use(VueValidate);
Vue.use(VueSocketio, 'http://138.197.215.68:3000');
Vue.use(VueLocalStorage);

Vue.directive('mask', VueMaskDirective);
Vue.component('icon', Icon);


new Vue({
  el: '#dynamicId',
  router,
  components : {App},
  render: h => h(App)
})
