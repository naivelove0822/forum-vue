import Vue from 'vue'
import Vuex from 'vuex'
import userAPI from './../apis/users'
Vue.use(Vuex)

export default new Vuex.Store({
  // 與data屬性類似，但可用在全域
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  // 修改data用的函式透過commit使用
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication (state) {
      state.currentUser = {}
      state.isAuthenticated = false
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  // 設定其他函式，EX:API請求，透過dispatch使用
  // 為了使用mutations傳入參數commit
  actions: {
    async fetchCurrentUser ({ commit }) {
      try {
        const { data } = await userAPI.getCurrentUser()
        // 放入state中CurrentUser資料
        const { id, name, email, image, isAdmin } = data

        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })
        return true
      } catch(error) {
        console.log('error', error)
        console.error('can n  ot fetch user infromation')
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
