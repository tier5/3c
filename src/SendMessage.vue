<template>
	<div class="send-message"> 
		 <div class="formcontainer">
            <div class="col-md-12 cust-pad">
              	<div class="form-group">
	             	<div class="row">
						<input  class="form-control" type="text" v-model="messageText" @keyup.enter="send">
						<button class="btn-primary" @click="send">Button</button>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		data() {
			return {
				messageText : ''
			}
		},
		methods: {
			/** to send chat message */
			send() {
				this.$emit('messageSent',{
					'message' : this.messageText,
					'user'    : 'Admin'
				});
				this.messageText = '';
			}
		}
	}
</script>

<style type="text/css">
@import "~/node_modules/bootstrap/dist/css/bootstrap.min.css";	
</style>