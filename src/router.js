import Vue from 'vue';

import App from './App.vue';
import Chat from './Chat.vue';
import ChatRequest from './ChatRequest.vue';
import AuthGuard from './guard/auth_guard';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'ChatRequest',
      component: ChatRequest
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      beforeEnter: AuthGuard  
    }
  ]
});

