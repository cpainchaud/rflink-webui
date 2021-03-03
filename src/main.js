import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { router } from './router';

import { makeServer } from "./server-api-mock"
import axios from "axios";
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
			},
			status: {
				uptime: 0,
				network: {},
				plugins: {},
				signal: {}
			}
		}
	},
	methods: {
		reload_status() {
			axios.get("/api/status").then(response => {
				this.$set(this,"status",response.data)
			}).catch(error => {
				console.error(error)
				this.$toasts.push({ type: 'error', message: 'A network error occured while saving: '+error, duration:10000 })
			});
		},
		reload_config() {
			axios.get("/api/config").then(response => {
				this.$set(this,"config",response.data)
			}).catch(error => {
				console.error(error)
				this.$toasts.push({ type: 'error', message: 'A network error occured while saving: '+error, duration:10000 })
			});
		},
		save_config() {
			axios.post("/api/config", this.config).then(response => {
				if(response.data.success) {
					if(response.data.message)
						this.$toasts.push({ type: 'warning', message: response.data.message, duration:5000 })
					else
						this.$toasts.push({ type: 'success', message: 'Operation is a success' })
				} else {
					this.$toasts.push({ type: 'error', message: response.data.message, duration:10000 })
				}
				console.info(response)
			}).catch(error => {
				console.error(error)
				this.$toasts.push({ type: 'error', message: 'A network error occured while saving: '+error, duration:10000 })
			});
		},
		esp_reboot() {
			axios.post("/api/reboot", this.config).then(() => {
				this.$toasts.push({ type: 'success', message: 'ESP Will now reboot' })
			}).catch(error => {
				this.$toasts.push({ type: 'error', message: 'An error occured while saving: '+error, duration:10000 })
			});
		}
	},
	mounted() {
		this.reload_config();
		this.reload_status();
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
