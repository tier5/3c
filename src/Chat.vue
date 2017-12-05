<template>
  <div class="chat">
    <div class="side-bar slideInRight animated">
        <h1>Get In Touch With Us</h1>
        <div class="formcontainer">
    		  <chatlog :messages="messages"></chatlog>
    		  <send-message v-on:messageSent="addMessage"></send-message> 
    	  </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat',
  sockets:{
    connect: function(){
      console.log('socket connected')
    },
    /** to receive the message */
    receive: function() {
      this.$socket.emit('get');
      console.log("receive");
    },
    /** event fired on sending message to get the message*/
    getMessage: function(val){
      console.log('This method was fired by the socket server.');
      this.messages =val;
      console.log(val);
    }
  },
  data() {
    return {
      messages : []
    }
  },
  created() {
  },
  methods : {
    /** to add sent chat message */
  	addMessage(message) {
  		console.log("sent");
      /** emitting the socket instance */
      this.$socket.emit('send', message);
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

