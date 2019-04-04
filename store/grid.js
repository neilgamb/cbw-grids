export const state = () => ({
  venues: [],
  events: [],
  grid: [],
  favGrid: []
})

export const getters = {
  venues: state => state.venues,
  events: state => state.events,
  grid: (state, getters, rootState) => state.grid.filter(gridItem => gridItem.period === rootState.general.currentPeriod && gridItem.day === rootState.general.currentDay),
  favGrid: (state, getters, rootState) => state.favGrid.filter(gridItem => gridItem.period === rootState.general.currentPeriod && gridItem.day === rootState.general.currentDay)
}

export const actions = {
  setVenues({ commit }, venues) {
    commit('setVenues', venues)
  },
  setEvents({ commit }, events) {
    commit('setEvents', events)
  },
  setGrid({ commit }, grid) {
    commit('setGrid', grid)
  },
  setFavGrid({ commit }, favGrid) {
    commit('setFavGrid', favGrid)
  }
}

export const mutations = {
  setVenues(state, venues) {
    state.venues = venues
  },
  setEvents(state, events) {
    state.events = events
  },
  setGrid(state, grid) {
    state.grid = grid
  },
  setFavGrid(state, favGrid) {
    state.favGrid = favGrid
  }
}
