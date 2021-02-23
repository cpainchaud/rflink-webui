<template>
	<div>
		<h1 class="page-title" style="text-align: center;">Services</h1>
		<div class="container">
			<h2 style="margin: 5px 0;">Serial2Net</h2>
			<table>
				<tr>
					<td>Enabled</td>
					<th><label class="switch" style="margin: 0 5px">
						<input v-model="model.serial2net.enabled" type="checkbox">
						<span class="slider round"></span>
					</label></th>
				</tr>
			</table>
			<input type="submit" class="btn-green" value="Save">
		</div>

		<div class="container ">
			<h2 style="margin: 5px 0;">MQTT</h2>
			<div class="grid-container">
				<div class="grid-item">
					<table>
						<tr><h4 style="margin: 8px 0 0 0">Server</h4></tr>

						<tr>
							<td>Enabled</td>
							<th><label class="switch" style="margin: 0 5px">
								<input v-model="model.mqtt.enabled" type="checkbox">
								<span class="slider round"></span>
							</label></th>
						</tr>
						<tr>
							<td>Server</td>
							<th><label>
								<input v-model="model.mqtt.server"  required placeholder="192.168.1.xxx" type="text">
							</label></th>
						</tr>
						<tr>
							<td>Port</td>
							<th><label>
								<input v-model="model.mqtt.port"  required placeholder="1883" type="number">
							</label></th>
						</tr>
						<tr>
							<td>ID</td>
							<th><label>
								<input v-model="model.mqtt.id"  required placeholder="ESP8266-RFLink_xxx" type="text">
							</label></th>
						</tr>
						<tr>
							<td>User</td>
							<th><label>
								<input v-model="model.mqtt.user"  required placeholder="rflink" type="text">
							</label></th>
						</tr>
						<tr>
							<td>Password</td>
							<th><label>
								<input v-model="model.mqtt.password" required placeholder="*************" type="password">
							</label></th>
						</tr>

						<tr><h4 style="margin: 8px 0 0 0">Topics</h4></tr>

						<tr>
							<td>OUT Topic</td>
							<th><label>
								<input v-model="model.mqtt.topics.out" required placeholder="/ESP00/msg" type="text">
							</label></th>
						</tr>
						<tr>
							<td>IN Topic</td>
							<th><label>
								<input v-model="model.mqtt.topics.in" required placeholder="/ESP00/cmd" type="text">
							</label></th>
						</tr>
						<tr>
							<td>LWT Topic</td>
							<th><label>
								<input v-model="model.mqtt.topics.lwt" required placeholder="/ESP00/lwt" type="text">
							</label></th>
						</tr>
					</table>
				</div>
			</div>
			<input type="submit" class="btn-green" value="Save">
		</div>
	</div>
</template>

<script>
	export default {
		name: "Services",
		data() {
			return {
				model: {
					serial2net: {
						enabled: true
					},
					mqtt: {
						enabled: true,
						server: "",
						port: 1883,
						id: "",
						user: "",
						password: "",
						topics: {
							out: "",
							in: "",
							lwt: "",
						}
					}
				}
			}
		}
	}
</script>

<style scoped>

</style>