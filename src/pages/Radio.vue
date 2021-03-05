<template>
	<div>
		<h1 class="page-title" style="text-align: center;">Radio</h1>
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
	import {api_mixin} from "../api_mixin";
	import AutoTypeField from "../components/AutoTypeField";

	export default {
		name: "Radio",
		mixins: [api_mixin],
		components: {AutoTypeField},
		computed: {
			fields() {
				if(this.config.radio ==null) return []
				return Object.keys(this.config.radio).map(generateKeysMapper(this.config, "radio")).filter((x)=>{ return !!x })
			}
		},
		methods: {
			updateValue(field,value) {
				this.config.radio[field.key] = value
			}
		},
	}
</script>

<style scoped>

</style>
