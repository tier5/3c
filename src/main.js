import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMask from 'v-mask';

import App from './App.vue';
import { VueMaskDirective } from 'v-mask';
import Chat from './Chat.vue';
import Chatlog from './Chatlog.vue';
import ChatWindow from './ChatWindow.vue';
import ChatMessage from './ChatMessage.vue';
import SendMessage from './SendMessage.vue';
import ChatMobile from './ChatMobile.vue';
import VueValidate from 'vuelidate';
import VueSocketio from 'vue-socket.io';



var node = document.createElement("div");
node.id = 'dynamicId';
document.body.appendChild(node);

Vue.use(VueResource);
Vue.use(VueMask);
Vue.use(VueValidate);
Vue.use(VueSocketio, 'http://localhost:3100');

Vue.directive('mask', VueMaskDirective);
Vue.component('chat', Chat);
Vue.component('chatlog', Chatlog);
Vue.component('chat-window', ChatWindow);
Vue.component('chat-message', ChatMessage);
Vue.component('send-message', SendMessage);
Vue.component('chat-mobile', ChatMobile);

new Vue({
  el: '#dynamicId',
  render: h => h(App)
})
