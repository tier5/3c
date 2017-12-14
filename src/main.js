import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMask from 'v-mask';

import App from './App.vue';
import { VueMaskDirective } from 'v-mask';
import Chat from './Chat.vue';
import ChatWindow from './ChatWindow.vue';
import VueValidate from 'vuelidate';
import VueSocketio from 'vue-socket.io';
import VueLocalStorage from 'vue-ls';
 

var node = document.createElement("div");
node.id = 'dynamicId';
document.body.appendChild(node);

Vue.use(VueResource);
Vue.use(VueMask);
Vue.use(VueValidate);
Vue.use(VueSocketio, 'http://localhost:3000');
Vue.use(VueLocalStorage);

Vue.directive('mask', VueMaskDirective);
Vue.component('chat', Chat);
Vue.component('chat-window', ChatWindow);

new Vue({
  el: '#dynamicId',
  render: h => h(App)
})
