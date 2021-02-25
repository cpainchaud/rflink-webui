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
				"portal": {},
				"mqtt": {},
				"wifi": {}
			}
		}
	},
	methods: {
		reload_config() {
			axios.get("/api/config").then(response => {
				this.$set(this.config,"portal",response.data.portal)
				this.$set(this.config,"mqtt",response.data.mqtt)
				this.$set(this.config,"wifi",response.data.wifi)
			})
		},
		save_config() {
			const q = this
			axios.post("/api/config").then(response => {
				if(response.data.success) {
					if(response.data.message)
						q.$toasts.push({ type: 'warning', message: response.data.message.replaceAll("\n","<br>"), duration:5000 })
					else
						q.$toasts.push({ type: 'success', message: 'Operation is a success' })
				} else {
					q.$toasts.push({ type: 'error', message: response.data.message, duration:10000 })
				}
				console.info(response)
			}).catch(function (error) {
				console.error(error)
				q.$toasts.push({ type: 'error', message: 'A network error occured while saving: '+error, duration:10000 })
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
