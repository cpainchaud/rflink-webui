import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { router } from './router';

import { makeServer } from "./server-api-mock"
import axios from "axios";
import Swal from 'sweetalert2'

if (process.env.NODE_ENV === "development") {
	makeServer()
}

Vue.use(VueRouter)
Vue.config.productionTip = false

var config_mixin = {
	data: function () {
		return {
			config: {
				portal: {},
				mqtt: {},
				wifi: {},
				signal: {}
			},
			status: {
				uptime: 0,
				network: {},
				plugins: {}
			}
		}
	},
	methods: {
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
			axios.post("/api/config", this.config).then(response => {
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
	},
	mounted() {
		this.reload_config();
	}
}
Vue.mixin(config_mixin);

import VueMyToasts from 'vue-my-toasts'
import 'vue-my-toasts/dist/vue-my-toasts.css'
import ToastComponent from './components/Toast'

Vue.filter('capitalize', function (value) {
	if (!value) return ''
	value = value.toString()

	let separateWord = value.toLowerCase().split(' ');
	for (let i = 0; i < separateWord.length; i++) {
		separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
			separateWord[i].substring(1);
	}
	return separateWord.join(' ');
})
Vue.filter('sec_to_human', function (value) {
	if (!value) return ''
	return new Date(value * 1000).toISOString().substr(11, 8)
})



Vue.use(VueMyToasts, {
	component: ToastComponent,
	options: {
		width: '350px',
		position: 'top-right',
		padding: '1rem'
	}
})

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
