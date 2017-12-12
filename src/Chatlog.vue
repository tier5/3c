<template>
	<div class="chat-log"> 
		 <div class="formcontainer">
            <div class="col-md-12 cust-pad">
              	<div class="form-group">
	             	<div v-for="message in messages"> {{message}}
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		props : ['messages']
	}
</script>

<style type="text/css">
@import "~/node_modules/bootstrap/dist/css/bootstrap.min.css";	
</style>