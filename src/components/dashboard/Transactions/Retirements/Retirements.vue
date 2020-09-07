<template>
    <div>
        <div v-if="loading" class="loader-container">
            <div class="loader">
                <img src="../../../../assets/images/spinner.svg" />
            </div>
        </div>
        <div class="table__list" v-else-if="retirements.length > 0">
            <div class="table__list__item table__list__item table__list__item--hover" v-for="retirement in retirements" :key="retirement.id" @click="$router.push({name: 'transactions-retirements-details', params: { id: retirement.id }})">
                <div class="table__list__item__left table__list__item__left--multi-items">
                    <div class="table__list__item__left__item table__list__item--mt">
                        <div class="tag tag--orange" v-if="retirement.status === 'pending-admin'">Pending</div>
                        <div class="tag tag--red" v-else-if="retirement.status === 'rejected'">Rejected</div>
                        <div class="tag tag--green" v-else>Approved</div>
                    </div>
                    <div class="table__list__item__left__item">
                        <div class="table__list__item__left__bold-text">{{ retirement.expense_code }}</div>
                        <span class="table__list__item__left__small-text">{{ formatDate(retirement.createdAt )}}</span>
                    </div>
                </div>
                <div class="table__list__item__right">
                    <div class="table__list__item__right__item">
                    <span class="table__list__item__right__figures">₦ {{ formatMoney(retirement.amount) }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-else> 
            <EmptyTransactions
                header="No Retirements"
                text="Retirements were not Found"
            /> 
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import helperMixin from '../../../../mixins/helperMixin';
    import EmptyTransactions from '../../../partials/EmptyTransactions.vue'

    export default {
        name: 'retirement',
            data() {
                return {
                retirements: [],
                pageInfo: {},
                loading: true
                }
            },
            created () {
                this.$store.dispatch('fetchRetirements')
            },
            mixins:[helperMixin],
            computed: {
                ...mapGetters(['listOfRetirements'])
            },
            watch: {
                listOfRetirements (val) {
                    if (val) {
                        this.loading = false
                        this.retirements = val.retirements
                        this.pageInfo = val.pageInfo
                    }
                }
            },
            components: {
               EmptyTransactions
            }
    }
</script>