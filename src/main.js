import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import { router } from './router';

if (process.env.NODE_ENV === "development") {
	import('./server-api-mock')
		.then((file) => {
			file.makeServer()
		});
}

Vue.use(VueRouter)
Vue.config.productionTip = false

import VueMyToasts from 'vue-my-toasts'
import 'vue-my-toasts/dist/vue-my-toasts.css'
import ToastComponent from './components/Toast'

import { capitalize } from "./utils"

Vue.filter('capitalize', capitalize)
Vue.filter('sec_to_human', function (seconds) {
	seconds = Number(seconds);
	let d = Math.floor(seconds / (3600*24));
	let h = Math.floor(seconds % (3600*24) / 3600);
	let m = Math.floor(seconds % 3600 / 60);
	let s = Math.floor(seconds % 60);

	if(h<10) h = "0"+h
	if(m<10) m = "0"+m
	if(s<10) s = "0"+s

	return d+"d "+h+":"+m+":"+s
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
