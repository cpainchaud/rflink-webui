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
							<input required :placeholder="signal.value" :value="signal.value" v-on:input="updateValue(signal, $event.target.value)" :type="signal.type">
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
				if(this.status.signal ==null) return []
				return Object.keys(this.status.signal).map((key)=>{
					if(key.startsWith("_comment")) return
					return {
						key,
						name: this.$options.filters.capitalize(key.replaceAll("_", " ")),
						unit: this.status.signal["_comment_"+key] !== undefined ? this.status.signal["_comment_"+key] : "",
						value: this.status.signal[key],
						type: (typeof this.status.signal[key]).replace("string","text")
					}
				}).filter((x)=>{ return !!x })
			}
		},
		methods: {
			updateValue(signal,value) {
				if(signal.type === "number") this.status.signal[signal.key] = Number.parseFloat(value)
				if(signal.type === "boolean") this.status.signal[signal.key] = value
				else this.status.signal[signal.key] = value
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
