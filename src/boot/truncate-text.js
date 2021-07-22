import truncateText from '../functions/truncate-text'

export default async ({ Vue }) => {
	Vue.prototype.$truncateText = truncateText
}
