
export const definitions = {
    "portal": {
		"enabled": {
            "type": "bool",
        },
		"auth_enabled": {
            "type": "bool",
        },
		"auth_user": {
            "type": "string",
        },
		"auth_password": {
            "type": "string",
            "hidden": true,
        },
	},
	"mqtt": {
		"enabled": {
            "type": "bool",
        },
		"server": {
            "type": "ipaddress",
        },
		"port": {
            "type": "int",
            "constraint_>": 1,
            "constraint_<": 32000,
        },
		"id": {
            "type": "string",
        },
		"user": {
            "type": "string",
        },
		"password": {
            "type": "string",
        },
		"topic_in": {
            "type": "string",
        },
		"topic_out": {
            "type": "string",
        },
		"topic_lwt": {
            "type": "string",
        },
		"lwt_enabled": {
            "type": "bool",
        },
	},
	"wifi": {
		"client_enabled": {
            "type": "bool",
        },
		"client_dhcp_enabled": {
            "type": "bool",
        },
		"client_ssid": {
            "type": "string",
        },
		"client_password": {
            "type": "string",
        },
		"client_ip": {
            "type": "ipaddress",
        },
		"client_mask": {
            "type": "ipaddress",
        },
		"client_gateway": {
            "type": "ipaddress",
        },
		"client_dns": {
            "type": "ipaddress",
        },
		"ap_enabled": {
            "type": "bool",
        },
		"ap_ssid": {
            "type": "string",
        },
		"ap_password": {
            "type": "string",
        },
		"ap_ip": {
            "type": "ipaddress",
        },
		"ap_network": {
            "type": "ipaddress",
        },
		"ap_mask": {
            "type": "ipaddress",
        },
	},
	"signal": {
		"sample_rate": {
            "type": "int",
            "constraint_>": 0,
            "constraint_<": 257,
        },
		"min_raw_pulses": {
            "type": "int",
            "constraint_>": 0,
            "constraint_<": 292,
        },
		"seek_timeout": {
            "type": "int",
            "constraint_>": 0,
            "unit": "ms",
        },
		"min_preamble": {
            "type": "int",
            "constraint_>": 0,
            "unit": "us",
        },
		"min_pulse_len": {
            "type": "int",
            "constraint_>": 0,
            "unit": "us",
        },
		"signal_end_timeout": {
            "type": "int",
            "constraint_>": 0,
            "unit": "us",
        },
		"signal_repeat_time": {
            "type": "int",
            "constraint_>": 0,
            "unit": "ms",
        },
		"scan_high_time": {
            "type": "int",
            "constraint_>": 0,
            "unit": "ms",
        },
		"async_mode_enabled": {
            "type": "bool",
        },
	},
	"radio": {
		"hardware":{
            "type": "string",
            "enum": ["generic", "rfm69"],
        },
		"rx_data":  {
            "type": "int",
            "constraint_>": -2,
        },
		"rx_vcc": {
            "type": "int",
            "constraint_>": -2,
        },
		"rx_nmos": {
            "type": "int",
            "constraint_>": -2,
        },
		"rx_pmos": {
            "type": "int",
            "constraint_>": -2,
        },
		"rx_gnd": {
            "type": "int",
            "constraint_>": -2,
        },
		"rx_na": {
            "type": "int",
            "constraint_>": -2,
        },
		"tx_data":{
            "type": "int",
            "constraint_>": -2,
        },
		"tx_vcc": {
            "type": "int",
            "constraint_>": -2,
        },
		"tx_nmos": {
            "type": "int",
            "constraint_>": -2,
        },
		"tx_pmos": {
            "type": "int",
            "constraint_>": -2,
        },
    }
  
}
