<template>
	<div>
		<h1 class="page-title" style="text-align: center;">Wifi</h1>
		<div class="container">
			<h2 style="margin: 5px 0;">Client</h2>
			<table>
				<AutoTypeField v-for="field in fields_client" :key="field.key" :configuration="field" v-on:input="updateValue_wifi(field, $event)"></AutoTypeField>
			</table>
			<input type="submit" class="btn-green" @click="save_config" value="Save">
		</div>
		<div class="container">
			<h2 style="margin: 5px 0;">AP</h2>
			<table>
				<AutoTypeField v-for="field in fields_ap" :key="field.key" :configuration="field" v-on:input="updateValue_wifi(field, $event)"></AutoTypeField>
			</table>
			<input type="submit" class="btn-green" @click="save_config" value="Save">
		</div>
	</div>
</template>

<script>
	import {api_mixin} from "../api_mixin";
	import AutoTypeField from "../components/AutoTypeField";
	import {generateKeysMapper, sortFunction} from "../definitons";

	export default {
		name: "Wifi",
		mixins: [api_mixin],
		components: {AutoTypeField},
		computed: {
			fields_client() {
				if(this.config.wifi ==null) return []
				return Object.keys(this.config.wifi).map(generateKeysMapper(this.config, "wifi", "client" )).filter((x)=>{ return !!x }).sort(sortFunction)
			},

			fields_ap() {
				if(this.config.wifi ==null) return []
				return Object.keys(this.config.wifi).map(generateKeysMapper(this.config, "wifi", "ap")).filter((x)=>{ return !!x }).sort(sortFunction)
			}
		},
		methods: {
			updateValue_wifi(field,value) {
				this.config.wifi[field.key] = value
			}
		},
	}
</script>

<style scoped>

</style>