// import router from '../../router/index'
import Axios from '../../utils/axios'
import toast from '../../utils/toast';
import router from '../../router/index'


const baseUrl = process.env.VUE_APP_BASE_API_URL || 'https://mouka-cems.herokuapp.com/v1/api/'

export default {
  state: {
    userNotification: [],
  },
  getters: {
    notificationList (state) {
        return state.userNotification
    },
  },
  mutations: {
    NOTIFICATION_LIST (state, payload) {
      state.userNotification = payload
    }
  }, 
  actions: {
    getNotificationList: async ({commit}) => {
        Axios({
            method: 'get',
            url: `${baseUrl}notifications`,
        }).then(res => {
            commit('NOTIFICATION_LIST', res.data.data)
        }).catch( err => {
            if (err.response.data.message.includes('Token has been invalidated.')) router.push({ name: 'log-in'})
            toast.red(err.response.data.message)
        });
    },
  }
}