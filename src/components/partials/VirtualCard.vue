<template>
    <!-- virtual card -->
    <div>
        <div class="card--virtual card">
            <div v-if="cardInfo.card && cardInfo.meta">
                <div class="card--virtual__header">
                    <span class="card--virtual__header__left">
                        <span class="card--virtual__header__left__text">{{ fullName }}</span>
                    </span>
                    <span class="card--virtual__header__right">
                    <svg width="64" height="20" viewBox="0 0 64 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.0993 6.3939C33.0628 9.17984 35.6649 10.7346 37.6251 11.6589C39.6392 12.6074 40.3157 13.2155 40.308 14.0636C40.2926 15.3617 38.7013 15.9345 37.2119 15.9569C34.6838 15.9949 33.1855 15.3163 32 14.7793L31.902 14.735L30.9661 18.9734C32.171 19.5109 34.4023 19.9795 36.7161 20C42.1471 20 45.7006 17.4056 45.7198 13.3829C45.7324 10.3289 43.1184 9.00071 41.0266 7.93789C39.6218 7.22412 38.4526 6.63002 38.4726 5.71322C38.4899 5.02139 39.1722 4.28306 40.6673 4.09522C41.4072 4.00037 43.4501 3.92784 45.7659 4.96002L46.6749 0.859215C45.4296 0.420309 43.8287 0 41.8358 0C36.7238 0 33.1281 2.62972 33.0993 6.3939ZM55.4095 0.353357C54.4179 0.353357 53.5819 0.913149 53.2091 1.77236L45.4507 19.6987H50.8779L51.958 16.8105H58.5901L59.2166 19.6987H64L59.8258 0.353357H55.4095ZM57.7349 12.8436L56.1686 5.57932L53.4454 12.8436H57.7349ZM26.519 0.353357L22.2411 19.6987H27.4126L31.6887 0.353357H26.519ZM13.4853 13.5206L18.8683 0.353357H24.2993L15.9202 19.6987L10.4546 19.6987L6.33043 4.26074C6.0806 3.3104 5.86343 2.96076 5.1024 2.56091C3.85899 1.90627 1.8065 1.2944 0 0.915009L0.122996 0.353357H8.92295C10.0434 0.353357 11.0523 1.07495 11.3079 2.32472L13.4853 13.5206Z" fill="white"/>
                    </svg>
                </span>
                </div>
                <div class="card--virtual__number">
                    <div v-for="num in cardNumber" :key="Math.random(num)">{{ num }}</div>
                </div>
                <div class="card--virtual__footer">
                    <div>
                        <div class="card--virtual__footer__key">CURRENT BALANCE</div>
                        <div class="card--virtual__footer__value--lg">₦ {{ formatMoney(currentBalance) }}</div>
                    </div>
                    <div>
                        <div class="card--virtual__footer__key">VALID THRU</div>
                        <div class="card--virtual__footer__value--sm">{{ validThru }}</div>
                    </div>
                </div>
            </div>
            <!-- empty case -->
            <div v-else>
                <div class="card--virtual__header">
                    <span class="card--virtual__header__left--empty">
                    </span>
                    <span class="card--virtual__header__right">
                    <svg width="64" height="20" viewBox="0 0 64 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M33.0993 6.3939C33.0628 9.17984 35.6649 10.7346 37.6251 11.6589C39.6392 12.6074 40.3157 13.2155 40.308 14.0636C40.2926 15.3617 38.7013 15.9345 37.2119 15.9569C34.6838 15.9949 33.1855 15.3163 32 14.7793L31.902 14.735L30.9661 18.9734C32.171 19.5109 34.4023 19.9795 36.7161 20C42.1471 20 45.7006 17.4056 45.7198 13.3829C45.7324 10.3289 43.1184 9.00071 41.0266 7.93789C39.6218 7.22412 38.4526 6.63002 38.4726 5.71322C38.4899 5.02139 39.1722 4.28306 40.6673 4.09522C41.4072 4.00037 43.4501 3.92784 45.7659 4.96002L46.6749 0.859215C45.4296 0.420309 43.8287 0 41.8358 0C36.7238 0 33.1281 2.62972 33.0993 6.3939ZM55.4095 0.353357C54.4179 0.353357 53.5819 0.913149 53.2091 1.77236L45.4507 19.6987H50.8779L51.958 16.8105H58.5901L59.2166 19.6987H64L59.8258 0.353357H55.4095ZM57.7349 12.8436L56.1686 5.57932L53.4454 12.8436H57.7349ZM26.519 0.353357L22.2411 19.6987H27.4126L31.6887 0.353357H26.519ZM13.4853 13.5206L18.8683 0.353357H24.2993L15.9202 19.6987L10.4546 19.6987L6.33043 4.26074C6.0806 3.3104 5.86343 2.96076 5.1024 2.56091C3.85899 1.90627 1.8065 1.2944 0 0.915009L0.122996 0.353357H8.92295C10.0434 0.353357 11.0523 1.07495 11.3079 2.32472L13.4853 13.5206Z" fill="white"/>
                    </svg>
                </span>
                </div>
                <div class="card--virtual__number--empty">
                    <!-- <div v-for="num in cardNumber" :key="Math.random(num)">{{ num }}</div> -->
                </div>
                <div class="card--virtual__footer">
                    <div>
                        <div class="card--virtual__footer__key--empty"></div>
                        <div class="card--virtual__footer__value--empty "></div>
                    </div>
                    <div>
                        <div class="card--virtual__footer__key--empty"></div>
                        <div class="card--virtual__footer__value--empty"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import helperMixin from '../../mixins/helperMixin'
    export default {
        name: 'virtual-card',
        data () {
            return {
                fullName: '',
                cardNumber: '',
                currentBalance: '',
                validThru: '',
                amount: '',
                cardRef: '',
            }
        },
        mounted () {
        this.cardInfoDetails()
        },
        mixins: [helperMixin],
        methods: {
            cardInfoDetails () {

                if ( this.cardInfo && this.cardInfo.card ) {
                    this.cardNumber = this.cardInfo.meta? this.formatCardNumber(this.cardInfo.meta.card_pan) : '***** ***** *** ** **'
                    this.cardRef = this.cardInfo.card.card_ref.match(/.{1,4}/g) || ''
                    this.amount = this.cardInfo.card.amount || '';
                    this.currentBalance = this.cardInfo.meta && this.cardInfo.meta.amount ? (1* this.cardInfo.meta.amount) : '';
                    this.validThru = this.cardInfo.card.card_expiry || ''
                    this.fullName = this.cardInfo.meta ? this.cardInfo.meta.name_on_card : 'Not available'
                }
            }
        },
        props: ['cardInfo']
    }
</script>