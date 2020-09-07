<template>
    <!-- input -->
    <div class="input">
        <div class="input__left">
            <div class="input__label">{{ label }}</div>
            <!-- text-area -->
            <textarea v-if="label == 'Comment'" class="" v-model="inputData" :placeholder="placeholder"></textarea>
            <!-- select -->
            <div class="form-group input__select" v-else-if="type == 'select'">
                <select class="form-control" id="exampleFormControlSelect1" v-model="inputData">
                    <option value="" selected>Select option</option>
                    <option v-for="option in options" :key="option.value" :value="option.value || option">{{ option.key || option }}</option>
                </select>
            </div>
            <!-- date-picker -->
            <Datepicker v-else-if="type == 'date'" wrapper-class="filter-date-picker-wrapper" calendar-class="date-calendar-from" v-model="inputData" :placeholder="placeholder" /> 
             <!-- search-select -->
            <v-select v-else-if="type == 'search-select'" v-model="inputData" :placeholder="placeholder" :clearable="true" :filterable="true" :options="options"></v-select>
            <!-- input -->
            <input v-model="inputData" :disabled="disabled" :placeholder="placeholder" :type='inputType'  v-else/>
        </div>

        <!--  input icons right -->
        <div :class="[type === 'select' || type === 'search-select' ? 'input__select-icon' : 'input__icon']">
            <!-- password toggle -->
            <span v-if="type === 'password'" @click="togglePasswordType">
                <img src="../../assets/images/password_icon.svg" />
            </span>
            <!-- select icon -->
            <span v-if="type === 'select' || type === 'search-select'">
                <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.36426 5.36396L9.31401 5.36396C10.2049 5.36396 10.6511 6.4411 10.0211 7.07107L6.07136 11.0208C5.68084 11.4113 5.04768 11.4113 4.65715 11.0208L0.707404 7.07107C0.0774387 6.4411 0.523606 5.36396 1.41451 5.36396L5.36426 5.36396Z" fill="#9B9B9B"/>
                </svg>
            </span>
            <!-- date-icon -->
            <span v-if="type === 'date'">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5007 2H14.334C15.0704 2 15.6673 2.59695 15.6673 3.33333V14.6667C15.6673 15.403 15.0704 16 14.334 16H1.66732C0.930938 16 0.333984 15.403 0.333984 14.6667V3.33333C0.333984 2.59695 0.930938 2 1.66732 2H2.66732C2.85141 2 3.00065 2.14924 3.00065 2.33333V3.83333C3.00065 4.10948 3.22451 4.33333 3.50065 4.33333C3.77679 4.33333 4.00065 4.10948 4.00065 3.83333V0.666667C4.00065 0.298477 4.29913 0 4.66732 0C5.03551 0 5.33398 0.298477 5.33398 0.666667V1.834C5.33435 1.92579 5.40886 2 5.50065 2H9.66732C9.85141 2 10.0007 2.14924 10.0007 2.33333V3.83333C10.0007 4.10948 10.2245 4.33333 10.5007 4.33333C10.7768 4.33333 11.0007 4.10948 11.0007 3.83333V0.666667C11.0007 0.298477 11.2991 0 11.6673 0C12.0355 0 12.334 0.298477 12.334 0.666667V1.83333C12.334 1.92538 12.4086 2 12.5007 2ZM2.00065 14.6667H14.0007C14.1847 14.6667 14.334 14.5174 14.334 14.3333V6.33333C14.334 6.14924 14.1847 6 14.0007 6H2.00065C1.81656 6 1.66732 6.14924 1.66732 6.33333V14.3333C1.66732 14.5174 1.81656 14.6667 2.00065 14.6667Z" fill="#6B7C92"/>
                </svg>
            </span>
        </div>
    </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker';

  export default {
    name: 'app-input',
    data () {
        return {
            inputData: '',
            inputType: this.type
        }
    },
    watch: {
      inputData () {
        this.handleInput()
      }
    },
    mounted () {
       if (this.selected) {
           this.inputData = this.selected
       }
    },
    components: {
     Datepicker
    },
    props: ['type', 'label', 'placeholder', 'options', 'disabled', 'selected'],
        methods: {
            handleInput () {
                const data = this.inputData.code || this.inputData
                this.$emit('input', data)
            },
            togglePasswordType () {
                this.inputType === this.type ? this.inputType = 'text' : this.inputType = this.type
            }
        }
  }
</script>
<style lang="scss">

 .vs__dropdown-toggle {
    border: none;
    input {
        border-color: white;
        width: 0%;
        padding: 0;
        &:focus {
            padding: 0;           
        }
    }
 }
 .vs__selected {
     padding: 0;
     margin: 4px 0px 0px 0px;
 }
 .vs__open-indicator {
     display: none;
 }
 .vs__dropdown-option--highlight {
    background: #1AA152
 }
</style>
