<template>
    <div>
        <div v-if="loading" class="loader-container">
            <div class="loader">
                <img src="../../../../assets/images/spinner.svg" />
            </div>
        </div>    
        <div class="retirements-details" v-else-if="retirementDetails.transaction">
            <div class="retirements-details__back-button" @click="$router.push({ name: 'transactions-retirements' })">
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 1.5L2 8.00026L7.99952 14.5" stroke="#1AA152" stroke-width="1.5"/>
                </svg>
                <span>
                    Retirement
                </span>
            </div>
            <div class="retirements-details__header">
                <span class="retirements-details__header__text">Retirement details</span>
                <span class="tag tag--orange" v-if="retirementDetails.status === 'pending-admin'">Pending</span>
                <span class="tag tag--orange" v-if="retirementDetails.status === 'pending-sadmin'">Pending Approval</span>
                <span class="tag tag--green" v-else-if="retirementDetails.status === 'approved'">Approved</span>
                <span class="tag tag--red" v-else-if="retirementDetails.status === 'rejected'">Rejected</span>
            </div>
            <div class="retirements-details__cards">
                <div class="retirements-details__cards__card">
                    <div class="card--details">
                        <div class="card--details__header">
                            Retirement details
                        </div>
                        <div class="card--details__body">
                            <div class="card--details__body__info">
                                <div class="card--details__body__info__detail">
                                    <div class="card--details__body__info__item">
                                        <div class="card--details__body__info__item__key">
                                            Transaction
                                        </div>
                                        <div>
                                            {{ retirementDetails.transaction.amount }}
                                        </div>
                                    </div>
                                    <div class="card--details__body__info__item">
                                        <div class="card--details__body__info__item__key">
                                            Transaction date
                                        </div>
                                        <div>
                                            {{ formatDate(retirementDetails.transaction.createdAt) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="card--details__body__info__detail">
                                    <div class="card--details__body__info__item">
                                        <div class="card--details__body__info__item__key">
                                        Transaction Reference
                                        </div>
                                        <div>
                                            {{ retirementDetails.transaction.ref }}
                                        </div>
                                    </div>
                                    <div class="card--details__body__info__item">
                                        <div class="card--details__body__info__item__key">
                                            Retirement date
                                        </div>
                                        <div>
                                            {{ formatDate(retirementDetails.createdAt) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="card--details__body__info__detail">
                                    <div class="card--details__body__info__item">
                                        <div class="card--details__body__info__item__key">
                                        Transaction receipts
                                        </div>
                                        <div>
                                            <div class="card--details__body__info__item__receipt" v-if="retirementDetails.supporting_document">
                                                <div class="card--details__body__info__item__receipt__name">
                                                {{ retirementDetails.supporting_document }}
                                                </div>
                                                <div class="card--details__body__info__item__receipt__buttons">
                                                    <button class="app-btn app-btn--sm app-btn--bg-white">
                                                        <a @click="downloadTransactionReceipt" download target="_blank">
                                                            <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.86271 4.92597C8.80409 4.80507 8.67527 4.72807 8.53343 4.72807H7.08605V0.337719C7.08605 0.151298 6.92394 0 6.72421 0H5.27683C5.07709 0 4.91498 0.151298 4.91498 0.337719V4.72807H3.4676C3.32576 4.72807 3.19694 4.80575 3.13832 4.92597C3.07898 5.04688 3.10214 5.18804 3.19549 5.28801L5.72841 7.98976C5.79716 8.06339 5.8963 8.10526 6.00052 8.10526C6.10473 8.10526 6.20387 8.06271 6.27262 7.98976L8.80554 5.28801C8.89962 5.18872 8.92133 5.04688 8.86271 4.92597Z" fill="black"/>
                                                            <path d="M9.82137 7.52637V9.61058H2.17927V7.52637H0.789795V10.3053C0.789795 10.6895 1.10104 11.0001 1.48453 11.0001H10.5161C10.9003 11.0001 11.2108 10.6895 11.2108 10.3053V7.52637H9.82137Z" fill="black"/>
                                                            </svg>
                                                        </a>
                                                    </button>
                                                    <button class="app-btn app-btn--sm app-btn--bg-white"><a :href="`${retirementDetails.supporting_document}`" target="_blank">View receipt</a></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="retirements-details__cards__card">
                    <div class="card--details">
                        <div class="card--details__header">
                            Retirement Trail
                        </div>
                        <div v-if="retirementTransactionTrails.length > 0">
                            <div class="card--details__body" v-for="trail in retirementTransactionTrails" :key="trail.id">
                                {{ formatDate(new Date(trail.ts)) }}
                                <div class="card--details__body__info">
                                    <div class="card--details__body__info__detail">
                                        <div class="card--details__body__info__item">
                                            <div class="card--details__body__info__item__key">
                                            {{ fromNowDateFormat(trail.ts) }}
                                            </div>
                                            <div>
                                            {{ trail.comment }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="card--details__body card--details__body--empty">
                            No Trails Found.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import helperMixin from '../../../../mixins/helperMixin';
    // import EmptyTransactions from '../../../partials/EmptyTransactions.vue'
    import { mapGetters } from 'vuex';
    import axios from 'axios';

    export default {
        name: 'retirement-details',
        data() {
            return {
              loading: true,
              retirementDetails: {},
              retirementTransactionTrails: [],
            }
        },
        components: {
        //    EmptyTransactions
        },
        mixins:[helperMixin],
        created () {
            this.$store.dispatch('fetchSingleRetirement', this.$route.params.id)
            this.$store.dispatch('retirementTrails', this.$route.params.id)
        },
        computed: {
            ...mapGetters(['singleRetirement', 'retirementTrail'])
        },
        watch: {
            singleRetirement (val) {
                if (val) {
                    this.loading = false;
                    this.retirementDetails = val
                }
            },
            retirementTrail (val) {
                 if (val) {
                    this.loading = false;
                    this.retirementTransactionTrails = [...val[0]]
                }               
            }
        },

        methods: {
            forceFileDownload(response){
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'file.png') //or any other extension
                document.body.appendChild(link)
                link.click()
            },

            downloadTransactionReceipt () {
                const instance = axios.create();

                instance({
                    method: 'Get',
                    url: this.retirementDetails.supporting_document,
                    responseType: 'arraybuffer',

                })
                .then(response => {
                    this.forceFileDownload(response)
                })
                .catch(() => console.log('error occured'))
            }
        },
    }
</script>