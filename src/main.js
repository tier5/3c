import Vue from 'vue';
import VueResource from 'vue-resource';
import VueMask from 'v-mask';

import App from './App.vue';
import { VueMaskDirective } from 'v-mask';
import Chat from './Chat.vue';
import Chatlog from './Chatlog.vue';
import ChatWindow from './ChatWindow.vue';
import SendMessage from './SendMessage.vue';
import ChatMobile from './ChatMobile.vue';
import VueValidate from 'vuelidate';
import VueSocketio from 'vue-socket.io';
import VueLocalStorage from 'vue-ls';
 

// import Echo from "laravel-echo";
// import Pusher from 'pusher-js';


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
Vue.component('chatlog', Chatlog);
Vue.component('chat-window', ChatWindow);
Vue.component('send-message', SendMessage);
Vue.component('chat-mobile', ChatMobile);
//window.Pusher = require('pusher-js');


// window.Echo = new Echo({  
// 	authHost : 'http://3c.local/api/v1',
// 	authEndpoint : 'http://3c.local/api/v1/broadcasting/auth',
//     broadcaster: 'pusher',
//     key: '273248fd9dba7884ec8b',
//     secret: '518bf9ee6dd7569b5718',
//     cluster: 'ap2',
//     encrypted: true
// });



new Vue({
  el: '#dynamicId',
  render: h => h(App)
})
