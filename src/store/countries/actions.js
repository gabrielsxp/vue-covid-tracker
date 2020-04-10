import { axiosInstance } from 'boot/axios'
import { LocalStorage } from 'quasar'

export function countriesCall ({ commit }) {
  return axiosInstance.get('countries').then((response) => {
    commit('setCountries', response.data.response)
    LocalStorage.set('countries', JSON.stringify(response.data.response))
  })
}

export function dataCall ({ commit, state }) {
  return axiosInstance
    .get('statistics', { params: { country: state.country } })
    .then((response) => {
      const data = response.data.response.shift()
      commit('setStatistics', data)
    }).catch(() => {
      this.$q.notify({
        message: 'Unable to get any information about this country ! Try another one',
        color: 'negative',
        position: 'bottom-left'
      })
    })
}
