<template>
  <div class="chat">
    <div class="side-bar slideInRight animated">
        <h1>Get In Touch With Us</h1>
        <div id="formcontainer"> 
          <div class="" v-for="update in updates"> {{update}} </div>
    		  <chatlog :messages="messages"></chatlog>
    		  <send-message v-on:messageSent="addMessage"></send-message> 
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
    /** to join the client to the room */
    clientConnected: function(data) {
      
      this.client = data;
      this.roomNo = data.room_number;
      console.log("connected client");
  
    },
    /**when the client does not get connected */ 
    clientNotConnected: function() {

      console.log("Client join failed");
      this.$socket.emit('disconnect' , this.roomNo);
    },

    updateRoom: function (data) {
      console.log(data);
      var update_message = data.name+' has joined the room';
      this.updates.push(update_message);
      
    },

    /** when the socket gets disconnected */ 
    disconnect: function(data) {
      window.location = window.location.href;
    },
    /** to update the chat log */
    updateChat: function (data) {
      console.log("update");
      var update_message = data.message+' sent by ' + data.user;
      console.log(update_message);
      this.updates.push(update_message);
    },
    clientAddedToRoom: function (data) {
      this.client = data;
      this.roomNo = data.room_number;
    },
    connectedToRoom: function (msg) {
      console.log(msg);
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
    }
  },
  created() {

    console.log(Vue.ls.get('client'));

    this.widgetId = document.getElementById('tib-widget').getAttribute('data-uuid');
    this.widgetHost = document.getElementById('tib_widget').src.split(':')[0] + ':\/\/' + document.getElementById('tib_widget').src.split('/')[2];

    this.client = Vue.ls.get('client');
    console.log(this.client);
    // this.$socket.emit('client-connected', this.client);

    // this.$socket.on('client-added-to-room', function (data) {
    //   this.client = data;
    //   this.roomNo = data.room_number;
    // })
    
      this.$socket.emit('client-connected', this.client);

  },
  methods : {

    /** to add sent chat message */
    
  	addMessage(message) {
  		console.log("sent");
      console.log(message);
      if(message) {
        this.$socket.emit('sendMessage', { message: message.message, user: this.client.name, roomNumber: this.roomNo , fromNumber : this.client.from_number, widgetUuid : this.widgetId, widgetHost : this.widgetHost});
      }
     
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
</style>

