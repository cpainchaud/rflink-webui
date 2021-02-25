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
			axios("/api/config").then(response => {
				this.$set(this.config,"portal",response.data.portal)
				this.$set(this.config,"mqtt",response.data.mqtt)
				this.$set(this.config,"wifi",response.data.wifi)
			})
		}
	},
	mounted() {
		this.reload_config();
	}
}
Vue.mixin(config_mixin);

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
