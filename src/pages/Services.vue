<template>
	<div>
		<h1 class="page-title" style="text-align: center;">Signals</h1>
		<div class="container">
			<h2 style="margin: 5px 0;">MQTT</h2>
			<table>
				<AutoTypeField v-for="field in fields_mqtt" :key="field.key" :configuration="field" v-on:input="updateValue_mqtt(field, $event)"></AutoTypeField>
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
		name: "Services",
		mixins: [api_mixin],
		components: {AutoTypeField},
		computed: {
			fields_mqtt() {
				if(this.config.mqtt ==null) return []
				return Object.keys(this.config.mqtt).map(generateKeysMapper(this.config, "mqtt", "")).filter((x)=>{ return !!x }).sort(sortFunction)
			}
		},
		methods: {
			updateValue_mqtt(field,value) {
				this.config.mqtt[field.key] = value
			}
		},
	}
</script>

<style scoped>

</style>
