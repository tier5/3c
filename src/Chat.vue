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
    getMessage: function(val){
      console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)');
      console.log("ddd");
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
    // this.$http.get('http://3c.local/api/v1/messages')
    // .then(
    //     (response) => {
    //       //console.log(response);
    //       if(response.status) {
    //         if(response.body.status) {
    //           //console.log(response.body.messages);
    //           this.messages = response.body.messages;
    //         }
    //       }
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
  },
  methods : {
  	addMessage(message) {
  		console.log("sent");
      this.$socket.emit('send', message);
      this.$socket.emit('get');

      // this.$http.post('http://3c.local/api/v1/add-message', { message: message })
      // .then(
      //     (response) => {
      //       // console.log(response);
      //       if(response.status) {
      //         if(response.body.status) {
      //           //console.log(response.body.messages);
      //         }
      //       }
      //     },
      //     (error) => {
      //       console.error(error);
      //     }
      //   );
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

