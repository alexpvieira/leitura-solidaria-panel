import qs from 'qs'

export default async ({ Vue }) => {
	Vue.prototype.$qs = qs
}
