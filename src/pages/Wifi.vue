<template>

	<div>
		<h1 class="page-title" style="text-align: center;">Wifi</h1>
		<div class="container">
			<table>
				<tr>
					<td>DHCP</td>
					<th><label class="switch" style="margin: 0 5px">
						<input v-model="model.dhcp" type="checkbox">
						<span class="slider round"></span>
					</label></th>
				</tr>

				<tr>
					<td>IP</td>
					<th><label>
						<input :disabled="model.dhcp" v-model="model.ip" required placeholder="192.168.1.xxx" type="text">
					</label></th>
				</tr>
				<tr>
					<td>DNS</td>
					<th><label>
						<input :disabled="model.dhcp" v-model="model.dns" required placeholder="192.168.1.xxx" type="text">
					</label></th>
				</tr>
				<tr>
					<td>Gateway</td>
					<th><label>
						<input :disabled="model.dhcp" v-model="model.gateway" required placeholder="192.168.1.xxx" type="text">
					</label></th>
				</tr>
				<tr>
					<td>Subnet</td>
					<th><label>
						<input :disabled="model.dhcp" v-model="model.subnet" required placeholder="255.255.255.0" type="text">
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
					dhcp: true,
					ip: "",
					dns: "",
					subnet: "",
					gateway: "",
				}
			}
		}
	}
</script>

<style scoped>

</style>