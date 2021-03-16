import axios from "axios";
import Swal from "sweetalert2";

import { capitalize } from "./utils"
import { generateConstraintErrorsReport } from "./definitons"

export const api_mixin = {
	data: function () {
		return {
			config: {
				portal: {},
				mqtt: {},
				wifi: {},
				signal: {},
				radio: {},
				serial2net: {},
			},
			status: {
				uptime: 0,
				network: {},
				plugins: {}
			}
		}
	},
	mounted() {
		this.reload_config();
		this.$root.$on('reload_btn', this.reloadevent_handler)
	},
	unmounted() {
		this.$root.$off('reload_btn', this.reloadevent_handler)
	},
	methods: {
		reloadevent_handler() {
			this.config = {
				portal: {},
				mqtt: {},
				wifi: {},
				signal: {},
				radio: {}
			}
			this.reload_config();
			this.reload_status();
		},
		reload_status() {
			axios.get("/api/status").then(response => {
				this.$set(this,"status",response.data)
			}).catch(error => {
				console.error(error)
				this.$toasts.push({ type: 'error', message: 'A network error occured while fetching status: '+error, duration:10000 })
			});
		},
		reload_config() {
			axios.get("/api/config").then(response => {
				this.$set(this,"config",response.data)
			}).catch(error => {
				console.error(error)
				this.$toasts.push({ type: 'error', message: 'A network error occured while fetching config: '+error, duration:10000 })
			});
		},
		save_config() {
			const errors = generateConstraintErrorsReport(this.config)
			if(errors.length>0) {
				let list="<ul>"
				for(const error of errors) {
					list+=`<li><b>${capitalize(error.sub_config_key)} ${capitalize(error.key.replaceAll("_"," "))}</b> failed ${error.failed_constraint} constraint, value is <b>"${error.value}"</b> constraint expected <b>${error.expected}</b></li>`
				}
				list+="</ul>"


				Swal.fire({
					title: 'Error!',
					html: "It seems that there are errors in the configuration, make sure you correct them before updating the configuration.<br><br>"+list+"<br>If you think it's a bug feel free to report it on github",
					icon: 'error',
					confirmButtonText: 'Continue'
				})

				return;
			}
			axios.post("/api/config", this.config).then(response => {
				this.reload_config();
				if(response.data.success) {
					if(response.data.message) {
						Swal.fire({
							title: 'Warning!',
							html: response.data.message,
							icon: 'warning',
							confirmButtonText: 'Continue'
						})
						//this.$toasts.push({ type: 'warning', message: response.data.message, duration:5000 })
					} else {
						Swal.fire({
							title: 'Success!',
							html: 'Operation is a success',
							icon: 'success',
							confirmButtonText: 'Ok'
						})
						//this.$toasts.push({ type: 'success', message: 'Operation is a success' })
					}
				} else {
					Swal.fire({
						title: 'Error!',
						html: response.data.message,
						icon: 'error',
						confirmButtonText: 'Continue'
					})
					//this.$toasts.push({ type: 'error', message: response.data.message, duration:10000 })
				}
				console.info(response)
			}).catch(error => {
				console.error(error)
				Swal.fire({
					title: 'Error!',
					html: 'A network error occured while saving: '+error,
					icon: 'error',
					confirmButtonText: 'Continue'
				})
				//this.$toasts.push({ type: 'error', message: 'A network error occured while saving: '+error, duration:10000 })
			});
		},
		esp_reboot() {
			axios.post("/api/reboot", this.config).then(() => {
				Swal.fire({
					title: 'Success!',
					html: 'ESP Will now reboot',
					icon: 'success',
					confirmButtonText: 'Ok'
				})
				//this.$toasts.push({ type: 'success', message: 'ESP Will now reboot' })
			}).catch(error => {
				Swal.fire({
					title: 'Error!',
					html: 'A network error occured while saving: '+error,
					icon: 'error',
					confirmButtonText: 'Continue'
				})
				//this.$toasts.push({ type: 'error', message: 'A network error occured while asking for a reboot: '+error, duration:10000 })
			});
		}
	}
}