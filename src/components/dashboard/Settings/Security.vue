<template>
    <div class="settings-page">
        <div class="settings-page__header-text">Change your password</div>
        <div class="settings-page__text">To change your password please type in your current password.</div>
        <!-- input -->
        <div class="settings-page__input">
            <app-input type="password" label="Password"  placeholder="Old Password" v-model="oldPassword" /> 
            <!-- <app-input type="password" label="New Password" placeholder="New Password" v-model="newPassword" /> -->
            <div class="new-password">
                <div  class="new-password__label">New Password</div>
                <password v-model="newPassword" :secureLength=8 :showPassword="showNewPassword" placeholder="New Password" @score="showScore" />
                <span class="new-password__indicator">{{ passwordStrengthIndicator }}</span>
                <div class="new-password__icon" @click="toggleNewpassword">
                    <span>
                        <img src="../../../assets/images/password_icon.svg" />
                    </span>
                </div>
            </div>
            <app-input defaultClass="form__input" type="password" label="Confirm Password" placeholder="Confirm New Password" v-model="confirmPassword"/> 
        </div>
        <div class="settings-page__button">
          <button :disabled="buttonDisabled" class="app-btn app-btn--md app-btn--color-green" @click="updatePassword">Change password </button>
        </div>
    </div>
</template>
<script>
    import toast from '../../../utils/toast.js'
    import { mapGetters } from 'vuex';
    import { setTimeout } from 'timers';
    import helperMixin from '../../../mixins/helperMixin'
    import Password from 'vue-password-strength-meter'


  export default {
    name: 'settings-security',
    components: { Password },
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            showNewPassword: false,
            passwordStrengthIndicator: '',
            strongePassword: false
        }
    },
    mixins: [helperMixin],
    computed: {
        ...mapGetters([
            'changePasswordStatus'
        ]),
        buttonDisabled () {
            if (this.strongePassword && this.confirmPassword && this.newPassword && this.oldPassword) {
                return false
            } else {
                return true
            }
        }
    },
    watch: {
       changePasswordStatus (newval) {
            if (newval) {
               toast.green('Success!!! now sign in with you new password')
               setTimeout(() => { this.$router.push({ name: 'log-in' })}, 1500)
            }
       }
    },
    methods: {
        updatePassword () {
           if (this.newPassword === this.confirmPassword) {
                this.$store.dispatch('changePassword', { old_password: this.oldPassword, new_password: this.newPassword })
           } else {
            return toast.red('password and confirm password must be equal')
           }
        },
        // toggle password
        toggleNewpassword () {
          this.showNewPassword = !this.showNewPassword
        },

        showScore(score) {
            console.log('score', score);

            this.passwordStrengthIndicator = '';
            if (score <= 1) {
                this.strongePassword = false
                this.passwordStrengthIndicator = 'Stronge Password required, Password is quite weak 😕'
            }
            //if password score is 2 : indicate fair
            else if (score === 2) {
                this.strongePassword = false
                this.passwordStrengthIndicator = 'Fair enough, but can be better 😐'
            }
            else {
                this.strongePassword = true
                this.passwordStrengthIndicator = 'Strong. Great! 😤'
            }

        },
    }
  }
</script>
<style lang="scss">
    .new-password {
        position: relative;
        margin-top: 30px;
        height: 80px;
    }
    .new-password__label {
        position: absolute;
        z-index: 1;
        top: 11px;
        left: 14px;
        font-size: 12px;
        color: #BFC7C5;
    }
    .Password__group {
        width: 100%;
        background: #FFFFFF;
        box-shadow: 0px 2px 10px rgba(131, 137, 160, 0.2);
        border-radius: 8px;
        padding: 11px 14px 6px;
    }
    .Password__group input {
       width: 80%;
       background-color: #FFFFFF;
       border: none;
       padding: 14px 0px 0px;
       outline: none;
       padding-top: 20px;

    }
    input::placeholder{
        font-size: 12px;
        color: #d4d4d4;
        @media (min-width: 400px) {
            font-size: 14px;           
        }
    }
    .Password__icons {
        display: none !important;
    }
    .new-password__icon {
        position: absolute;
        top: 15px;
        right: 14px;
        cursor: pointer;
    }
    .new-password__indicator {
        position: absolute;
        font-size: 12px;
        bottom: -13px;
    }
</style>