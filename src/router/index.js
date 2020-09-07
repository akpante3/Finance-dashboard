import Router from 'vue-router';
import Vue from 'vue'

const Auth = () => import('../components/auth')
const Dashboard = () => import('../components/dashboard/index.vue')
const Home = () => import('../components/dashboard/Home.vue')
const Card = () => import('../components/dashboard/Card.vue')
const Settings = () => import('../components/dashboard/Settings')
const SettingsSecurity = () => import('../components/dashboard/Settings/Security')
const SettingsAccounts = () => import('../components/dashboard/Settings/Account')
const SettingsAccountStatement = () => import('../components/dashboard/Settings/AccountStatement')
const Transactions = () => import('../components/dashboard/Transactions/')
const TransactionsRetirements = () => import('../components/dashboard/Transactions/Retirements/Retirements')
const TransactionsRetirementsDetails = () => import('../components/dashboard/Transactions/Retirements/RetirementsDetails')
const TransactionsAll = () => import('../components/dashboard/Transactions/Transactions')
const Empty = () => import('../components/partials/EmptyTransactions')


Vue.use(Router);

export default new Router({
    linkActiveClass: 'active',
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            redirect: { name:'log-in' },
        },
        {
            path: '/new-password/:token',
            name: 'new-password',
            component: Auth,
        },
        {
            path: '/log-in',
            name: 'log-in',
            component: Auth,
        },
        {
            path: '/password-reset',
            name: 'password-reset',
            component: Auth,
        },
        {
            path: '/update-password/:token',
            name: 'update-password',
            component: Auth,
        },
        {
            path:'/dashboard',
            component: Dashboard,
            name: 'dashboard',
            redirect: { name:'dashboard-home' },
            children: [
                {
                    path: 'home',
                    name: 'dashboard-home',
                    component: Home,
                },
                {
                    path: 'card',
                    name: 'dashboard-card',
                    component: Card,
                },
                {
                    path: 'transactions/retirements-details/:id',
                    name: 'transactions-retirements-details',
                    component: TransactionsRetirementsDetails,
                }, 
                {
                    path: 'transactions',
                    name: 'dashboard-transactions',
                    component: Transactions,
                    redirect: { name: 'transactions-all' },
                    children: [
                        {
                            path: 'retirements',
                            name: 'transactions-retirements',
                            component: TransactionsRetirements,
                        },
                        {
                            path: 'all',
                            name: 'transactions-all',
                            component: TransactionsAll,
                        }, 
                    ]
                }, 
                {
                    path: 'settings',
                    name: 'dashboard-settings',
                    component: Settings,
                    redirect: { name: 'settings-account' },
                    children: [
                        {
                            path: 'security',
                            name: 'settings-security',
                            component: SettingsSecurity,
                        }, 
                        {
                            path: 'account',
                            name: 'settings-account',
                            component: SettingsAccounts,
                        },
                        {
                            path: 'account-statement',
                            name: 'account-statement',
                            component: SettingsAccountStatement,
                        },                                                
                    ]
                },               
            ]
        },
        {
            path: '/404',
            component: Empty
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})