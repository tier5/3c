<template>
	<div> 
		 <div class="formcontainer">
            <div class="col-md-12 cust-pad">
              	<div class="form-group">
	             	<div class="row">
						<input  class="form-control" type="text" v-model="message" @keyup.enter="send">
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
				message : ''
			}
		},

		methods: {
			send() {
				console.log("here"+ this.message);
				this.$emit('messagesent',{
					'message' : this.message,
					'author'  : 'Admin'
				});
				this.message = '';
			}
		}
	}
</script>

<style type="text/css">
@import "~/node_modules/bootstrap/dist/css/bootstrap.min.css";	
</style>