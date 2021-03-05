<template>
	<div>
		<h1 class="page-title" style="text-align: center;">Signals</h1>
		<div class="container">
			<table>
				<AutoTypeField v-for="field in fields" :key="field.key" :configuration="field" v-on:input="updateValue(field, $event)"></AutoTypeField>
			</table>
			<input type="submit" class="btn-green" @click="save_config" value="Save">
		</div>
	</div>
</template>

<script>
	import { generateKeysMapper } from "../definitons";
	import AutoTypeField from "../components/AutoTypeField";
	import {api_mixin} from "../api_mixin";

	export default {
		name: "Signal",
		components: {AutoTypeField},
		mixins: [api_mixin],
		computed: {
			fields() {
				if(this.config.signal ==null) return []
				return Object.keys(this.config.signal).map(generateKeysMapper(this.config, "signal", "" )).filter((x)=>{ return !!x })
			}
		},
		methods: {
			updateValue(signal,value) {
				this.config.signal[signal.key] = value
			}
		},
		data() {
			return {
			}
		}
	}
</script>

<style scoped>

</style>
