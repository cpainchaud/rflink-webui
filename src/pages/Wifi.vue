<template>

	<div>
		<h1 class="page-title" style="text-align: center;">Wifi</h1>
		<div class="container">
			<h2 style="margin: 5px 0;">Client</h2>
			<table>
				<tr>
					<td>Active</td>
					<th><label class="switch" style="margin: 0 5px">
						<input v-model="config.wifi.client_enabled" type="checkbox">
						<span class="slider round"></span>
					</label></th>
				</tr>
				<tr>
					<td>DHCP</td>
					<th><label class="switch" style="margin: 0 5px">
						<input :disabled="!config.wifi.client_enabled" v-model="config.wifi.client_dhcp_enabled" type="checkbox">
						<span class="slider round"></span>
					</label></th>
				</tr>

				<tr>
					<td>SSID</td>
					<th><label>
						<input :disabled="!config.wifi.client_enabled" v-model="config.wifi.client_ssid" required placeholder="MonWifi" type="text">
					</label></th>
				</tr>
				<tr>
					<td>PSK</td>
					<th><label>
						<input :disabled="!config.wifi.client_enabled" v-model="config.wifi.client_password" required placeholder="***********" type="password">
					</label></th>
				</tr>
				<tr>
					<td>IP</td>
					<th><label>
						<input :disabled="config.wifi.client_dhcp_enabled || !config.wifi.client_enabled" v-model="config.wifi.client_ip" required placeholder="192.168.1.xxx" type="text">
					</label></th>
				</tr>
				<tr>
					<td>DNS</td>
					<th><label>
						<input :disabled="config.wifi.client_dhcp_enabled || !config.wifi.client_enabled" v-model="config.wifi.client_dns" required placeholder="192.168.1.xxx" type="text">
					</label></th>
				</tr>
				<tr>
					<td>Gateway</td>
					<th><label>
						<input :disabled="config.wifi.client_dhcp_enabled || !config.wifi.client_enabled" v-model="config.wifi.client_gateway" required placeholder="192.168.1.xxx" type="text">
					</label></th>
				</tr>
				<tr>
					<td>Mask</td>
					<th><label>
						<input :disabled="config.wifi.client_dhcp_enabled || !config.wifi.client_enabled" v-model="config.wifi.client_mask" required placeholder="255.255.255.0" type="text">
					</label></th>
				</tr>
			</table>
			<input type="submit" class="btn-green" @click="save_config" value="Save">
		</div>

		<div class="container">
		<h2 style="margin: 5px 0;">AP</h2>
		<table>
			<tr>
				<td>Active</td>
				<th><label class="switch" style="margin: 0 5px">
					<input v-model="config.wifi.ap_enabled" type="checkbox">
					<span class="slider round"></span>
				</label></th>
			</tr>
			<tr>
				<td>SSID</td>
				<th><label>
					<input :disabled="!config.wifi.ap_enabled" v-model="config.wifi.ap_ssid" required placeholder="MonWifi" type="text">
				</label></th>
			</tr>
			<tr>
				<td>PSK</td>
				<th><label>
					<input :disabled="!config.wifi.ap_enabled" v-model="config.wifi.ap_password" required placeholder="***********" type="password">
				</label></th>
			</tr>
			<tr>
				<td>IP</td>
				<th><label>
					<input :disabled="!config.wifi.ap_enabled" v-model="config.wifi.ap_ip" required placeholder="192.168.1.xxx" type="text">
				</label></th>
			</tr>
			<tr>
				<td>Network</td>
				<th><label>
					<input :disabled="!config.wifi.ap_enabled" v-model="config.wifi.ap_network" required placeholder="192.168.1.xxx" type="text">
				</label></th>
			</tr>
			<tr>
				<td>Mask</td>
				<th><label>
					<input :disabled="!config.wifi.ap_enabled" v-model="config.wifi.ap_mask" required placeholder="255.255.255.0" type="text">
				</label></th>
			</tr>
		</table>
		<input type="submit" class="btn-green" @click="save_config" value="Save">
	</div>
	</div>
</template>

<script>
	export default {
		name: "Wifi",
	}
</script>

<style scoped>

</style>