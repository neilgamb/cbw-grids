export const state = () => ({
  venues: [],
  events: [],
  grid: []
})

export const getters = {
  venues: state => state.venues,
  events: state => state.events,
  grid: state => state.grid.filter(gridItem => gridItem.period === state.currentPeriod && gridItem.day === state.currentDay)
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
  }
}
