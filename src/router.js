import Vue from 'vue';
import Router from 'vue-router';

import Home from './pages/Home'
import Wifi from './pages/Wifi'
import Radio from './pages/Radio'
import Signal from './pages/Signal'
import Plugins from './pages/Plugins'
import Services from './pages/Services'
import Firmware from './pages/Firmware'
import Infos from './pages/Infos'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { name:"Home",        path: '/home',     component: Home },
    { name:"Wifi",        path: '/wifi',     component: Wifi },
    { name:"Radio",       path: '/radio',    component: Radio },
    { name:"Signal",      path: '/signal',   component: Signal },
    { name:"Plugins",     path: '/plugins',  component: Plugins },
    { name:"Services",    path: '/services', component: Services },
    { name:"Firmware",    path: '/firmware', component: Firmware },
    { name:"Infos",       path: '/infos', component: Infos },

    // otherwise redirect to home
    { path: '*', redirect: '/home' }
  ]
});