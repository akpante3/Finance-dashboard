import Axios from '../../utils/axios';
import toast from '../../utils/toast';
import router from '../../router/index';

const baseUrl = process.env.VUE_APP_BASE_API_URL || 'https://mouka-cems.herokuapp.com/v1/api/'

export default {
  state: {
    markedAsLost: false,
    replaceCard: false,
    stats: {},
    accountStatement: {}
  },
  getters: {
    lostCardStatus (state) {
        return state.markedAsLost
    },
    cardReplacement (state) {
        return state.replaceCard
    },
    cardStats (state) {
        return state.stats
    },
    accountStatement (state) {
        return state.accountStatement
    }
  },
  mutations: {
    MARK_CARD_AS_LOST (state) {
       state.markedAsLost = true
    },
    REPLACE_CARD (state) {
        state.replaceCard = true
    },
    CARD_STATS (state, payload) {
        state.stats = payload
    },
    ACCOUNT_STATEMENT (state, payload) {
       state.accountStatement = payload
    }
  }, 
  actions: {
      MarkCardAsLost : async ({commit}, payload) => {
        Axios({
            method: 'put',
            url: `${baseUrl}usercards/${payload.card_ref}/lost`,
            data: {
               comment: payload.comment
            }
        }).then(res => {
            if (res.data.status === 'success') {
                commit('MARK_CARD_AS_LOST')
                toast.green('Card has been disabled')
                router.go(0)
            }
        }).catch( err => {
            if (err.response.data.message == 'Token has been invalidated.') router.push({ name: 'log-in'})
            toast.red(err.response.data.message)
        });
      },
    //   /v1/api/usercards/A0000000000000002U/statement
      ReplaceCard: async ({commit}, payload) => {
        Axios({
            method: 'post',
            url: `${baseUrl}usercards/${payload.card_ref}/replace`,
            data: {
               comment: payload.comment
            }
        }).then(res => {
            if (res.data.status === 'success') {
                toast.green('Your request was successful')
                commit('REPLACE_CARD')
                setTimeout(() => {
                    router.go(0)
                }, 2000);
            }
        }).catch( err => {
            if (err.response.data.message == 'Token has been invalidated.') router.push({ name: 'log-in'})
            toast.red(err.response.data.message)
        });
      },
      getAccountStatement: async ({commit}, payload) => {
        Axios({
            method: 'post',
            url: `${baseUrl}usercards/${payload}/statement`,
        }).then(res => {
            if (res.data.status === 'success') {
                // toast.green('Your request was successfull')
                commit('ACCOUNT_STATEMENT', res.data.data.statement)
            }
        }).catch( err => {
            if (err.response.data.message == 'Token has been invalidated.') router.push({ name: 'log-in'})
            toast.red(err.response.data.message)
        });
      },

      fetchCardStats: async ({commit}, cardRef) => {
        Axios({
            method: 'post',
            url: `${baseUrl}usercards/${cardRef}/stats`,
        }).then(res => {
            if (res.data.status === 'success') {
                commit('CARD_STATS', res.data.data.stats)
            }
        }).catch( err => {
            console.log('-------------')
            commit('CARD_STATS', { error: true })
            if (err.response.data.message == 'Token has been invalidated.') router.push({ name: 'log-in'})
            toast.red(err.response.data.message)
        });
      },
  }
}
