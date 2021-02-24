<template>

	<div>
		<h1 class="page-title" style="text-align: center;">Wifi</h1>
		<div class="container">
			<h2 style="margin: 5px 0;">Client</h2>
			<table>
				<tr>
					<td>Active</td>
					<th><label class="switch" style="margin: 0 5px">
						<input v-model="model.client.active" type="checkbox">
						<span class="slider round"></span>
					</label></th>
				</tr>
				<tr>
					<td>DHCP</td>
					<th><label class="switch" style="margin: 0 5px">
						<input :disabled="!model.client.active" v-model="model.client.dhcp" type="checkbox">
						<span class="slider round"></span>
					</label></th>
				</tr>

				<tr>
					<td>SSID</td>
					<th><label>
						<input :disabled="!model.client.active" v-model="model.client.ssid" required placeholder="MonWifi" type="text">
					</label></th>
				</tr>
				<tr>
					<td>PSK</td>
					<th><label>
						<input :disabled="!model.client.active" v-model="model.client.password" required placeholder="***********" type="password">
					</label></th>
				</tr>
				<tr>
					<td>IP</td>
					<th><label>
						<input :disabled="model.client.dhcp || !model.client.active" v-model="model.client.ip" required placeholder="192.168.1.xxx" type="text">
					</label></th>
				</tr>
				<tr>
					<td>DNS</td>
					<th><label>
						<input :disabled="model.client.dhcp || !model.client.active" v-model="model.client.dns" required placeholder="192.168.1.xxx" type="text">
					</label></th>
				</tr>
				<tr>
					<td>Gateway</td>
					<th><label>
						<input :disabled="model.client.dhcp || !model.client.active" v-model="model.client.gateway" required placeholder="192.168.1.xxx" type="text">
					</label></th>
				</tr>
				<tr>
					<td>Subnet</td>
					<th><label>
						<input :disabled="model.client.dhcp || !model.client.active" v-model="model.client.subnet" required placeholder="255.255.255.0" type="text">
					</label></th>
				</tr>
			</table>
			<input type="submit" class="btn-green" value="Save">
		</div>

		<div class="container">
		<h2 style="margin: 5px 0;">AP</h2>
		<table>
			<tr>
				<td>Active</td>
				<th><label class="switch" style="margin: 0 5px">
					<input v-model="model.ap.active" type="checkbox">
					<span class="slider round"></span>
				</label></th>
			</tr>
			<tr>
				<td>SSID</td>
				<th><label>
					<input :disabled="!model.ap.active" v-model="model.client.ssid" required placeholder="MonWifi" type="text">
				</label></th>
			</tr>
			<tr>
				<td>PSK</td>
				<th><label>
					<input :disabled="!model.ap.active" v-model="model.client.password" required placeholder="***********" type="password">
				</label></th>
			</tr>
			<tr>
				<td>IP</td>
				<th><label>
					<input :disabled="!model.ap.active" v-model="model.client.ip" required placeholder="192.168.1.xxx" type="text">
				</label></th>
			</tr>
			<tr>
				<td>Network</td>
				<th><label>
					<input :disabled="!model.ap.active" v-model="model.client.gateway" required placeholder="192.168.1.xxx" type="text">
				</label></th>
			</tr>
			<tr>
				<td>Subnet</td>
				<th><label>
					<input :disabled="!model.ap.active" v-model="model.client.subnet" required placeholder="255.255.255.0" type="text">
				</label></th>
			</tr>
		</table>
		<input type="submit" class="btn-green" value="Save">
	</div>
	</div>
</template>

<script>
	export default {
		name: "Wifi",
		data() {
			return {
				model: {
					client: {
						active: true,
						ssid: "",
						password: "",
						dhcp: true,
						ip: "",
						dns: "",
						subnet: "",
						gateway: "",
					},
					ap: {
						active: true,
						ssid: "",
						password: "",
						ip: "",
						subnet: "",
						gateway: "",
					}
				}
			}
		}
	}
</script>

<style scoped>

</style>