import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store }) {
	const Router = new VueRouter({
		scrollBehavior: () => ({ x: 0, y: 0 }),
		routes,

		// Leave these as they are and change in quasar.conf.js instead!
		// quasar.conf.js -> build -> vueRouterMode
		// quasar.conf.js -> build -> publicPath
		mode: process.env.VUE_ROUTER_MODE,
		base: process.env.VUE_ROUTER_BASE
	})

	Router.beforeEach((to, from, next) => {
		if (to.meta?.acl) {
			let access_token = store.getters['persist/access_token']
			let user = store.getters['persist/user']

			checkAcl(to.meta.acl)

			if (access_token && user?.profiles?.type !== 'USER') next()
			else {
				store.dispatch('persist/SET_ACCESS_TOKEN', [''])
				store.dispatch('persist/SET_USER', [{}])
				next({name: 'login'})
			}
		}
		else next()
	})

	return Router
}

function checkAcl(acl) {
	console.log(acl)
}
