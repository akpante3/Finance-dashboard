import Vue from 'vue'
import Vuex from 'vuex'
import LogIn from './modules/logIn'
import VirtualCard from './modules/virtualCard'
import UserTransactions from './modules/transactions';
import PasswordReset from './modules/password';
import UserProfile from './modules/userProfile';
import CardActions from './modules/cardActions';
import Retirements from './modules/retirements'
import Notification from './modules/notifications'
import Entities from './modules/entities'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        LogIn,
        VirtualCard,
        UserTransactions,
        PasswordReset,
        UserProfile,
        CardActions,
        Retirements,
        Notification,
        Entities
    },
})