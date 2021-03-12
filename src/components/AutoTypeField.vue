<template>
	<tr v-if="!hidden">
		<td>{{ configuration.name }}</td>
		<td>
			<div class="input-container" v-if="html_type_group === 'checkbox'">
				<label class="switch" style="margin: 0 5px">
					<input :disabled="disabled" :checked="configuration.value" v-on:input="porpagate_value_update($event.target.checked)"  :type="html_data_type">
					<span class="slider round"></span>
				</label>
			</div>
			<div class="input-container" v-else-if="html_type_group === 'input'">
				<input
						:disabled="disabled"
						:class="{'invalid':!is_valid}"
						:placeholder="configuration.value"
						:value="local_value"
						v-on:input="porpagate_value_update($event.target.value)"
						:type="html_data_type"
						:min="configuration.constraints.min"
						:max="configuration.constraints.max"
						:minlength="configuration.constraints.length_min"
						:maxlength="configuration.constraints.length_max"
				>
			</div>
			<div class="input-container" v-else-if="html_type_group === 'select'">
				<div v-if="html_data_type === null">
					<p>Type enum&lt;{{ configuration.type }}&gt;{{ configuration.enum }}; is not supported yet</p>
				</div>
				<select v-else :disabled="disabled" required :value="local_value" v-on:input="porpagate_value_update($event.target.value)">
					<template v-if="Array.isArray(configuration.enum)">
						<option v-for="option in configuration.enum" :key="configuration.key+'_'+option" :value="option">{{ option }}</option>
					</template>
					<template v-else>
						<option v-for="key in Object.keys(configuration.enum)" :key="configuration.key+'_'+key" :value="key">{{ configuration.enum[key] }}</option>
					</template>
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
			disabled() {
				let should_enable = true;
				for(let i=0; i<this.configuration.enabled_by.length; i++) {
					if( this.configuration.enabled_by_config[ this.configuration.enabled_by[i] ] === false ) should_enable = false;
				}

				let should_disable = false
				for(let i=0; i<this.configuration.disabled_by.length; i++) {
					if( this.configuration.disabled_by_config[ this.configuration.disabled_by[i] ] === true ) should_disable = true;
				}

				return should_disable || !should_enable;
			},
			hidden() {
				return this.configuration.hide_on_disabled && this.disabled ;
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
			html_data_type() {
				switch (this.configuration.type) {
					case "bool":
						return "checkbox"
					case "int":
					case "double":
						return "number"
					case "string":
					case "text":
					case "ipaddress":
						return "text"
					case "password":
						return "password"
				}
				return null
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