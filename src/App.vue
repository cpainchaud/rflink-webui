<template>
	<div id="app" style="height: 100%">
		<Navigation></Navigation>
		<div style="height:calc(100vh - 64px - 10px*2); margin: 10px;" >
			<router-view></router-view>
		</div>
	</div>
</template>

<script>

	import Navigation from "./components/Navigation";
	export default {
		name: 'App',
		components: {
			Navigation
		}
	}
</script>

<style>
	.white {
		color: white;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
