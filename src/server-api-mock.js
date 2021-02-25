import { createServer } from 'miragejs'

let config_data = {
	"portal": {
		"enabled": true,
		"auth_enabled": false,
		"auth_user": "",
		"auth_password": ""
	},
	"mqtt": {
		"host": "enter a hostname here",
		"port": 1900
	},
	"wifi": {
		"client_enabled": false,
		"client_dhcp_enabled": true,
		"client_ssid": "ESPLink-AP",
		"client_password": "inputyourown",
		"client_ip": "192.168.0.200",
		"client_mask": "255.255.255.0",
		"client_gateway": "192.168.0.1",
		"client_dns": "192.168.0.1",
		"ap_enabled": true,
		"ap_ssid": "ESPLink-AP",
		"ap_password": "",
		"ap_ip": "192.168.4.1",
		"ap_network": "192.168.4.0",
		"ap_mask": "255.255.255.0"
	}
}

// eslint-disable-next-line no-unused-vars
let push_config_data_response_no_error = {
	"success": true,
	"message": null
}

// eslint-disable-next-line no-unused-vars
let push_config_data_response_warning = {
	"success": true,
	"message": "message warning 1\nmessage warning2"
}

// eslint-disable-next-line no-unused-vars
let push_config_data_response_error = {
	"success": false,
	"message": "message warning 1\nmessage error2"
}

// explanations/unites in as '_xxxx' values
let get_status_data = {
	"uptime": 3659,
	"_uptime_comment": "uptime in seconds",
	"network": {
		"wifi_client": {
			"status": "connected",
			"_status_comment": "enum [disabled, connected, disconnected]",
			"ip": "192.168.0.40",
			"netmask": "255.255.255.0",
			"dns": "1.3.4.5"
		},
		"wifi_ap": {
			"status": "enabled",
			"_status_comment": "enum [enabled, disabled]"
		}
	},
	"plugins": {
		"count": 4,
		"active_count": 3
	}
}

export function makeServer () {

	createServer({
		routes() {

			this.get("/api/config", () => {
				return config_data
			})
			
			this.get("/api/status", () => {
				return get_status_data
			})

		},
	})

}