import Vue from 'vue'
import VueRouter from 'vue-router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Login from './login.vue'
import Note  from './note.vue'


Vue.use(ElementUI)
Vue.use(VueRouter)	


const routes = [{
		path : '/',
		component : Login
	},{ 
		path : '/home', 	
		component : Login 
	},{ 
		path : '/home/notes',  
		component : Note  
	},
]

const router = new VueRouter({
	// mode : 'history',
	// base : __dirname,
	routes
})


const app = new Vue({
  router
}).$mount('#app')
