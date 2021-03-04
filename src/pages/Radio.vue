<template>
	<div>
		<h1 class="page-title" style="text-align: center;">Radio</h1>
		<div class="container">
			<table>
				<tr v-for="radio in radios" :key="radio.key">
					<td>{{ radio.name }}</td>
					<th>
						<label v-if="radio.type === 'boolean'" class="switch" style="margin: 0 5px">
							<input :value="radio.value" v-on:input="updateValue(radio, $event.target.checked)"  type="checkbox">
							<span class="slider round"></span>
						</label>
						<label v-else >
							<input required :placeholder="radio.value" :value="config.radio[radio.key]" v-on:input="updateValue(radio, $event.target.value)" :type="radio.type">
						</label>
					</th>
					<td>{{ radio.unit }}</td>
				</tr>
			</table>
			<input type="submit" class="btn-green" @click="save_config" value="Save">
		</div>
	</div>
</template>

<script>
	export default {
		name: "Radio",
		computed: {
			radios() {
				if(this.config.radio ==null) return []
				return Object.keys(this.config.radio).map((key)=>{
					if(key.startsWith("_comment")) return
					return {
						key,
						name: this.$options.filters.capitalize(key.replaceAll("_", " ")),
						unit: this.config.radio["_comment_"+key] !== undefined ? this.config.radio["_comment_"+key] : "",
						value: this.config.radio[key],
						type: (typeof this.config.radio[key]).replace("string","text")
					}
				}).filter((x)=>{ return !!x })
			}
		},
		methods: {
			updateValue(radio,value) {
				console.log(radio.type)
				if(radio.type === "number") this.config.radio[radio.key] = Number.parseFloat(value)
				else if(radio.type === "boolean") this.config.radio[radio.key] = value
				else this.config.radio[radio.key] = value
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
