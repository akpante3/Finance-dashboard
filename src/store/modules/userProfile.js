import router from '../../router/index'
import Axios from '../../utils/axios'
import { getUserDetails } from '../../utils/utils';
import toast from '../../utils/toast';
// import { saveToken } from '../../utils/utils';

const baseUrl = process.env.VUE_APP_BASE_API_URL || 'https://mouka-cems.herokuapp.com/v1/api/'
export default {
  state: {
    editSuccess: false,
    editError: false,
    profile: {},
    userProfile: {}
  },

    getters: {
        userEditSuccess (state) {
            return state.editSuccess
        },
        userEditErrror (state) {
            return state.editError
        },
        userProfile (state) {
            return state.userProfile
        }
    },

    mutations: {
        USER_EDIT_SUCCESS (state, payload) {
           state.editSuccess = payload
        },
        USER_EDIT_ERROR (state, payload) {
            state.editError = payload            
        },
        USER_PROFILE (state, payload) {
            state.userProfile = payload
        }
    },

    actions: {
        editUserProfile: async ({commit}, payload) => {
            let data = {
                id: getUserDetails().id,
                first_name: payload.first_name ,
                last_name: payload.last_name,
                department: payload.department,
                marital_status: payload.marital_status,
                mobile: payload.mobile,
                gender: payload.gender
            }
            Object.entries(data).forEach(([key, value]) => {
                if (value === '') {
                    delete data[key]
                }
            });
            
            Axios({
                method: 'put',
                url: `${baseUrl}users`,
                data: {
                 ...data
                }
            }).then(res => {
                console.log(res.data, 'this is data that was received')
                // if (res.data && res.data.status === 'success') {
                    commit('USER_EDIT_SUCCESS', true )
                    toast.green('Success, Pending admin approval')
                // }
            }).catch( err => {
                if (err.response.data.message === 'Token has been invalidated') router.push({ name: 'log-in'})
                commit('USER_EDIT_ERROR', true)
                toast.red(err.response.data.message)
            });
        },
        getUserProfile ({commit}) {
            Axios({
                method: 'get',
                url: `${baseUrl}/self`,
            }).then(res => {
                commit('USER_PROFILE', res.data.data)
            }).catch( err => {
                if (err.response.data.message == 'Token has been invalidated.') router.push({ name: 'log-in'})
                toast.red(err.response.data.message)
            });
        }
    }
}
