
import axios from 'axios'
const actions = {
    setMenu: ({ commit }, menuData) => {
      return commit('SET_MENU', menuData)
    },
    setSingOut:(({commit})=>{
      return new Promise((resolve, reject) => {
        commit('SET_SIGN_OUT')
        axios.defaults.headers['Token'] = ''
        resolve(true)
      })
    })
  }
  
  export default actions
  