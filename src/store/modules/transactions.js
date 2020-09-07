import Axios from '../../utils/axios'
import router from '../../router/index'
import {serialize } from '../../utils/utils'

const baseUrl = process.env.VUE_APP_BASE_API_URL || 'https://mouka-cems.herokuapp.com/v1/api/';


export default {
  state: {
    cardTransactions: {}
  },
  getters: {
    userTransactions (state) {
         return {...state.cardTransactions}
     }
  },
  mutations: {
    UPDATE_CARD_TRANSACTIONS (state, payload) {
        state.cardTransactions = payload
    }
  }, 
  actions: {
      fetchCardTransactions: async ({commit}, query = {}) => {
          let acn = window.localStorage.getItem('acn')
          let UserId = window.localStorage.getItem('user_id')
          let url = `${baseUrl}transactions`;
          if(acn === 'admin' || acn === 'superadmin'){
              query.user_id = UserId
          }

        if(query) { 
            query = '?'+ serialize(query)
            url = `${baseUrl}transactions${query}`
        }

        Axios({
            method: 'get',
            url: url,
        }).then(res => {
                if (res.data.status == 'success') {
                    commit('UPDATE_CARD_TRANSACTIONS', res.data.data)
                }
        }).catch( err => {
            if (err.response.data.message.includes('Token has been invalidated.')) router.push({ name: 'log-in'})
            window.iziToast.show({
                message: '<div class="alert"><div class="alert__icon"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26"><g fill="none" fill-rule="evenodd"><circle cx="13" cy="13" r="13" fill="#FDAC9A"/><g transform="translate(3 3)"><circle cx="10" cy="10" r="9" fill="#FFF"/><path fill="#BF0711" d="M2 10c0-1.846.635-3.543 1.688-4.897l11.209 11.209A7.954 7.954 0 0 1 10 18c-4.411 0-8-3.589-8-8m14.312 4.897L5.103 3.688A7.954 7.954 0 0 1 10 2c4.411 0 8 3.589 8 8a7.952 7.952 0 0 1-1.688 4.897M0 10c0 5.514 4.486 10 10 10s10-4.486 10-10S15.514 0 10 0 0 4.486 0 10"/></g></g></svg></div><div class="alert__text">' + err.response.data.message + '</div></div>',
                position: 'topRight',
                color: 'red',
                progressBar: false,
            });
            
        });
      }
  }
}
