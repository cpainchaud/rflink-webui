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
		"enabled": false,
		"server": "192.168.1.74",
		"port": 1883,
		"id": "ESP8266-RFLink_xxx",
		"user": "xxx",
		"password": "xxx",
		"topic_in": "/ESP00/cmd",
		"topic_out": "/ESP00/msg",
		"topic_lwt": "/ESP00/lwt",
		"lwt_enabled": true,
		"ssl_enabled": true,
		"ssl_insecure": false,
		"ca_cert": "",
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
		"client_hostname": "MyPrecious",
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
		"min_preamble": 100,
		"min_pulse_len": 50,
		"signal_end_timeout": 5000,
		"signal_repeat_time": 250,
		"scan_high_time": 50,
		"async_mode_enabled": false
	},
	"radio": {
		"hardware": "generic",
		"rx_data": 21,
		"rx_vcc": -1,
		"rx_nmos": -1,
		"rx_pmos": -1,
		"rx_gnd": -1,
		"rx_na": -1,
		"rx_reset": -1,
		"rx_cs": -1,
		"tx_data": 2,
		"tx_vcc": 4,
		"tx_nmos": -1,
		"tx_pmos": -1,
		"tx_gnd": -1
	},
	"serial2net": {
		"enabled": "true",
		"port": 1900
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
	"sw_version": "RFLink_ESP_5.1-20210312-185563",
	"_uptime_comment": "uptime in seconds",
	"mqtt": {
		"status": "connected",
		"_comment_status": "enum [disabled, connected, disconnected]"
	},
	"network": {
		"wifi_client": {
			"status": "connected",
			"_status_comment": "enum [disabled, connected, disconnected]",
			"ip": "192.168.0.40",
			"netmask": "255.255.255.0",
			"dns": "1.3.4.5"
		},
		"wifi_ap": {
			"status": "disabled",
			"_status_comment": "enum [enabled, disabled]"
		}
	},
	"signal":
	{
		"received_signal_count":24,
		"successfully_decoded_count":3
	},
	"serial2net":
	{
		"status":"running",
		"clients_count":1,
	},
	/*"plugins": {
		"count": 4,
		"active_count": 3
	}*/
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

			this.passthrough();
			this.passthrough('https://raw.githubusercontent.com/**');
		},
	})

}
