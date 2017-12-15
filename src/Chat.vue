<template>
  <div class="chat-template">
    <div class="chat-window col-md-4 col-sm-6">
      <div class="panel panel-default">
        <div class="top-bar">

          <div class="col-md-3 col-xs-3">
            <div class="user-icon">
              <img src="src/assets/images/user3.png" class="img-responsive" alt="user-img">
            </div>
          </div>
          <div class="col-md-7 col-xs-5">
            <div class="row">
              <div class="detail">
                {{ client.name }}
                <p>Chat with Agent</p>
              </div>
            </div>
          </div>
          <div class="col-xs-1" v-if="!minimize">
            <a @click="chatMinimize"> 
              <icon name="window-minimize" aria-hidden="true"></icon> 
            </a>
          </div>
          <div class="col-xs-1" v-if="minimize">
            <a @click="chatMaximize"> 
              <icon name="window-maximize" aria-hidden="true"></icon> 
            </a>
          </div>
        </div>
        <div class="panel-body msg_container_base" v-if="!minimize">

          <div class="row msg_container base_sent">
            <b> {{ connectMessage }} </b>
          </div>
          <div v-for="update in updates">
            <div class="row msg_container base_sent" v-if="update.direction==1">
              <div class="messages msg_sent">
                <p>{{ update.message }}</p>
              </div>
            </div>

            <div class="row msg_container base_receive" v-if="update.direction==2">
              <div class="messages msg_receive">
                  <p>{{ update.message }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-footer" v-if="!minimize">
          <div class="input-group">
            <input type="text" class="form-control input-sm chat_input" placeholder="Write a question..." v-model="message" @keyup.enter="addMessage" />
            <span class="input-group-btn">
              <button class="btn" @click="addMessage">Send</button>
            </span>
          </div>                
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
export default {
  name: 'chat',
  sockets:{
    connect: function(){
      console.log('Emiting client-connected from vue');
    //  this.$socket.emit('client-connected', this.client);
    },
    /** to get the client room */
    clientAddedToRoom: function (data) {
      this.client = data;
      this.roomNo = data.room_number;
      console.log("connected client");
  
    },
    /**when the client does not get connected */ 
    clientNotAddedToRoom: function() {

      console.log("Client join failed");
      this.$socket.emit('disconnect');
    },

    /** to update the room the client has joined */
    updateRoom: function (data) {
      console.log(data);
      var update_message = data.name+' has joined the room';
      this.updates.push(data);
    },

    /** when the socket gets disconnected */ 
    disconnect: function() {
      Vue.ls.remove('client');
      console.log("disconnectss");
      window.location = window.location.href;
    },
    /** to update the chat room with the chat message */
    newmsg: function (data) {
      console.log("update");
      console.log(data.message+' sent by ' + data.user);
      this.updates.push(data);
    },

    connectedToRoom: function (msg) {
      console.log(msg);
      this.connectMessage = msg;
    }

  },
  data() {
    return {
      messages : [],
      id : '',
      updates : [],
      room_name : '',
      roomNo : '',
      client : {},
      widgetId: null,
      widgetHost: null,
      message : '',
      connectMessage : '',
      minimize : false,
      messages : [
        {
          message : 'Hi',
          author  : 'Danny',
          agent : true
        },
        {
          message : 'Heyyyyy',
          author  : 'John',
          agent : false
        },
        {
          message : 'Hey',
          author  : 'John',
          agent : false
        },
        {
          message : 'Hey',
          author  : 'John',
          agent : true
        },
      ],

    }
  },
  created() {

    console.log(Vue.ls.get('client'));

    this.widgetId = document.getElementById('tib-widget').getAttribute('data-uuid');
    this.widgetHost = document.getElementById('tib_widget').src.split(':')[0] + ':\/\/' + document.getElementById('tib_widget').src.split('/')[2];

    this.client = Vue.ls.get('client');
    console.log(this.client);
    
    this.$socket.emit('client-connected', this.client);

  },
  methods : {

    /** to add sent chat message */   
    addMessage() {

      console.log("sent");
      console.log(this.message);
      if(this.message) {
        this.$socket.emit('msg', { message: this.message, direction : 1, user: this.client.name, roomNo: this.roomNo , fromNumber : this.client.from_number, time : moment() });
      }
      this.message = '';
    },

    chatMinimize () {
      console.log("close");
      this.minimize = true;
      console.log(this.minimize);
    },
    chatMaximize () {
      console.log("open");
      this.minimize = false;
      console.log(this.minimize);
    }
  }
}
</script>

<style type="text/css">
@import "~/node_modules/bootstrap/dist/css/bootstrap.css";

  .chat-window{
    bottom: 10px;
    position: fixed;
    right: 0;
    z-index: 9;
  }
  .chat-window > div > .panel{
    border-radius: 5px 5px 0 0;
  }
  .icon_minim{
    padding:2px 10px;
  }
  .msg_container_base{
    background: #F7F8FA;
    margin: 0;
    padding: 0 10px 10px;
    max-height: 350px;
    overflow-x: hidden;
    overflow-y : auto;
    height: 350px;
  }
  .top-bar {
    background: #467FFD;
    color: #fff;
    padding: 15px 0;
    position: relative;
    overflow: hidden;
  }
  .msg_receive{
    background: #eef5f9;
    color: #333;
  }
  .msg_sent{
    margin-right:0;
    background: #467FFD;
    color: #fff;
  }
  .messages {
    padding: 14px;
    border-radius: 2px;
    max-width: 100%;
    margin: 0 10px;
    width: auto;
  }
  .messages > p {
    margin: 0;
  }
  .messages > time {
    font-size: 11px;
    color: #ccc;
  }
  .msg_container {
    padding: 10px;
    overflow: hidden;
    display: flex;
  }
  .base_sent {
    justify-content: flex-end;
    align-items: flex-end;
  }
  .msg_sent > time{
    float: right;
  }
  .msg_container_base::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
  }

  .msg_container_base::-webkit-scrollbar
  {
    width: 12px;
    background-color: #F5F5F5;
  }

  .msg_container_base::-webkit-scrollbar-thumb
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #555;
  }

  .btn-group.dropup{
    position:fixed;
    left:0px;
    bottom:0;
  }
  .detail{
    font-weight: bold;
  }
  .detail p{
    margin: 0;
    font-weight: normal;
    font-size: 12px;
  }
  .user-icon img{
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }
  .panel-footer{
    background: #fff;
    padding: 0;
    border: none;
  }
  .panel-footer .form-control{
    height: 60px;
    border: none;
    box-shadow: none;
    font-size: 14px;
    color: #333;
  }
  .panel-footer .input-group-btn button{
    background: url('assets/images/chat-sent-icon.png') no-repeat center;
    border: none;
    outline: none;
    height: 50px;
    width: 50px;
    font-size: 0;
  }
  .chat-close {
    display: block;
    text-align: right;
    width: 50px;
  }
  .chat-minimise {
    display: inline-block;
    text-align: right;
    width: 50px;
  }

</style>

