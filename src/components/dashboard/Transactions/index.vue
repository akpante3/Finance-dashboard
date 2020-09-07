<template>
    <div class="dashboard-settings">
        <div class="dashboard-settings__header">
            <div class="dashboard-settings__header__text">Transactions</div>
            <FilterButton />
        </div>
        <div class="dashboard-settings__card card">
            <div class="dashboard-settings__card__header">
                <div
                    @click="$router.push({ name:'transactions-all' })"
                    :class="['dashboard-settings__card__header__link', $route.name === 'transactions-all' ?  'dashboard-settings__card__header__link--active' : '']"
                >
                    Transactions
                </div>
                <div
                    @click="$router.push({ name: 'transactions-retirements' })"
                    :class="['dashboard-settings__card__header__link', $route.name === 'transactions-retirements' ?  'dashboard-settings__card__header__link--active' : '']"
                >
                    Retirements
                </div>
            </div>
            <div class="dashboard-settings__card__body">
                <router-view></router-view>
            </div>
        </div>
        <div v-if="paginationProp.pageData.totalPages > 0">
            <Pagination :paginationProp="paginationProp"/>  
        </div>
    </div>
</template>

<script>
    import FilterButton from '../../partials/FilterButton.vue';
    import Pagination from '../../partials/Pagination.vue';
    import { mapGetters } from 'vuex';
    import { queryList } from '../../../utils/utils'
    // import Datepicker from 'vuejs-datepicker';

    export default {
        name: 'dashboard-transactions',
        data () {
            return {
                paginationProp:{
                    paginationEmpty:false,
                    url:'url',
                    pageData:{
                        currentPage:1,
                        totalPages:1,
                        pageSize: 10
                    },
                    disableLimit:true
                } 
            }
        },
        components: {
            FilterButton,
            Pagination,
            // Datepicker
        },
        mounted () {
          this.triggerQuery()
        },
        updated () {
          this.triggerQuery()
        },
        computed: {
            ...mapGetters(['listOfRetirements', 'userTransactions'])
        },
        watch: {
            '$route': 'triggerQuery',

            listOfRetirements (val) {
               this.updatePaginationProp(val)
            },
            userTransactions (val) {
               this.updatePaginationProp(val)               
            }
        },
        methods: {
            triggerQuery() {
                let pageObject = {
                    paginationNumber: this.$route.query.page || null,
                    pageLimit: this.$route.query.limit || null,
                    from: this.$route.query.from ? `${this.$route.query.from} 00:00:00` : null,
                    to: this.$route.query.to ?  `${this.$route.query.from} 23:59:59` : null,
                    status: this.$route.query.status || null,
                    expense_code:  this.$route.query.expense_code || null
                };
                // delete null values
                Object.keys(pageObject).forEach((key) => (pageObject[key] == null) && delete pageObject[key]);


                if (this.$route.path.includes('/retirements')) {
                    this.$store.dispatch('fetchRetirements', queryList(this.$route, pageObject))                
                } else {
                    this.$store.dispatch('fetchCardTransactions', queryList(this.$route, pageObject))
                }
            },
            updatePaginationProp (val) {
                this.paginationProp.pageData.currentPage = val.pageInfo.currentPage
                this.paginationProp.pageData.totalPages = val.pageInfo.totalPages
            }
        }
    }
</script>