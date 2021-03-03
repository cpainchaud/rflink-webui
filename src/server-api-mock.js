// eslint-disable-next-line no-unused-vars
import { createServer,Response  } from 'miragejs'

const startTime = Date.now()
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
	},
	"signal": {
		"sample_rate": 1,
		"min_raw_pulses": 24,
		"seek_timeout": 25,
		"_comment_seek_timeout": "millisecond",
		"min_preamble": 100,
		"_comment_min_preamble": "microsecond",
		"min_pulse_len": 50,
		"_comment_min_pulse_len": "microsecond",
		"signal_end_timeout": 5000,
		"_comment_signal_end_timeout": "microsecond",
		"signal_repeat_time": 250,
		"_comment_signal_repeat_time": "millisecond",
		"scan_high_time": 50,
		"_comment_scan_high_time": "millisecond",
		"async_mode_enabled": false
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
	"uptime": 1200,
	"_uptime_comment": "uptime in seconds",
	"network": {
		"wifi_client": {
			"status": "disconnected",
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

			this.post("/api/config", (schema, request) => {
				let attrs = JSON.parse(request.requestBody)
				config_data = attrs
				return push_config_data_response_no_error
			})
			
			this.get("/api/status", () => {
				get_status_data.uptime = (Date.now() - startTime) / 1000
				return get_status_data
				//return new Response(404, { some: 'header' }, { errors: [ 'Not found'] });
			})

		},
	})

}
