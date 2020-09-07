import Axios from '../../utils/axios'
import router from '../../router/index'
// import {getUserDetails } from '../../utils/utils'


const baseUrl = process.env.VUE_APP_BASE_API_URL || 'https://mouka-cems.herokuapp.com/v1/api/';


export default {
  state: {
    cardDetails: {},
  },
  getters: {
     userCard (state) {
        return {...state.cardDetails}
     }
  },
  mutations: {
    UPDATE_CARD_DETAILS (state, payload) {
        state.cardDetails = payload
    }
  }, 
  actions: {
      fetchUserCard: async ({commit}) => {
          let acn = window.localStorage.getItem('acn');
          let UserId = window.localStorage.getItem('user_id');
          let url;
          if(acn === 'admin' || acn === 'superadmin'){
              console.log(acn)
              url = `${baseUrl}usercards?user_id=${UserId}`
          }
          else{
              url = `${baseUrl}usercards`;
          }

        Axios({
            method: 'get',
            url: url,
        }).then(res => {
            if (res.data.status === 'success') {
                commit('UPDATE_CARD_DETAILS', res.data.data)
            }
        }).catch( err => {
            if (err.response.data && err.response.data.message == 'Token has been invalidated.') router.push({ name: 'log-in'})
            if (err.response.data && err.response.data.message === 'Card unavailable'  ) {
               return commit('UPDATE_CARD_DETAILS', { error: true })
            }
            commit('UPDATE_CARD_DETAILS', { fetchError: true, fetchErrorMessage:err.response.data.message })
        });
      }
  }
}
