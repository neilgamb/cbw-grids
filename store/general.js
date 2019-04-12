import { dates } from '../assets/dates'

export const state = () => ({
  drawer: false,
  currentDay: 0,
  currentPeriod: 0,
  dates: dates.festDays,
  favorites: [],
  loading: false
})

export const getters = {
  drawer: state => state.drawer,
  currentDay: state => state.currentDay,
  currentPeriod: state => state.currentPeriod,
  dates: state => state.dates.filter(date => date.period === state.currentPeriod),
  favorites: state => state.favorites,
  loading: state => state.loading
}

export const actions = {
  openDrawer({ commit }) {
    commit('openDrawer')
  },
  closeDrawer({ commit }) {
    commit('closeDrawer')
  },
  setCurrentDay({ commit }, day) {
    commit('setCurrentDay', day)
  },
  setCurrentPeriod({ commit }, period) {
    commit('setCurrentPeriod', period)
  },
  setFavorites({ commit }, favorites) {
    commit('setFavorites', favorites)
  },
  enableLoader({ commit }) {
    commit('enableLoader')
  },
  disableLoader({ commit }) {
    commit('disableLoader')
  }
}

export const mutations = {
  openDrawer(state) {
    state.drawer = true
  },
  closeDrawer(state) {
    state.drawer = false
  },
  setCurrentDay(state, day) {
    state.currentDay = day
  },
  setCurrentPeriod(state, period) {
    state.currentPeriod = period
    state.currentDay = 0
  },
  setFavorites(state, favorites) {
    state.favorites = favorites
  },
  enableLoader(state) {
    state.loading = true
  },
  disableLoader(state) {
    state.loading = false
  }
}
