import { dates } from '../assets/dates'

export const state = () => ({
  drawer: false,
  currentDay: 0,
  currentPeriod: 0,
  dates: dates.festDays
})

export const getters = {
  drawer: state => state.drawer,
  currentDay: state => state.currentDay,
  currentPeriod: state => state.currentPeriod,
  dates: state => state.dates.filter(date => date.period === state.currentPeriod)
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
  }
}
