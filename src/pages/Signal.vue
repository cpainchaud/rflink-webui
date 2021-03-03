<template>
	<div>
		<h1 class="page-title" style="text-align: center;">Signals</h1>
		<div class="container">
			<table>
				<tr v-for="signal in signals" :key="signal.key">
					<td>{{ signal.name }}</td>
					<th>
						<label v-if="signal.type === 'boolean'" class="switch" style="margin: 0 5px">
							<input :value="signal.value" v-on:input="updateValue(signal, $event.target.checked)"  type="checkbox">
							<span class="slider round"></span>
						</label>
						<label v-else >
							<input required :placeholder="signal.value" :value="config.signal[signal.key]" v-on:input="updateValue(signal, $event.target.value)" :type="signal.type">
						</label>
					</th>
					<td>{{ signal.unit }}</td>
				</tr>
			</table>
			<input type="submit" class="btn-green" @click="save_config" value="Save">
		</div>
	</div>
</template>

<script>
	export default {
		name: "Signal",
		computed: {
			signals() {
				if(this.config.signal ==null) return []
				return Object.keys(this.config.signal).map((key)=>{
					if(key.startsWith("_comment")) return
					return {
						key,
						name: this.$options.filters.capitalize(key.replaceAll("_", " ")),
						unit: this.config.signal["_comment_"+key] !== undefined ? this.config.signal["_comment_"+key] : "",
						value: this.config.signal[key],
						type: (typeof this.config.signal[key]).replace("string","text")
					}
				}).filter((x)=>{ return !!x })
			}
		},
		methods: {
			updateValue(signal,value) {
				console.log(signal.type)
				if(signal.type === "number") this.config.signal[signal.key] = Number.parseFloat(value)
				else if(signal.type === "boolean") this.config.signal[signal.key] = value
				else this.config.signal[signal.key] = value
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
