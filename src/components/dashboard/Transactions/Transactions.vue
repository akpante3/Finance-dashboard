<template>
<div>
    <div v-if="loading" class="loader-container">
        <div class="loader">
            <img src="../../../assets/images/spinner.svg" />
        </div>
    </div>
    <div class="table__list" v-else-if="cardTransactions.length !== 0">
        <div class="table__list__item table__list__item--multi-items" v-for="transaction in cardTransactions" :key="transaction.id">
            <div class="table__list__item__left">
                <div class="table__list__item__left__bold-text">{{ transaction.narration }}</div>
                <span class="table__list__item__left__small-text  table__list__item__left__small-text--hide-on-small-screen">{{ formatDate(transaction.createdAt) }}</span>
            </div>
            <div class="table__list__item__right  table__list__item__right--multi-items">
                <div class="table__list__item__right__item">
                   <span class="table__list__item__right__figures">₦ {{ formatMoney(transaction.amount) }}</span>
                    <div class="table__list__item__right__small-text table__list__item__right__small-text--hide-on-large-screen">{{ formatDate(transaction.createdAt) }}</div>
                </div>
                <div class="table__list__item__right__item">
                    <button :disabled="transaction.is_retired !== 0" class="app-btn app-btn--text-green app-btn--sm app-btn--regular" data-toggle="modal" data-target="#retireTransactionModal" @click="handleRetirementClick(transaction)">Retire transaction</button>
                </div>
            </div>
        </div>
        <RetireTransactionModal
            :transaction="selectedTransaction"
        />
    </div>
    <div v-else>
        <EmptyTransactions
          header="No Transactions"
          text="Transactions were not found"
        />
    </div>
</div>

</template>

<script>
    import RetireTransactionModal from '../../partials/modals/RetireTransactionModal';
    import helperMixin from '../../../mixins/helperMixin'
    import EmptyTransactions from '../../partials/EmptyTransactions.vue'
    import { mapGetters } from 'vuex'

    export default {
        name: 'Transaction',
        data () {
            return {
                loading: true,
                cardTransactions: '',
                selectedTransaction: {},
            }
        },
        components: {
            RetireTransactionModal,
            EmptyTransactions
        },

        created() {
            this.$store.dispatch('fetchCardTransactions')
        },

        mixins:[helperMixin],

        watch: {
            userTransactions (newval) {
                this.loading = false,
                this.cardTransactions = newval.txs                
            }
        },
        computed: {
            ...mapGetters(['userCard', 'userTransactions'])
        },
        methods: {
            handleRetirementClick (data) {
               this.selectedTransaction = { ...data }
            } 
        },
        
    }
</script>