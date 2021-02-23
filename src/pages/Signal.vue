<template>
	<div>
		<h1 class="page-title" style="text-align: center;">Signals</h1>
		<div class="container">
			<h2 style="margin: 5px 0;">OTA</h2>
			<table>
				<tr v-for="plugin in plugins" :key="plugin.key">
					<td>{{ plugin.name }}</td>
					<th><label><input required :placeholder="plugin.value" v-model="plugin.value" type="number"></label></th>
					<td>{{ plugin.unit }}</td>
				</tr>
			</table>
			<input type="submit" class="btn-green" value="Save">
		</div>
	</div>
</template>

<script>
	export default {
		name: "Signal",
		data() {
			return {
				plugins: [
					{name:"Raw buffer size",        unit: "bytes", key:"RAW_BUFFER_SIZE",        value: 292},
					{name:"Raw min pulses",         unit: "",      key:"MIN_RAW_PULSES",         value:24 },
					{name:"Signal seek timeout",    unit: "ms",    key:"SIGNAL_SEEK_TIMEOUT_MS", value:25 },
					{name:"Signal min preamble",    unit: "µs",    key:"SIGNAL_MIN_PREAMBLE_US", value:100 },
					{name:"Min pulse length",       unit: "µs",    key:"MIN_PULSE_LENGTH_US",    value:50 },
					{name:"Signal end tiemout",     unit: "µs",    key:"SIGNAL_END_TIMEOUT_US",  value:5000 },
					{name:"Signal end repeat",      unit: "ms",    key:"SIGNAL_REPEAT_TIME_MS",  value:250 },
					{name:"Scan high time",         unit: "ms",    key:"SCAN_HIGH_TIME_MS",      value:50 },
					{name:"Raw signal sample rate", unit: "",      key:"RAWSIGNAL_SAMPLE_RATE ", value:1 },
				]
			}
		}
	}
</script>

<style scoped>

</style>