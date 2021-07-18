import axios from 'axios'

export default async ({ router, store, Vue }) => {
	Vue.prototype.$axios = axios

	axios.defaults.baseURL = process.env.API_URL
	axios.defaults.timeout = 0

	axios.interceptors.request.use((config) => {
		if (config.url.includes('login')) {
			config.headers['content-type'] = 'application/json'
		}
		else {
			config.headers['content-type'] = 'application/json'
			config.headers['authorization'] = `Bearer ${store.getters['persist/access_token']}`
		}

		return config
	},

		(error) => {
			return Promise.reject(error)
		}
	)

	axios.interceptors.response.use(undefined, err => {
		const { config, response: { status } } = err

		if (status === 403) {
			store.dispatch('persist/SET_ACCESS_TOKEN', [''])
			store.dispatch('persist/SET_USER', [{}])
			router.replace({ name: 'login' })
		}
	
		return Promise.reject(err)
	})
}
