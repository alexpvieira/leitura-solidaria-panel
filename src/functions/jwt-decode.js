import store from '../store'
import jwt_decode from 'jwt-decode'

export default function jwtDecode() {
    let token = store.getters['persist/access_token']

    if (token !== '') return jwt_decode(store.getters['persist/access_token']).sub
    else return {}
}