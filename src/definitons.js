import { capitalize } from "./utils"

/**
 * Check if the definitions object contain a specific parameter
 * @function
 * @param {String} sub_config_key - Name of the module
 * @param {String} key - Name of the parameter
 * @param {String} parm - Name of the setting (constraint for example)
 * @return {boolean} True if the parameter exists
 */
function defHasSubKeyKeyParm(sub_config_key, key, parm) {
	return definitions[sub_config_key] !== undefined && definitions[sub_config_key][key] !== undefined && definitions[sub_config_key][key][parm] !== undefined
}

function defGuessType(variable) {
	switch (typeof variable) {
		case "number":
			return "number"
		case "boolean":
			return "bool"
		default:
			return "string"
	}
}

/**
 * Generate an map function for converting api data to the AutoTypeField fields
 * @function
 * @param {Object} config - Tue global config from the api
 * @param {String} sub_config_key - The module name
 * @param {String} key_filter - if present all keys that doesn't starts with this string will ignored
 * @return {function} The function to be used in .map()
 */
export function generateKeysMapper(config, sub_config_key, key_filter) {
	return function (key) {
		if(key_filter !== undefined && key_filter !== null && key_filter!=="" && !key.startsWith(key_filter)) return ;
		return {
			key,
			value: config[sub_config_key][key],

			name: defHasSubKeyKeyParm(sub_config_key,key,"name") ? definitions[sub_config_key][key].name : capitalize( key.replaceAll(key_filter,"").replaceAll("_", " ") ),

			type:  defHasSubKeyKeyParm(sub_config_key,key,"type") ? definitions[sub_config_key][key].type : defGuessType(config[sub_config_key][key]),
			enum:  defHasSubKeyKeyParm(sub_config_key,key,"enum") ? definitions[sub_config_key][key].enum : null,

			enabled_by: defHasSubKeyKeyParm(sub_config_key,key,"enabled_by") ? definitions[sub_config_key][key].enabled_by : [],
			enabled_by_config: config[sub_config_key],
			disabled_by: defHasSubKeyKeyParm(sub_config_key,key,"disabled_by") ? definitions[sub_config_key][key].disabled_by : [],
			disabled_by_config: config[sub_config_key],
			hide_on_disabled: defHasSubKeyKeyParm(sub_config_key,key,"hide_on_disabled") ? definitions[sub_config_key][key].hide_on_disabled : false,

			constraints: defHasSubKeyKeyParm(sub_config_key,key,"constraints") ? definitions[sub_config_key][key].constraints : {},

			comment:  defHasSubKeyKeyParm(sub_config_key,key,"unit") ? definitions[sub_config_key][key].unit : "",

			order:  defHasSubKeyKeyParm(sub_config_key,key,"order") ? definitions[sub_config_key][key].order : Infinity,

			warning_message:  defHasSubKeyKeyParm(sub_config_key,key,"warning_message") ? definitions[sub_config_key][key].warning_message : "",
			notice_message:  defHasSubKeyKeyParm(sub_config_key,key,"notice_message") ? definitions[sub_config_key][key].notice_message : "",

		}
	}
}

/**
 * Sort function for the settings
 * @function
 * @param {Object} a - The first object
 * @param {Object} b - The second object
 * @return {number} The result
 */
export function sortFunction(a, b) {
	const orderA = (a.order !== undefined && a.order !== null) ? a.order : Infinity
	const orderB = (b.order !== undefined && b.order !== null) ? b.order : Infinity
	if(orderA>orderB) return 1;
	if(orderA<orderB) return -1;
	if(orderA===orderB) return 0;
}

/**
 * Convert a specific type to a more global typ for the constraints (eg password is a string)
 * @function
 * @param {String} type - Type provided in the definitions object
 * @return {String} type - The converted type
 */
function typeToconstraintsType(type) {
	switch (type) {
		case "bool":
			return "bool"
		case "int":
		case "double":
			return "number"
		case "ipaddress":
			return "ipaddress"
		case "string":
		case "text":
		case "password":
			return "string"
	}
	return "string";
}
/**
 * Genereates an arrays containing all the errors detected and what was the issue
 * @function
 * @param {Object} config - The configuration to check
 * @return {Array} True if the parameter exists
 */
export function generateConstraintErrorsReport(config) {
	let errors = [];

	for(const sub_config_key of Object.keys(config)) {
		for(const key of Object.keys(config[sub_config_key])) {

			const value = config[sub_config_key][key]
			const type = typeToconstraintsType(defHasSubKeyKeyParm(sub_config_key,key,"type") ? definitions[sub_config_key][key].type : defGuessType(config[sub_config_key][key]))
			if(defHasSubKeyKeyParm(sub_config_key,key,"constraints_enabled_by")){
				let should_ignore_constraints = true;

				for (const k of definitions[sub_config_key][key].constraints_enabled_by) {
					should_ignore_constraints = should_ignore_constraints && config[sub_config_key][k]
				}

				if(!should_ignore_constraints) continue;
			}

			if(defHasSubKeyKeyParm(sub_config_key,key,"constraints")) {
				const constraints = definitions[sub_config_key][key].constraints
				if(type==="bool") continue;
				if(type==="string") {
					if(constraints.length_min !== undefined && value.length<constraints.length_min) errors.push({sub_config_key,key,failed_constraint:"length_min",value,expected:constraints.length_min})
					if(constraints.length_max !== undefined && value.length>constraints.length_max) errors.push({sub_config_key,key,failed_constraint:"length_max",value,expected:constraints.length_max})
				}
				if(type==="number") {
					if(constraints.min !== undefined && value<constraints.min) errors.push({sub_config_key,key,failed_constraint:"min",value,expected:constraints.min});
					if(constraints.max !== undefined && value>constraints.max) errors.push({sub_config_key,key,failed_constraint:"max",value,expected:constraints.max});
				}
			}
			if(type==="ipaddress") {
				if(value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/) == null) errors.push({sub_config_key,key,failed_constraint:"regex",value,expected:"XXX.XXX.XXX.XXX"})
			}

		}
	}

	return errors;
}

/*
The definitions object is composed of multiple module configurations (known as sub_config_key in the code),
Each module contains multiple parameter (known as key in the code).
Each parameter is a object containing (* are required):
  - type*                 : It's type which can be: bool,string,int,password,ipaddress (If not present the code will either select number or text)
  - name                  : The field can be used to override the auto generated name (Which is the key with space instead of underscore and capitalized)
  - enum                  : The field will become a select. the field can either be:
        - an array   : In which case it is displayed as is in the select
        - an object  : In which case the select will treat the keys as values and the values as the text
  - enabled_by            : This field controls if the field is disabled. It should be an array that contain the name of
                            other bool keys in the same module that are ANDed together to determine if it is enabled
  - disabled_by           : This field controls if the field should be disabled It should be an array that contain the name of
                            other bool keys in the same module that are ORed together to determine if it should be disabled
                  !!!!!!!!  disabled_by bypasses enabled_by  !!!!!!!!!!
  - hide_on_disabled      : Hide the field completely if it is disabled
  - constraints_enabled_by : This field controls if the constraints or type specific validation should be enabled. Works on the same principle as enabled_by
  - constraints            : This is an object defining the specific constraints for a parameter. It can contain the following
        - length_min           : Only applied when the type is a string/password. Minimum string length
        - length_max           : Only applied when the type is a string/password. Maximum string length
        - min                  : Only applied when the type is a number. Minimum value
        - max                  : Only applied when the type is a number. Maximum value
  - order                  : The field control in which order the info will be displayed. THis is per category
  - warning_message        : Displays a warning sign with a message on hover️
  - notice_message         : Displays a info sign with a message on hover️
 */
export const definitions = {
	portal: {
		enabled: {
			type: "bool",
		},
		auth_enabled: {
			type: "bool",
		},
		auth_user: {
			type: "string",
			constraints: {
				length_min: 1,
			},
			constraints_enabled_by: ["auth_enabled"]
		},
		auth_password: {
			type: "password",
			constraints: {
				length_min: 1,
			},
			constraints_enabled_by: ["auth_enabled"]
		},
	},
	mqtt: {
		enabled: {
			type: "bool",
			order: 0,
		},
		server: {
			type: "string",
			enabled_by: ["enabled"],
			constraints_enabled_by: ["enabled"],
			constraints: {
				length_min: 1,
			},
			order: 1,
		},
		port: {
			type: "int",
			constraints: {
				min: 1,
				max: 32000,
			},
			enabled_by: ["enabled"],
			constraints_enabled_by: ["enabled"],
			order: 2,
		},
		id: {
			type: "string",
			enabled_by: ["enabled"],
			constraints: {
				length_min: 1,
			},
			constraints_enabled_by: ["enabled"],
			order: 3,
		},
		user: {
			type: "string",
			enabled_by: ["enabled"],
			constraints: {
			},
			constraints_enabled_by: ["enabled"],
			order: 4,
		},
		password: {
			type: "password",
			enabled_by: ["enabled"],
			constraints: {
			},
			constraints_enabled_by: ["enabled"],
			order: 5,
		},
		topic_in: {
			type: "string",
			enabled_by: ["enabled"],
			constraints: {
				length_min: 1,
			},
			constraints_enabled_by: ["enabled"],
			order: 6,
		},
		topic_out: {
			type: "string",
			enabled_by: ["enabled"],
			constraints: {
				length_min: 1,
			},
			constraints_enabled_by: ["enabled"],
			order: 7,
		},
		topic_lwt: {
			name: "Topic LWT",
			type: "string",
			enabled_by: ["enabled", "lwt_enabled"],
			constraints: {
				length_min: 1,
			},
			constraints_enabled_by: ["enabled", "lwt_enabled"],
			order: 8,
		},
		lwt_enabled: {
			name: "LWT Enabled",
			type: "bool",
			enabled_by: ["enabled"],
			order: 9,
		},
		ssl_enabled: {
			type: "bool",
			enabled_by: ["enabled"],
			order: 10,
		},
		ssl_insecure: {
			type: "bool",
			enabled_by: ["enabled","ssl_enabled"],
			order: 11,
		},
		ca_cert: {
			type: "bool",
			enabled_by: ["enabled","ssl_enabled"],
			order: 12,
		},
	},
	wifi: {
		client_enabled: {
			type: "bool",
			order: 0,
		},
		client_dhcp_enabled: {
			type: "bool",
			enabled_by: ["client_enabled"],
			constraints_enabled_by: ["client_enabled"],
			order: 1,
		},
		client_ssid: {
			type: "string",
			enabled_by: ["client_enabled"],
			constraints: {
				length_min: 1,
			},
			constraints_enabled_by: ["client_enabled"],
			order: 2,
		},
		client_password: {
			type: "password",
			enabled_by: ["client_enabled"],
			constraints_enabled_by: ["client_enabled"],
			order: 3,
		},
		client_ip: {
			type: "ipaddress",
			enabled_by: ["client_enabled"],
			disabled_by: ["client_dhcp_enabled"],
			constraints_enabled_by: ["client_enabled", "client_dhcp_enabled"],
			hide_on_disabled: true,
			order: 4,
		},
		client_mask: {
			type: "ipaddress",
			enabled_by: ["client_enabled"],
			disabled_by: ["client_dhcp_enabled"],
			constraints_enabled_by: ["client_enabled", "client_dhcp_enabled"],
			hide_on_disabled: true,
			order: 5,
		},
		client_gateway: {
			type: "ipaddress",
			enabled_by: ["client_enabled"],
			disabled_by: ["client_dhcp_enabled"],
			constraints_enabled_by: ["client_enabled", "client_dhcp_enabled"],
			hide_on_disabled: true,
			order: 6,
		},
		client_dns: {
			type: "ipaddress",
			enabled_by: ["client_enabled"],
			disabled_by: ["client_dhcp_enabled"],
			constraints_enabled_by: ["client_enabled", "client_dhcp_enabled"],
			hide_on_disabled: true,
			order: 7,
		},
		client_hostname: {
			type: "string",
			enabled_by: ["client_enabled"],
			constraints: {
				length_min: 1,
			},
			constraints_enabled_by: ["client_enabled"],
			order: 8,
		},
		ap_enabled: {
			type: "bool",
			order: 8,
		},
		ap_ssid: {
			type: "string",
			enabled_by: ["ap_enabled"],
			constraints: {
				length_min: 1,
			},
			constraints_enabled_by: ["ap_enabled"],
			order: 9,
		},
		ap_password: {
			type: "password",
			enabled_by: ["ap_enabled"],
			constraints_enabled_by: ["ap_enabled"],
			order: 10,
		},
		ap_ip: {
			type: "ipaddress",
			enabled_by: ["ap_enabled"],
			constraints_enabled_by: ["ap_enabled"],
			order: 11,
		},
		ap_network: {
			type: "ipaddress",
			enabled_by: ["ap_enabled"],
			constraints_enabled_by: ["ap_enabled"],
			order: 12,
		},
		ap_mask: {
			type: "ipaddress",
			enabled_by: ["ap_enabled"],
			constraints_enabled_by: ["ap_enabled"],
			order: 13,
		},
	},
	signal: {
		sample_rate: {
			type: "int",
			constraints: {
				min: 0,
				max: 256,
			},
			order: 1,
		},
		min_raw_pulses: {
			type: "int",
			constraints: {
				min: 0,
				max: 291,
			},
			order: 2,
		},
		seek_timeout: {
			type: "int",
			constraints: {
				min: 0,
			},
			unit: "ms",
			order: 3,
		},
		min_preamble: {
			type: "int",
			constraints: {
				min: 0,
			},
			unit: "us",
			order: 4,
		},
		min_pulse_len: {
			type: "int",
			constraints: {
				min: 0,
			},
			unit: "us",
			order: 5,
		},
		signal_end_timeout: {
			type: "int",
			constraints: {
				min: 0,
			},
			unit: "us",
			order: 6,
		},
		signal_repeat_time: {
			type: "int",
			constraints: {
				min: 0,
			},
			unit: "ms",
			order: 7,
		},
		scan_high_time: {
			type: "int",
			constraints: {
				min: 0,
			},
			unit: "ms",
			order: 8,
		},
		async_mode_enabled: {
			type: "bool",
			order: 9,
		},
	},
	radio: {
		hardware: {
			type: "string",
			enum: {"generic":"Generic", "RFM69CW":"RFM69CW", "RFM69HCW":"RFM69HCW", "SX1276":"SX1276", "SX1278":"SX1278"},
			order: 0,
		},
		rx_data: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 1,
		},
		rx_vcc: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 2,
		},
		rx_nmos: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 3,
		},
		rx_pmos: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 4,
		},
		rx_gnd: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 5,
		},
		rx_na: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 6,
		},
		rx_reset: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 6,
		},
		rx_cs: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 6,
		},
		tx_data: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 7,
		},
		tx_vcc: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 8,
		},
		tx_nmos: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 9,
		},
		tx_pmos: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 10,
		},
		tx_gnd: {
			type: "int",
			constraints: {
				min: -1,
			},
			order: 11,
		},
	},
	serial2net: {
		enabled: {
			type: "bool",
			order: 0,
		},
		port: {
			type: "int",
			constraints: {
				min: 1,
				max: 32000,
			},
			enabled_by: ["enabled"],
			constraints_enabled_by: ["enabled"],
			order: 1,
		},
	},

}
