const auth = {
  state: {
    username: null
  },

  mutations: {
    SET_AUTH: (state, auth) => {
      state.username = auth.username
    }
  },

  actions: {
    setAuth({ commit }, auth) {
      commit('SET_AUTH', auth)
    }
  }
}

export default auth