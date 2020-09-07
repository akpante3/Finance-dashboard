<template>
   <div class="home">
        <div v-if="loading" class="loader-container">
            <div class="loader">
                <img src="../../assets/images/spinner.svg" />
            </div>
        </div>
       <div class="home__details" v-else>
           <div>
            <span class="tag tag--orange" v-if="!userCardInfo.meta">Card in Production</span>
           </div>
           <div class="home__details__top">
               <!-- card -->
               <div class="home__details__top__item">
                    <VirtualCard v-if="!cardFetchError.state"
                      :cardInfo="userCardInfo"
                    />
                   <div class="" v-else>
                       <EmptyTransactions header="Card not available" :text="cardFetchError.msg"/>
                   </div>
                </div>
               <div class="home__details__top__item">
                    <div class="home__spending card">
                        <div class="home__spending__header card__header">
                            <span class="home__spending__header card__header__left--md">Spending information</span>
                            <span class="card__header__right">This month 
                                <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.597284" d="M10 1L5.5 5L1 1" stroke="#546278" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </span>
                        </div>
                        <div class="home__spending__analysis">
                            <div class="home__spending__analysis__image">
                                <div class="home__spending__analysis__image__canvas">
                                  <canvas id="myChart"></canvas>
                                </div>
                            </div>
                            <div class="home__spending__analysis__figures">
                                <div class="home__spending__analysis__figures__amount-received">
                                    <div class="home__spending__analysis__figures__key">AMOUNT RECEIVED</div>
                                    <div class="home__spending__analysis__figures__amount home__spending__analysis__figures__amount--received">₦ {{ formatMoney(Number(stats.fundingValue)) }}</div>
                                </div>
                                <div class="home__spending__analysis__figures__amount-spent">
                                    <div class="home__spending__analysis__figures__key home__spending__analysis__figures__key--margin-top">AMOUNT SPENT</div>
                                    <div class="home__spending__analysis__figures__amount home__spending__analysis__figures__amount--spent">₦ {{ formatMoney(Number(stats.spendingValue)) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
               </div>
           </div>
           <div class="home__details__bottom">
                <div class="table card">
                    <div class="card__header table__header">
                        <span class="card__header__left">Recent Transactions</span>
                        <div @click="$router.push({ name: 'dashboard-transactions' })">
                            <span class="table__footer__text table__footer__text--green" v-if="cardTransactions">See all transactions</span>
                            <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L4.5 4.5L1 8" stroke="#21732E" stroke-width="1.51667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <div class="table__list" v-if="cardTransactions.length">
                        <div class="table__list__item" v-for="transaction in cardTransactions" :key="transaction.id">
                            <div class="table__list__item__left">
                                <div class="table__list__item__left__bold-text">{{ transaction.narration }}</div>
                                <span class="table__list__item__left__small-text">{{ formatDate(transaction.createdAt) }}</span>
                            </div>
                            <div class="table__list__item__right">
                                <span class="table__list__item__right__figures">₦ {{ formatMoney(transaction.amount) }}</span>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <EmptyTransactions
                        header="No transactions"
                        text="You don’t have any transactions for this card yet. When you perform transactions on your card, they will apear here."
                        />
                    </div>
                </div>
           </div>
       </div>
   </div>
</template>

<script>
    import Chart from 'chart.js';
    import VirtualCard from '../partials/VirtualCard'
    import { mapGetters } from 'vuex'
    import helperMixin from '../../mixins/helperMixin'
    import EmptyTransactions from '../partials/EmptyTransactions.vue'
    import { setTimeout } from 'timers';

    export default {
        name: 'home',
        data() {
            return {
                loading: false,
                userCardInfo: {},
                cardTransactions: [],
                stats: {
                  fundingValue: 0,
                  spendingValue: 0,
                },
                cardFetchError:{
                    state:false,
                    msg:''
                }
            }
        },
        mixins: [helperMixin],
        created () {
            this.loading = true
            this.$store.dispatch('fetchUserCard')
        },
        // updated () {
        //     var ctx = document.getElementById('myChart');
        //     let number = this.fundingValue/this.spendingValue
        //     let percentage = number * 100
        //     if (ctx) {
        //         this.createChart(percentage.toFixed(2))
        //     }
        // },

        computed: {
            ...mapGetters(['userCard', 'userTransactions', 'cardStats'])
        },

        components: {
            VirtualCard,
            EmptyTransactions
        },

        watch: {
            userCard (newval) {
                if (newval.error || newval.fetchError) {
                    this.loading = false;
                    if(newval.fetchError){
                        this.cardFetchError.state = true;
                        this.cardFetchError.msg = newval.fetchErrorMessage;
                        
                        setTimeout(() => this.createChart(0), 1500)
                    }
                } else { 
                    this.userCardInfo = newval
                    this.$store.dispatch('fetchCardStats', newval.card.card_ref)
                    this.$store.dispatch('fetchCardTransactions')
                }
            },
            userTransactions (newval) {
                this.loading = false;
                this.cardTransactions = newval.txs                
            },
            cardStats (val) {
                let ctx = document.getElementById('myChart');

                if (val.error) {
                    if (ctx) {
                        this.createChart(0)
                    }
                } else if (val) {
                    this.stats.fundingValue = val.funding_value
                    this.stats.spendingValue = val.spending_value

                    let number = val.funding_value/val.spending_value
                    let percentage = number * 100
                    if (ctx) {
                        this.createChart(percentage)
                    }
                }
            }
        },
        methods: {
            createChart (data) {
                const spending = 100 - data
                var ctx = document.getElementById('myChart');
                console.log(ctx, 'this is ctxt')
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [data, spending],
                            backgroundColor: [
                                '#ff0d00',
                                '#00C6CE',
                            ],
                            borderWidth: 1,
                            hoverBorderWidth: 1,
                            weight: 4,
                        }],
                        //    labels: ['received', 'spending'],
                    },
                    options: {
                        cutoutPercentage: 70,
                        responsive: false,
                        // legend: false,
                        tooltips: false,
                    }
                });
            }
        },
    }
</script>