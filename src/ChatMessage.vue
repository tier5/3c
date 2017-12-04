<template>
	<div> 
		<div class="chat-message">
            <div class="col-md-12 cust-pad">
            	 <div class="formcontainer">
	              	<div class="form-group">
		             	<div class="row">
		             		{{ message.message }}
						</div>
						<div class="row">
		             		{{ message.user }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		props : ['message']

	}
</script>

<style type="text/css">
@import "~/node_modules/bootstrap/dist/css/bootstrap.min.css";	
</style>