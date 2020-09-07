<template>
        <div class="filter-button" v-click-outside="handleOutsideClick">
        <button class="app-btn app-btn--bg-white app-btn--sm" @click="toggleDropDown">
            <svg width="13" height="13" enable-background="new 0 0 971.986 971.986" version="1.1" viewBox="0 0 971.986 971.986" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m370.22 459.3c10.2 11.1 15.8 25.6 15.8 40.6v442c0 26.601 32.1 40.101 51.1 21.4l123.3-141.3c16.5-19.8 25.6-29.601 25.6-49.2v-272.8c0-15 5.7-29.5 15.8-40.601l353.8-383.9c26.5-28.8 6.101-75.5-33.1-75.5h-873c-39.2 0-59.7 46.6-33.1 75.5l353.8 383.8z"></path></svg>
            Filter
        </button>
        <div class="filter-button__options" v-show="showDropDown">
            <div class="filter-button__options__drop-down">
            <div class="filter-button__options__drop-down__text">
                <div class="filter-button__options__drop-down__text__top">
                    <div class="filter-button__options__drop-down__text__top__header">Transactions</div>
                    <div v-show="$route.path.includes('/retirements')">
                        <AppInput type="select" :options="['pending', 'pending-approval', 'rejected', 'approved']" v-model="filter.status" label="Status"/>
                        <AppInput type="select" :options="expensecode" v-model="filter.expense_code" label="Expense Code"/>
                    </div>
                    <div class="filter-button__options__drop-down__text__top__date">
                        <div class="date-item">
                                <div class="date-item__header">From</div>
                                <div class="date-item__container"> 
                                    <Datepicker :format=dateFormat wrapper-class="filter-date-picker-wrapper" calendar-class="date-calendar-from" v-model="filter.from" placeholder="2020-03-02" /> 
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5007 2H14.334C15.0704 2 15.6673 2.59695 15.6673 3.33333V14.6667C15.6673 15.403 15.0704 16 14.334 16H1.66732C0.930938 16 0.333984 15.403 0.333984 14.6667V3.33333C0.333984 2.59695 0.930938 2 1.66732 2H2.66732C2.85141 2 3.00065 2.14924 3.00065 2.33333V3.83333C3.00065 4.10948 3.22451 4.33333 3.50065 4.33333C3.77679 4.33333 4.00065 4.10948 4.00065 3.83333V0.666667C4.00065 0.298477 4.29913 0 4.66732 0C5.03551 0 5.33398 0.298477 5.33398 0.666667V1.834C5.33435 1.92579 5.40886 2 5.50065 2H9.66732C9.85141 2 10.0007 2.14924 10.0007 2.33333V3.83333C10.0007 4.10948 10.2245 4.33333 10.5007 4.33333C10.7768 4.33333 11.0007 4.10948 11.0007 3.83333V0.666667C11.0007 0.298477 11.2991 0 11.6673 0C12.0355 0 12.334 0.298477 12.334 0.666667V1.83333C12.334 1.92538 12.4086 2 12.5007 2ZM2.00065 14.6667H14.0007C14.1847 14.6667 14.334 14.5174 14.334 14.3333V6.33333C14.334 6.14924 14.1847 6 14.0007 6H2.00065C1.81656 6 1.66732 6.14924 1.66732 6.33333V14.3333C1.66732 14.5174 1.81656 14.6667 2.00065 14.6667Z" fill="#6B7C92"/>
                                    </svg>
                                </div>
                        </div>
                        <div class="date-item">
                                <div class="date-item__header">To</div>
                                <div class="date-item__container"> 
                                    <Datepicker calendar-class="filter-date-calendar-to" wrapper-class="filter-date-picker-wrapper" :format=dateFormat v-model="filter.to" placeholder="2020-03-02" /> 
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5007 2H14.334C15.0704 2 15.6673 2.59695 15.6673 3.33333V14.6667C15.6673 15.403 15.0704 16 14.334 16H1.66732C0.930938 16 0.333984 15.403 0.333984 14.6667V3.33333C0.333984 2.59695 0.930938 2 1.66732 2H2.66732C2.85141 2 3.00065 2.14924 3.00065 2.33333V3.83333C3.00065 4.10948 3.22451 4.33333 3.50065 4.33333C3.77679 4.33333 4.00065 4.10948 4.00065 3.83333V0.666667C4.00065 0.298477 4.29913 0 4.66732 0C5.03551 0 5.33398 0.298477 5.33398 0.666667V1.834C5.33435 1.92579 5.40886 2 5.50065 2H9.66732C9.85141 2 10.0007 2.14924 10.0007 2.33333V3.83333C10.0007 4.10948 10.2245 4.33333 10.5007 4.33333C10.7768 4.33333 11.0007 4.10948 11.0007 3.83333V0.666667C11.0007 0.298477 11.2991 0 11.6673 0C12.0355 0 12.334 0.298477 12.334 0.666667V1.83333C12.334 1.92538 12.4086 2 12.5007 2ZM2.00065 14.6667H14.0007C14.1847 14.6667 14.334 14.5174 14.334 14.3333V6.33333C14.334 6.14924 14.1847 6 14.0007 6H2.00065C1.81656 6 1.66732 6.14924 1.66732 6.33333V14.3333C1.66732 14.5174 1.81656 14.6667 2.00065 14.6667Z" fill="#6B7C92"/>
                                    </svg>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="filter-button__options__drop-down__text__footer">
                    <button type="button" class="app-btn app-btn--md app-btn--bg-white" @click="clearFilter">Clear</button>
                    <button type="button" class="app-btn app-btn--md app-btn--color-green" @click="triggerQuery">Proceed</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment';
    import AppInput from './AppInput'
    import { queryList, serialize } from '../../utils/utils';
import { mapGetters } from 'vuex';

    export default {
        name: 'filter-button',
        data() {
            return {
                showDropDown: false,
                dateFormat:'yyyy-MM-dd',
                statusfilterOptions: ['pending', 'rejected', 'approved'],
                filter: {
                    from: '',
                    to: '',
                    status:'',
                    expense_code: ''
                },
                expensecode: ''
            }
        },
        components: {
           Datepicker,
           AppInput

        },
        computed : {
           ...mapGetters(['getExpenseCode'])
        },
        created() {
            this.$store.dispatch('fetchExpenseCode')
        },
        watch:{
            getExpenseCode(newval) {
               
              if (newval) {
                this.expensecode = newval.map((code) => {
                    return { value: code.uid, key: code.name }
                })
              }
            }           
        }, 
        methods: {
            handleOutsideClick () {
                this.showDropDown = false
            },
            toggleDropDown() {
                this.showDropDown = !this.showDropDown
            },
            formatDatePicker(date) {
                return moment(date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
            },
            triggerQuery() {
                console.log(this.filter.expense_code, 'this is the first expoense code')
                let pageObject = {
                    from: this.filter.from ? this.formatDatePicker(this.filter.from) : null,
                    to: this.filter.to ? this.formatDatePicker(this.filter.to) : null,
                    status: this.filter.status ? this.filter.status : null,
                    expense_code: this.filter.expense_code ? this.filter.expense_code : null
                };
                Object.keys(pageObject).forEach((key) => (pageObject[key] == null) && delete pageObject[key]);

                let currentRoute = this.$route.path;
                let queryParam = serialize(queryList(this.$route, pageObject));

                this.$router.replace(`${currentRoute}?${queryParam}`)
            },
            clearFilter () {
                this.$router.replace(`${this.$route.path}`)
                this.toggleDropDown()
            }
        }
    }
</script>
<style lang="scss" >
  .filter-date-picker-wrapper {
      width: 100%;
      input {
          width: 100%;
          outline: none;
          border: none;
      }
}
.filter-date-calendar-to {
    right: 10px;
}
</style>
