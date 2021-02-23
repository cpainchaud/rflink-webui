<template>
	<div id="app" style="height: 100%">
		<Navigation></Navigation>
		<div style="height:calc(100vh - 64px - 10px*2); margin: 5px;" >
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
	.page-title {
		margin: 0px;
	}
	.container {
		border: 1px solid #0006;
		border-radius: 5px;

		width: calc(100% - 7px *2);

		padding: 5px;
		margin: 15px 3px;
	}
	.grid-container {
		display: grid;
		grid-template-columns: auto auto;
	}
	.grid-item {
	}

	.white {
		color: white;
	}
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
