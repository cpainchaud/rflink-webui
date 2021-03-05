<template>
	<tr>
		<td>{{ configuration.name }}</td>
		<td>
			<div class="input-container" v-if="html_type_group === 'checkbox'">
				<label class="switch" style="margin: 0 5px">
					<input :disabled="!enabled" :checked="configuration.value" v-on:input="porpagate_value_update($event.target.checked)"  :type="html_input_type">
					<span class="slider round"></span>
				</label>
			</div>
			<div class="input-container" v-else-if="html_type_group === 'input'">
				<input :disabled="!enabled" :class="{'invalid':!is_valid}" required :placeholder="configuration.value" :value="local_value" v-on:input="porpagate_value_update($event.target.value)" :type="html_input_type">
			</div>
			<div class="input-container" v-else-if="html_type_group === 'select'">
				<select :disabled="!enabled" required :value="local_value" v-on:input="porpagate_value_update($event.target.value)">
					<option v-for="option in configuration.enum" :key="configuration.key+'_'+option" :value="option">{{ option | capitalize }}</option>
				</select>
			</div>
			<div v-else>
				<p>Type {{ configuration.type }} is not supported yet</p>
			</div>
		</td>
		<td>{{ configuration.comment }}</td>
	</tr>
</template>

<script>
	export default {
		name: "AutoTypeField",
		props: ['configuration'],
		data() {
			return {
				//value: this.configuration.value,
				local_value: this.configuration.value
			}
		},
		watch: {
			configuration: function (n) {
				this.local_value = n.value
			}
		},
		computed: {
			enabled() {
				for(let i=0; i<this.configuration.enabled_by.length; i++) {
					if( this.configuration.enabled_by_config[ this.configuration.enabled_by[i] ] === false ) return false;
				}
				return true;
			},
			is_valid() {
				switch (this.configuration.type) {
					case "bool":
						return true
					case "int":
						return !isNaN(Number.parseInt(this.local_value))
					case "double":
						return !isNaN(Number.parseFloat(this.local_value))
					case "text":
					case "password":
					case "string":
						return true
					case "ipaddress":
						return this.local_value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/) != null
				}
				return false
			},
			html_type_group() {
				if(this.configuration.enum !== null && this.configuration.enum !== undefined) return "select";
				switch (this.configuration.type) {
					case "bool":
						return "checkbox"
					case "int":
					case "double":
					case "string":
					case "text":
					case "ipaddress":
					case "password":
						return "input"
				}
				return null;
			},
			html_input_type() {
				switch (this.configuration.type) {
					case "bool":
						return "checkbox"
					case "int":
					case "double":
						return "number"
					case "text":
					case "ipaddress":
						return "text"
					case "password":
						return "password"
				}
				return "text"
			}
		},
		methods: {
			porpagate_value_update(value) {
				let new_val = value
				this.local_value = value

				if(this.configuration.type === "bool");      //nothing to do
				if(this.configuration.type === "int")        new_val = Math.round(Number.parseInt(value));
				if(this.configuration.type === "double")     new_val = Number.parseFloat(value);
				if(this.configuration.type === "ipaddress");  //nothing to do
				if(this.configuration.type === "password");  //nothing to do

				if(this.is_valid) this.$emit('input', new_val)
			}
		}
	}
</script>

<style scoped>
	.invalid {
		border-radius: 5px;
		color: rgb(199, 31, 36);
		border: 1px solid rgb(208, 42, 48);
	}
	.input-container {
		padding: 3px;
		width: 100%;
	}
</style>