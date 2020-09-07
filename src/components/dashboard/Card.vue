<template>
   <div class="dashboard-card">
        <div v-if="loading" class="loader-container">
            <div class="loader">
                <img src="../../assets/images/spinner.svg" />
            </div>
        </div>
       <div class="dashboard-card__details" v-else>
            <div class="dashboard-card__details__left" v-if="userCardInfo && !cardFetchError.state">
                <!-- virtual card -->
                <VirtualCard
                    :cardInfo="userCardInfo"
                />
               
                <!-- card and details table -->
                <div class="table card" v-if="userCardInfo.meta">
                        <div class="card__header table__header">
                            <span class="card__header__left">Card details & Settings</span>
                        </div>
                        <div class="table__list">
                            <div class="table__list__item table__list__item--pt-15">
                                <div class="table__list__item__left">
                                    <span class="table__list__item__left__small-text">CARDNAME</span>
                                    <div class="table__list__item__left__bold-text  table__list__item__left__bold-text--mt-12">{{ userCardInfo.meta.name_on_card || '' }}</div>
                                </div>
                            </div>
                            <div class="table__list__item table__list__item--pt-15">
                                <div class="table__list__item__left">
                                    <span class="table__list__item__left__small-text">CARD NUMBER</span>
                                    <div class="table__list__item__left__bold-text table__list__item__left__bold-text--mt-12">{{ this.formatCardNumber(userCardInfo.meta.card_pan).join(' ') || '' }}</div>
                                </div>
                            </div>
                            <div class="table__list__item table__list__item--pt-15">
                                <div class="table__list__item__left">
                                    <span class="table__list__item__left__small-text">EXPIRY</span>
                                    <div class="table__list__item__left__bold-text table__list__item__left__bold-text--mt-12">{{ userCardInfo.meta.expiration || '' }}</div>
                                </div>
                            </div>
                            <div class="table__list__item table__list__item--pt-15">
                                <div class="table__list__item__left">
                                    <span class="table__list__item__left__small-text">CVV</span>
                                    <div class="table__list__item__left__bold-text table__list__item__left__bold-text--mt-12">{{ userCardInfo.meta.cvv || '' }}</div>
                                </div>
                            </div>
                            <div class="table__list__item table__list__item--pt-15">
                                <div class="table__list__item__left">
                                    <span class="table__list__item__left__bold-text  table__list__item__left__bold-text--grey">Card status</span>
                                </div>
                                <div class="table__list__item__right">
                                    <div>
                                       <div v-if="userCardInfo.meta.is_active" class="tag tag--green">Active</div>
                                       <div class="tag tag--frozen" v-else>Frozen</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="table__footer">
                            <span v-if="userCardInfo.meta.is_active" class="table__footer__text table__footer__text--red" data-toggle="modal" data-target="#reportCardLost">Report card as lost</span>
                            <span  v-else class="table__footer__text table__footer__text--green" data-toggle="modal" data-target="#CardReplacementRequest">Request for a replacement card</span>
                        </div>
                </div>
            </div>
            <div class="" v-else>
               <EmptyTransactions header="Card not available" :text="cardFetchError.msg"/>
            </div>
            <div class="dashboard-card__details__right" v-if="cardTransactions.length">
               <!-- card transactions -->
                <div class="table card">
                        <div class="card__header table__header">
                            <span class="card__header__left">Card transactions</span>
                        </div>
                        <div class="table__list">
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
                        <!-- <div class="table__footer">
                            <span class="table__footer__text table__footer__text--green">See all transactions</span>
                            <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L4.5 4.5L1 8" stroke="#21732E" stroke-width="1.51667" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div> -->
                </div>
           </div>
           <div class="" v-else>
               <EmptyTransactions
                       header="No transactions"
                       text="You don’t have any transactions for this card yet. When you perform transactions on your card, they will appear here."
               />
           </div>
       </div>

        <!-- Modal -->
        <div class="modal fade" id="reportCardLost" tabindex="-1" role="dialog" aria-labelledby="ModalreportCardLost" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalreportCardLost">Report card as lost</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                        <div class="modal-body__item">
                            You are about to report your card as lost. If this card is reported as lost, it’ll be frozen automatically and cannot be used until it is unfrozen.
                        </div>
                        <div class="modal-body__item">
                            <div class="input">
                                <div class="input__right">
                                    <div class="input__label">Comment</div>
                                    <textarea class="" placeholder="Enter your comment here..." v-model="lostCardComment"></textarea>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="app-btn app-btn--md app-btn--bg-white" data-dismiss="modal">Cancel</button>
                    <button type="button" class="app-btn app-btn--md app-btn--color-red" @click="ReportCardAsLost">Report as lost</button>
                </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <CardPlacementRequestModal />

                <!-- Modal -->
        <div class="modal fade" id="requestForAReplacementCard" tabindex="-1" role="dialog" aria-labelledby="ModalreportCardLost" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalreportCardLost">Request for a replacement card</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                        <div class="modal-body__item">
                            You are about request for a replacement card. 
                            Enter your comment below.
                        </div>
                        <div class="modal-body__item">
                            <div class="input">
                                <div class="input__right">
                                    <div class="input__label">Comment</div>
                                    <textarea class="" placeholder="Enter your comment here..." v-model="replaceCardComment"></textarea>
                                </div>
                            </div>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="app-btn app-btn--md" data-dismiss="modal">Cancel</button>
                    <button type="button" class="app-btn app-btn--md app-btn--color-green" @click="RequestForCardPlacement">Request for  card</button>
                </div>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
    import CardPlacementRequestModal from '../partials/modals/CardPlacementRequestModal.vue';
    import VirtualCard from '../partials/VirtualCard';
    import { mapGetters } from 'vuex'
    import helperMixin from '../../mixins/helperMixin'
    import EmptyTransactions from '../partials/EmptyTransactions.vue'

    export default {
        name: 'dashboard-card',
        data () {
            return {
                freezeCard: false,
                loading: false,
                userCardInfo: {},
                cardTransactions: [],
                lostCardComment: '',
                replaceCardComment: '',
                cardFetchError:{
                    state:false,
                    msg: ''
                }
            }
        },
        mixins: [helperMixin],
        created () {
            this.loading = true
            this.$store.dispatch('fetchUserCard')
        },
        computed: {
            ...mapGetters(['userCard', 'userTransactions'])
        },

        watch: {
            userCard (newval) {
                if (newval.error || !newval || newval.fetchError) {
                    this.loading = false;
                    if(newval.fetchError){
                        this.cardFetchError.state = true;
                        this.cardFetchError.msg = newval.fetchErrorMessage;
                    }
                }
                else {
                    this.userCardInfo = newval
                    this.$store.dispatch('fetchCardTransactions')
                }
            },
            userTransactions (newval ) {
                this.loading = false;
                this.cardTransactions = newval.txs
            }
        },

        components: {
            CardPlacementRequestModal,
            VirtualCard,
            EmptyTransactions
        },

        methods: {
            ReportCardAsLost () {
              this.$store.dispatch('MarkCardAsLost', { card_ref: this.userCardInfo.card.card_ref, comment: this.lostCardComment })
            },
            RequestForCardPlacement () {
              this.$store.dispatch('ReplaceCard', { card_ref: this.userCardInfo.card.card_ref, comment: this.replaceCardComment })
            }
        }
    }
</script>

