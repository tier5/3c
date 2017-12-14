<template>
  <div class="chat">
    <div class="side-bar slideInRight animated">
      <h1>Get In Touch With Us</h1>
      <div class="formcontainer"> 
        <div class="formcontainer"> 
          <b> {{ connectMessage }} </b>
        </div>
        <div  v-for="update in updates"> {{update}} </div>
    		<div class="formcontainer">
          <div class="col-md-12 cust-pad">
            <div class="form-group">
              <div class="row">
                <input  class="form-control" type="text" v-model="message" @keyup.enter="addMessage">
                <button class="btn-primary" @click="addMessage">Button</button>
              </div>
            </div>
          </div>
        </div>
    	</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
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
      this.updates.push(update_message);
      
    },

    /** when the socket gets disconnected */ 
    disconnect: function() {
      window.location = window.location.href;
    },
    /** to update the chat room with the chat message */
    newmsg: function (data) {
      console.log("update");
      var update_message = data.message+' sent by ' + data.user;
      console.log(update_message);
      this.updates.push(update_message);
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
      connectMessage : ''

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
        this.$socket.emit('msg', { message: this.message, agent : false, user: this.client.name, roomNo: this.roomNo , fromNumber : this.client.from_number, widgetUuid : this.widgetId, widgetHost : this.widgetHost});
      }
      this.message = '';
  	},
  }
}
</script>

<style>
@import "~/node_modules/bootstrap/dist/css/bootstrap.css";


.side-bar {
  position: fixed;
  top: 0px;
  bottom: 0px;
  z-index: 9999;
  background: rgb(240, 240, 240) none repeat scroll 0% 0%;
  height: auto;
  width: 393px;
  padding: 10px 20px 20px;
  box-shadow: rgb(178, 178, 178) 1px 0px 20px 1px;
  color: rgb(51, 51, 51);
  text-align: center;
  overflow-y: auto;
  right: 0px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  overflow-x: hidden ;
}
.side-bar h2 {
  text-align: center;
  text-transform: capitalize;
  margin: 13px 0px 15px;
  color: rgb(94, 94, 94);
  font-weight: bold;
  font-size: 36px;
}
.side-bar h3 {
  padding-bottom: 8px;
  font-size: 27px;
  margin-bottom: 10px;
  color: #5E5E5E;
  text-align: left;
  margin-top:0;
}

.chat-window{
        bottom: 100px;
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
        
        border: none;
        outline: none;
        height: 50px;
        width: 50px;
        font-size: 0;
    }
    .chat-close a{
        display: block;
        text-align: right;
    }
    .chat-close a img{
        display: inline-block;
        text-align: right;
    }
</style>

