import validateCnpj from '../functions/validate-cnpj'

export default async ({Vue}) => {
  Vue.prototype.$validateCnpj = validateCnpj
}
