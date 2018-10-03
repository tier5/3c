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
import 'vue-awesome/icons/flag';
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon.vue';
import VueChatScroll from 'vue-chat-scroll';
import { environment} from './environment/environment';

var node = document.createElement("div");
node.id = 'dynamicId';
document.body.appendChild(node);

Vue.use(VueResource);
Vue.use(VueMask);
Vue.use(VueValidate);
Vue.use(VueChatScroll);

Vue.use(VueSocketio, environment.SOCKET_URL);
Vue.use(VueLocalStorage);

Vue.directive('mask', VueMaskDirective);
Vue.component('icon', Icon);
Vue.component('chat-request', ChatRequest);
Vue.component('chat', Chat);
console.log(process.env);

new Vue({
  el: '#dynamicId',
  components : {App},
  render: h => h(App)
})
