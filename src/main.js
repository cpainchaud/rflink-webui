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
