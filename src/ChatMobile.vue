<template>
	<div class="chat-mobile"> 
		<div class="container">
			<div class="col-lg-8">
	            <div class="col-sm-5 cust-pad">
	            	<form @submit.prevent="submit">
		              	<div class="form-group" :class="{ 'has-error': $v.messageText.$error }">
			             	<div class="row">
								<input  class="form-control" type="text" v-model="messageText" @blur="$v.messageText.$touch()">
								<span v-if="($v.messageText.$error)" class="help-block">
			                    Write any message.
			                   </span>
							</div>
						</div>
						<div class="form-group" >
			             	<div class="row">
								<button type="submit" class="btn btn-primary" :disabled="$v.$invalid">Send Message</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	import { required, email, minLength, requiredIf,numeric } from 'vuelidate/lib/validators'

	export default {
		data() {
			return {
				messageText : '',
			}
		},
		// Validation
		validations: {
		    messageText: {
		      required
		    },
		},
		methods: {
			/** to send the message */
			submit() {
				console.log(this.messageText);
				this.$emit('messageSent', this.messageText);
			},
		}
	}
</script>

<style>
@import "~/node_modules/bootstrap/dist/css/bootstrap.min.css";

</style>