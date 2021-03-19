<template>
	<div></div>
</template>

<script>
	export default {
		name: "VueTitle",
		props: ['title'],
		watch: {
			title: {
				immediate: true,
				handler() {
					document.title = this.title;
				}
			}
		},
	}
</script>

<style scoped>

</style>