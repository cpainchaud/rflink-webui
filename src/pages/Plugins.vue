<template>
	<div>
		<h1 class="page-title" style="text-align: center;">Plugins</h1>
		<div class="container">
			<input type="submit" class="btn-green" value="Save">
			<table>
				<tr v-for="plugin in plugins" :key="plugin.key">
					<td>{{ plugin.name }}</td>
					<th><label class="switch" style="margin: 0 5px">
						<input v-model="plugin.enabled" type="checkbox">
						<span class="slider round"></span>
					</label></th>
				</tr>
			</table>
			<input type="submit" class="btn-green" value="Save">
		</div>
	</div>
</template>

<script>
	import {api_mixin} from "../api_mixin";

	export default {
		name: "Plugins",
		mixins: [api_mixin],
		data() {
			return {
				plugins: [
					{name:"Plugin A", key:"azerty", enabled:true},
					{name:"Plugin B", key:"qwerty", enabled:false},
					{name:"Plugin C", key:"abcdef", enabled:true},
					{name:"Plugin D", key:"aqwzsx", enabled:false},
					{name:"Plugin F", key:"qsdfgh", enabled:false},
				]
			}
		}
	}
</script>

<style scoped>

</style>