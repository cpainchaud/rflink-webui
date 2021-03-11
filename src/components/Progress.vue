<template>
	<div class="container">
		<div class="bar" :style="style">

		</div>
	</div>
</template>

<script>
	export default {
		name: "Progress",
		props: {
			percentage: {
				required: true,
				type: Number
			},
			color: {
				type: String,
				default: "red"
			}
		},
		computed: {
			style() {
				return {
					"width": this.percentage+"%",
					"background-color": this.color,
				}
			}
		}
	}
</script>

<style scoped>
	.container {
		height: 15px;
		background-color: #e8e8e8;
		width: 100%;
		padding: 0;
		margin:0;
		border: none;
		border-radius: 5px;
	}
	.bar {
		height: 100%;
		border-radius: 5px;
		-webkit-transition: width 0.2s ease-in-out;
		-moz-transition: width 0.2s ease-in-out;
		-o-transition: width 0.2s ease-in-out;
		transition: width 0.2s ease-in-out;
	}
</style>