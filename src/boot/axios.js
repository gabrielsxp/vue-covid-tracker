import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://covid-193.p.rapidapi.com/',
  headers: {
    'x-rapidapi-host': 'covid-193.p.rapidapi.com',
    'x-rapidapi-key': '14f076d014mshc7457a85c23c071p1e9551jsnce32373a19f4'
  }
})

Vue.prototype.$axios = axiosInstance
export { axiosInstance }
