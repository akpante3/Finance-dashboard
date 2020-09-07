import router from '../../router/index'
import Axios from '../../utils/axios'
// import { saveToken } from '../../utils/utils';
import toast from '../../utils/toast';
// import NProgress from 'vue-nprogress'

const baseUrl = process.env.VUE_APP_BASE_API_URL || 'https://mouka-cems.herokuapp.com/v1/api/'

export default {
  state: {
    userDetails: '',
    logInError: false,
    tokenConfirmationError: false,
  },
  getters: {
     loggedUser (state) {
         return { ...state.userDetails }
     },
     logInError (state) {
        return state.logInError
     },
     confirmationTokenError (state) {
       return state.tokenConfirmationError
     }
  },
  mutations: {
    LOGGED_IN_USER (state, payload) {
      state.userDetails = payload
    },
    LOG_IN_ERROR (state, payload) {
      state.logInError = payload
    },
    CONFIRM_TOKEN_ERROR (state, payload) {
      state.tokenConfirmationError = payload
    }
  }, 
  actions: {
    login: async ({commit}, payload) => {
      // // commit('LOG_IN_ERROR', false )
      // console.log(process.env.VUE_APP_BASE_API_URL, 'base url ====>>>>>>>><<<>>>>>>>>')
        Axios({
            method: 'post',
            url: `${baseUrl}login`,
            data: {
                email: payload.email,
                password: payload.password
            }
        }).then(res => {
          commit('LOGGED_IN_USER', res.data )
          window.localStorage.clear();
          window.localStorage.setItem('user_id', res.data.data.id || '')
          window.localStorage.setItem('token', res.data.data.token || '')
          window.localStorage.setItem('first_name', res.data.data.first_name || '')
          window.localStorage.setItem('last_name', res.data.data.last_name || '')
          window.localStorage.setItem('role', res.data.data.role.name || '')
          window.localStorage.setItem('dept', res.data.data.dept && res.data.data.dept.name? res.data.data.dept.name : '');
          window.localStorage.setItem('acn', res.data.data.acn || '');
          return router.push({ name:'dashboard-home' })
        }).catch( err => {
          commit('LOG_IN_ERROR', true )
          let message = err.response.data.message
          if (err.response.data.message.includes('Password for this account needs to be updated')) {
            message = 'Please reset your password'
            router.push({ name: 'password-reset'})
          }
          toast.red(message)
        });
    },
    confirmToken: async ({commit}, payload) => {
      let type = payload.type
      Axios({
          method: 'put',
          url: `${baseUrl}tokens/${payload.token}`,
          data: {
              password: payload.password,
              type: type
          }
      }).then(res => {
        (res.data.status === 'success')
        router.push({ name: 'log-in'})
        toast.green('Log into your account')
      }).catch( err => {
        commit('CONFIRM_TOKEN_ERROR', true )
        toast.red(err.response.data.message)
      });
  }
  }
}
