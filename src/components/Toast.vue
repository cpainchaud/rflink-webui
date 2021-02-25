<template>
	<li :class="[`type-${type}`, { 'mb': position.includes('top'), 'mt': position.includes('bottom') }  ]" class="toast-container" role="alert">
		<div class="loading-bar" :style="{ width: percentageElapsed + '%' }" />
		<button class="close" @click="$emit('remove')">&#10060;</button>
		<p class="title">{{ type | capitalize }}</p>
		<p class="message">{{ message }}</p>
	</li>
</template>

<script>
	import ToastMixin from "vue-my-toasts/src/mixins/ToastMixin"
	import TimerMixin from "vue-my-toasts/src/mixins/TimerMixin"

	export default {
		name: 'TailwindComponent',
		mixins: [ToastMixin, TimerMixin],
		props: {
			badge: {
				type: [String, Boolean],
				required: false,
				default: false
			}
		},
		computed: {
			color() {
				switch (this.type) {
					case 'base':
						return 'blue'
					case 'warning':
						return 'orange'
					case 'error':
						return 'red'
					case 'success':
						return 'green'
					default:
						return 'blue'
				}
			}
		}
	}
</script>

<style scoped>
	.type-base { background-color: deepskyblue !important; ; }
	.type-warning { background-color: orange !important; ; }
	.type-error { background-color: crimson !important; ; }
	.type-success { background-color: springgreen !important; ; }
	.mb { margin-bottom: 16px; }
	.mt { margin-top: 16px; }
	.toast-container {
		position: relative;
		overflow: hidden;
		padding: 16px 24px;
		background-color: #aaa;
		display: flex;
		align-items: center;
		border-radius: 5px;
		cursor: pointer;
		flex-direction: column;
	}
	.toast-container > p {
		margin: 0;
	}
	.loading-bar {
		position: absolute;
		background-color: #fff6;
		bottom: 0;
		left: 0;
		height: 8px;
	}
	.message, .title {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		color: white;
	}
	.title {
		font-size: 1.5rem;
		font-weight: bold;
	}
	.close {
		position: absolute;
		top: 0;
		right: 0;
		width: 32px;
		height: 32px;
		padding: 0;
		border: 2px solid white;
		background-color: #fff;
	}
	.message {
		margin-right: 16px;
		text-align: left;
		display: flex;
	}
	.icon {
		display: block;
		opacity: 75%;
		height: 32px;
		width: 32px;
	}
	svg.bottom-middle {
		transform: rotate(90deg);
	}
	svg.top-middle {
		transform: rotate(-90deg);
	}
	svg.bottom-left {
		transform: rotate(180deg);
	}
	svg.top-left {
		transform: rotate(180deg);
	}
</style>