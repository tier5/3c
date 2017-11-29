import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMask from 'v-mask';

import App from './App.vue';
import { VueMaskDirective } from 'v-mask';
import Chat from './Chat.vue';
import Example from './Example.vue';
import Chatlog from './Chatlog.vue';
import ChatWindow from './ChatWindow.vue';

var node = document.createElement("div");
node.id = 'dynamicId';
document.body.appendChild(node);

Vue.use(VueResource);
Vue.use(VueMask);

Vue.directive('mask', VueMaskDirective);
Vue.component('example', Example);
Vue.component('chat', Chat);
Vue.component('chatlog', Chatlog);
Vue.component('chat-window', ChatWindow);

new Vue({
  el: '#dynamicId',
  render: h => h(App)
})
