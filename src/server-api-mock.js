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

export function makeServer () {

	createServer({
		routes() {

			this.get("/api/config", () => {
				return config_data
			})

		},
	})

}