import { capitalize } from "./utils"

function defHasSubKeyKeyParm(sub_config_key, key, parm) {
	return definitions[sub_config_key][key] !== undefined && definitions[sub_config_key][key][parm] !== undefined
}

export function generateKeysMapper(config, sub_config_key, key_filter) {
	return function (key) {
		if(key_filter !== undefined && key_filter !== null && key_filter!=="" && !key.startsWith(key_filter)) return ;
		return {
			key,
			value: config[sub_config_key][key],

			name: defHasSubKeyKeyParm(sub_config_key,key,"name") ? definitions[sub_config_key][key].name : capitalize( key.replaceAll(key_filter,"").replaceAll("_", " ") ),

			type:  defHasSubKeyKeyParm(sub_config_key,key,"type") ? definitions[sub_config_key][key].type : (typeof config[sub_config_key][key]),
			enum:  defHasSubKeyKeyParm(sub_config_key,key,"enum") ? definitions[sub_config_key][key].enum : null,

			enabled_by: defHasSubKeyKeyParm(sub_config_key,key,"enabled_by") ? definitions[sub_config_key][key].enabled_by : [],
			enabled_by_config: config[sub_config_key],

			constrains: defHasSubKeyKeyParm(sub_config_key,key,"constrains") ? definitions[sub_config_key][key].constrains : {},

			comment:  defHasSubKeyKeyParm(sub_config_key,key,"unit") ? definitions[sub_config_key][key].unit : "",
		}
	}
}

function typeToConstrainsType(type) {
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
export function generateconstrainErrorsReport(config) {
	let errors = [];

	for(const sub_config_key of Object.keys(config)) {
		for(const key of Object.keys(config[sub_config_key])) {

			const value = config[sub_config_key][key]
			const type = typeToConstrainsType(definitions[sub_config_key][key].type)
			if(defHasSubKeyKeyParm(sub_config_key,key,"constrains_enabled_by")){
				let should_ignore_constrains = true;

				for (const k of definitions[sub_config_key][key].constrains_enabled_by) {
					should_ignore_constrains = should_ignore_constrains && config[sub_config_key][k]
				}

				if(!should_ignore_constrains) continue;
			}

			if(defHasSubKeyKeyParm(sub_config_key,key,"constrains")) {
				const constrains = definitions[sub_config_key][key].constrains
				if(type==="bool") continue;
				if(type==="string") {
					if(constrains.length_min !== undefined && value.length<constrains.length_min) errors.push({sub_config_key,key,failed_constrain:"length_min",value,expected:constrains.length_min})
					if(constrains.length_max !== undefined && value.length>constrains.length_max) errors.push({sub_config_key,key,failed_constrain:"length_max",value,expected:constrains.length_max})
				}
				if(type==="number") {
					if(constrains.min !== undefined && value<constrains.min) errors.push({sub_config_key,key,failed_constrain:"min",value,expected:constrains.min});
					if(constrains.max !== undefined && value>constrains.max) errors.push({sub_config_key,key,failed_constrain:"max",value,expected:constrains.max});
				}
			}
			if(type==="ipaddress") {
				if(value.match(/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/) == null) errors.push({sub_config_key,key,failed_constrain:"regex",value,expected:"XXX.XXX.XXX.XXX"})
			}

		}
	}

	return errors;
}

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
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["auth_enabled"]
        },
		auth_password: {
            type: "password",
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["auth_enabled"]
        },
	},
	mqtt: {
		enabled: {
            type: "bool",
        },
		server: {
            type: "ipaddress",
			enabled_by: ["enabled"],
			constrains_enabled_by: ["enabled"]
        },
		port: {
            type: "int",
			constrains: {
				min: 1,
				max: 320000,
			},
			enabled_by: ["enabled"],
			constrains_enabled_by: ["enabled"]
        },
		id: {
            type: "string",
			enabled_by: ["enabled"],
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["enabled"]
        },
		user: {
            type: "string",
			enabled_by: ["enabled"],
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["enabled"]
        },
		password: {
            type: "password",
			enabled_by: ["enabled"],
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["enabled"]
        },
		topic_in: {
            type: "string",
			enabled_by: ["enabled"],
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["enabled"]
        },
		topic_out: {
            type: "string",
			enabled_by: ["enabled"],
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["enabled"]
        },
		topic_lwt: {
            type: "string",
			enabled_by: ["enabled","lwt_enabled"],
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["enabled","lwt_enabled"]
        },
		lwt_enabled: {
            type: "bool",
			enabled_by: ["enabled"]
        },
	},
	wifi: {
		client_enabled: {
            type: "bool",
        },
		client_dhcp_enabled: {
            type: "bool",
			enabled_by: ["client_enabled"],
			constrains_enabled_by: ["client_enabled"]
        },
		client_ssid: {
            type: "string",
			enabled_by: ["client_enabled"],
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["client_enabled"]
        },
		client_password: {
            type: "string",
			enabled_by: ["client_enabled"],
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["client_enabled"]
        },
		client_ip: {
            type: "ipaddress",
			enabled_by: ["client_enabled","client_dhcp_enabled"],
			constrains_enabled_by: ["client_enabled","client_dhcp_enabled"]
        },
		client_mask: {
            type: "ipaddress",
			enabled_by: ["client_enabled","client_dhcp_enabled"],
			constrains_enabled_by: ["client_enabled","client_dhcp_enabled"]
        },
		client_gateway: {
            type: "ipaddress",
			enabled_by: ["client_enabled","client_dhcp_enabled"],
			constrains_enabled_by: ["client_enabled","client_dhcp_enabled"]
        },
		client_dns: {
            type: "ipaddress",
			enabled_by: ["client_enabled","client_dhcp_enabled"],
			constrains_enabled_by: ["client_enabled","client_dhcp_enabled"]
        },
		ap_enabled: {
            type: "bool",
        },
		ap_ssid: {
            type: "string",
			enabled_by: ["ap_enabled"],
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["ap_enabled"]
        },
		ap_password: {
            type: "string",
			enabled_by: ["ap_enabled"],
			constrains: {
				length_min: 1,
			},
			constrains_enabled_by: ["ap_enabled"]
        },
		ap_ip: {
            type: "ipaddress",
			enabled_by: ["ap_enabled"],
			constrains_enabled_by: ["ap_enabled"]
        },
		ap_network: {
            type: "ipaddress",
			enabled_by: ["ap_enabled"],
			constrains_enabled_by: ["ap_enabled"]
        },
		ap_mask: {
            type: "ipaddress",
			enabled_by: ["ap_enabled"],
			constrains_enabled_by: ["ap_enabled"]
        },
	},
	signal: {
		sample_rate: {
            type: "int",
			constrains: {
				min: 0,
				max: 256,
			},
        },
		min_raw_pulses: {
            type: "int",
			constrains: {
				min: 0,
				max: 291,
			},
        },
		seek_timeout: {
            type: "int",
			constrains: {
				min: 0,
			},
            unit: "ms",
        },
		min_preamble: {
            type: "int",
			constrains: {
				min: 0,
			},
            unit: "us",
        },
		min_pulse_len: {
            type: "int",
			constrains: {
				min: 0,
			},
            unit: "us",
        },
		signal_end_timeout: {
            type: "int",
			constrains: {
				min: 0,
			},
            unit: "us",
        },
		signal_repeat_time: {
            type: "int",
			constrains: {
				min: 0,
			},
            unit: "ms",
        },
		scan_high_time: {
            type: "int",
			constrains: {
				min: 0,
			},
            unit: "ms",
        },
		async_mode_enabled: {
            type: "bool",
        },
	},
	radio: {
		hardware:{
            type: "string",
            enum: ["generic", "RFM69"],
        },
		rx_data:  {
            type: "int",
			constrains: {
				min: -1,
			},
        },
		rx_vcc: {
            type: "int",
			constrains: {
				min: -1,
			},
        },
		rx_nmos: {
            type: "int",
			constrains: {
				min: -1,
			},
        },
		rx_pmos: {
            type: "int",
			constrains: {
				min: -1,
			},
        },
		rx_gnd: {
            type: "int",
			constrains: {
				min: -1,
			},
        },
		rx_na: {
            type: "int",
			constrains: {
				min: -1,
			},
        },
		tx_data:{
            type: "int",
			constrains: {
				min: -1,
			},
        },
		tx_vcc: {
            type: "int",
			constrains: {
				min: -1,
			},
        },
		tx_nmos: {
            type: "int",
			constrains: {
				min: -1,
			},
        },
		tx_pmos: {
            type: "int",
			constrains: {
				min: -1,
			},
        },
		tx_gnd: {
            type: "int",
			constrains: {
				min: -1,
			},
        },
    }
  
}
