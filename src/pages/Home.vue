<template>
	<div>
		Home
		<button @click="test">TEST</button>
	</div>
</template>

<script>
	export default {
		name: "Home",
		methods: {
			test() {
				this.$toasts.push({
					type: 'warning',
					message: 'This is definitely my favorite toasts plugin.'
					// Any other parameter...
				})
			}
		}
	}
</script>

<style scoped>

</style>