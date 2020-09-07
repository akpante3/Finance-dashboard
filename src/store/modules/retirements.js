import Axios from '../../utils/axios'
import toast from '../../utils/toast';
import { serialize } from '../../utils/utils'
import router from '../../router/index'


const baseUrl = process.env.VUE_APP_BASE_API_URL || 'https://mouka-cems.herokuapp.com/v1/api/';

export default {
  state: {
    retirementList: {},
    newRetirement: {},
    singleRetirement: {},
    retiremntTrail: []
  },
  getters: {
    listOfRetirements (state) {
        return {...state.retirementList }
    },
    newRetirement (state) {
        return { ...state.newRetirement }
    },
    retirementTrail (state) {
        return [state.retiremntTrail]
    },
    singleRetirement (state) {
       return { ...state.singleRetirement }
    }
  },
  mutations: {
    RETIREMENT_LIST (state, payload) {
        state.retirementList = {...payload}
    },
    NEW_RETIREMENT (state, payload) {
        state.newRetirement = { ...payload }
    },
    SINGLE_RETIREMENT (state, payload) {
        state.singleRetirement = { ...payload }
    },
    RETIREMENT_TRAIL (state, payload) {
        state.retiremntTrail = [...payload]
    },
  }, 
  actions: {
    //   fetallRetirements
    fetchRetirements: async ({commit}, query = {}) => {
        // change query status
       console.log(query, 'after bro');
        let acn = window.localStorage.getItem('acn')
        let UserId = window.localStorage.getItem('user_id')
        let url = `${baseUrl}retirements`;
        if(acn === 'admin' || acn === 'superadmin'){
            query.user_id = UserId
        }
        if(query.status === "pending") query.status = "pending-admin";
        if(query.status === "pending-approval") query.status = "pending-sadmin";
        if(query) {
            query = '?'+ serialize(query);
            url = `${baseUrl}retirements${query}`
        }

        Axios({
            method: 'get',
            url: url,
        }).then(res => {
            commit('RETIREMENT_LIST', res.data.data)
        }).catch( err => {
            if (err.response.data.message.includes('Token has been invalidated.')) router.push({ name: 'log-in'})

            toast.red(err.response.data.message)
        });
    },

    retirementTrails: async ({commit}, id) => {

        Axios({
            method: 'get',
            url: `${baseUrl}retirements/${id}/trail`,
        }).then(res => {
            commit('RETIREMENT_TRAIL', res.data.data)
        }).catch( err => {
            if (err.response.data.message == 'Token has been invalidated.') router.push({ name: 'log-in'})
            toast.red(err.response.data.message)
        });
    },

    //   fetallRetirements
    fetchSingleRetirement: async ({commit}, id = 1) => {
        Axios({
            method: 'get',
            url: `${baseUrl}retirements/${id}`,
        }).then(res => {
            commit('SINGLE_RETIREMENT', res.data.data)
        }).catch( err => {
            if (err.response.data.message.includes('Token has been invalidated')) router.push({ name: 'log-in'})
            toast.red(err.response.data.message)
        });
    },

    // create new retirement
    postNewRetirement: async ({commit}, payload) => {
        Axios({
            method: 'post',
            url: `${baseUrl}retirements`,
            data: {
                transaction_id: payload.transaction_id,
                expense_code: payload.expense_code,
                supporting_document: payload.supporting_document
            }
        }).then(res => {
            if (res.data.status === 'success') {
                commit('NEW_RETIREMENT', res.data.data )
                toast.green('Your retirement was posted successfully')
             }
        }).catch( err => {
            toast.red(err.response.data.message)
        });
    }
  }
}