<template>
	<div style="display: flex; flex-direction: column; align-items: center">
		<h1 class="page-title">Home</h1>
		<div class="container" style="min-width: 33%" v-if="loaded">

			<h2 style="margin: 5px 0;">Status</h2>
			<table style="border: 1px solid black">
				<tr>
					<td class="category">Uptime:</td>
					<td v-if="status.uptime" colspan="2">{{ status.uptime | sec_to_human }}</td>
				</tr>
				
				<tr>
					<td class="category">Software Version:</td>
					<td v-if="status.sw_version" colspan="2">{{ status.sw_version }}</td>
				</tr>

				<tr><td rowspan="3" class="category">Signals</td></tr>
				<tr>
					<td class="setting">Received Count</td>
					<td v-if="status.signal.received_signal_count" :class="[`status-${status.signal.received_signal_count}`]">{{ status.signal.received_signal_count }}</td>
				</tr>
				<tr>
					<td class="setting">Successfully Decoded</td>
					<td v-if="status.signal.successfully_decoded_count" :class="[`status-${status.signal.successfully_decoded_count}`]">{{ status.signal.successfully_decoded_count }}</td>
				</tr>

				<tr><td rowspan="2" class="category">MQTT</td></tr>
				<tr>
					<td class="setting">Status</td>
					<td v-if="status.mqtt.status" :class="[`status-${status.mqtt.status}`]">{{ status.mqtt.status }}</td>
				</tr>

				<tr><td rowspan="5" class="category">Wifi Client Mode</td></tr>
				<tr>
					<td class="setting">Status</td>
					<td v-if="status.network.wifi_client" :class="[`status-${status.network.wifi_client.status}`]">{{ status.network.wifi_client.status }}</td>
				</tr>
				<tr>
					<td class="setting">IP Address</td>
					<td v-if="status.network.wifi_client">{{ status.network.wifi_client.ip }}</td>
				</tr>
				<tr>
					<td class="setting">Netmask</td>
					<td v-if="status.network.wifi_client">{{ status.network.wifi_client.netmask }}</td>
				</tr>
				<tr>
					<td class="setting">DNS</td>
					<td v-if="status.network.wifi_client">{{ status.network.wifi_client.dns }}</td>
				</tr>

				<tr><td rowspan="2" class="category">Wifi Access Point</td></tr>
				<tr>
					<td class="setting">Status</td>
					<td v-if="status.network.wifi_ap" :class="[`status-${status.network.wifi_ap.status}`]">{{ status.network.wifi_ap.status }}</td>
				</tr>

				<tr><td rowspan="3" class="category">Serial2Net</td></tr>
				<tr>
					<td class="setting">Status</td>
					<td v-if="status.serial2net.status" :class="[`status-${status.serial2net.status}`]">{{ status.serial2net.status }}</td>
				</tr>
				<tr>
					<td class="setting">Client count</td>
<!--					<td v-if="status.serial2net.clients_count" >{{ status.serial2net.clients_count }}</td>-->
				</tr>
				<!--<tr><td rowspan="3" class="category">Plugins</td></tr>
				<tr>
					<td class="setting">Count</td>
					<td v-if="status.plugins">{{ status.plugins.count }}</td>
				</tr>
				<tr>
					<td class="setting">Active</td>
					<td v-if="status.plugins">{{ status.plugins.active_count }}</td>
				</tr>-->

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
	import {api_mixin} from "../api_mixin";

	export default {
		name: "Home",
		mixins: [api_mixin],
		data () {
			return {
				polling: null
			}
		},
		computed: {
			loaded() {
				return this.status.network !== undefined && this.status.uptime !== 0
			}
		},
		methods: {
		},
		mounted () {
			this.reload_status()
			this.polling = setInterval(() => {
				this.reload_status()
			}, 10000)
		},
		beforeDestroy() {
			clearInterval(this.polling);
		}
	}
</script>

<style scoped>
	.status-connected,.status-enabled,.status-running {
		color: #3db43d;
	}
	.status-disconnected {
		color: #dc872e;
	}
	.status-disabled {
		color: #929292;
	}

	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
		border: 1px solid #dddddd;
	}

	tr {
		border: 1px solid #dddddd;
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
