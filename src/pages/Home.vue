<template>
	<div style="display: flex; flex-direction: column; align-items: center">
		<h1 class="page-title">Home</h1>
		<div class="container" style="min-width: 33%">

			<h2 style="margin: 5px 0;">Status</h2>
			<table style="border: 1px solid black">
				<tr>
					<td class="category">Uptime:</td>
					<td colspan="2">{{ status.uptime | sec_to_human }}</td>
				</tr>

				<tr><td rowspan="5" class="category">Wifi client</td></tr>
				<tr>
					<td class="setting">Status</td>
					<td :class="[`wifi-status-${status.network.wifi_client.status}`]">{{ status.network.wifi_client.status }}</td>
				</tr>
				<tr>
					<td class="setting">Ip address</td>
					<td>{{ status.network.wifi_client.ip }}</td>
				</tr>
				<tr>
					<td class="setting">Netmask</td>
					<td>{{ status.network.wifi_client.netmask }}</td>
				</tr>
				<tr>
					<td class="setting">DNS</td>
					<td>{{ status.network.wifi_client.dns }}</td>
				</tr>

				<tr><td rowspan="2" class="category">Wifi ap</td></tr>
				<tr>
					<td class="setting">Status</td>
					<td :class="[`wifi-status-${status.network.wifi_ap.status}`]">{{ status.network.wifi_ap.status }}</td>
				</tr>

				<tr><td rowspan="3" class="category">Plugins</td></tr>
				<tr>
					<td class="setting">Count</td>
					<td>{{ status.plugins.count }}</td>
				</tr>
				<tr>
					<td class="setting">Active</td>
					<td>{{ status.plugins.active_count }}</td>
				</tr>

			</table>
		</div>

		<div class="container" style="min-width: 33%">
			<h2 style="margin: 5px 0;">Controls</h2>
			<div style="width: 100%; display:flex;">
				<button class="btn-red btn-big" @click="esp_reboot" style="flex-grow: 1">REBOOT</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Home",
		data () {
			return {
				polling: null
			}
		},
		methods: {
		},
		created () {
			this.polling = setInterval(() => {
				this.reload_status()
			}, 2000)
		}
	}
</script>

<style scoped>
	.wifi-status-connected,.wifi-status-enabled {
		color: #3db43d;
	}
	.wifi-status-disconnected {
		color: #dc872e;
	}
	.wifi-status-disabled {
		color: #929292;
	}

	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	td, th {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}

	.category {
		font-weight: bold;
		font-size: 1.15rem;
	}

	.setting {
		font-size: 1.05rem;
	}
</style>