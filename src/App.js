import { LocalStorage } from 'quasar'

export default {
  name: 'App',
  preFetch ({ store }) {
    if (!LocalStorage.has('countries')) {
      store.dispatch('countries/countriesCall')
    } else {
      const countries = LocalStorage.getItem('countries')
      store.commit('countries/setCountries', JSON.parse(countries))
    }
  }
}
