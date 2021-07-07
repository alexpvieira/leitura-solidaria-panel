import jwtDecode from '../functions/jwt-decode'

export default async ({Vue}) => {
  Vue.prototype.$jwtDecode = jwtDecode
}
