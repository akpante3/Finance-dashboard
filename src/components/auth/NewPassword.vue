<template>
   <div class="auth auth-content">
       <div class="auth__text--header">New Password</div>
       <div class="auth__text">
           To complete your account setup, you need to create your login password.
       </div>
        <div class="new-password">
            <div  class="new-password__label">Password</div>
            <password v-model="password" :secureLength=8 :showPassword="showNewPassword" placeholder="Your New Password" @score="showScore" />
            <span class="new-password__indicator">{{ passwordStrengthIndicator }}</span>
            <div class="new-password__icon" @click="toggleNewpassword">
                <span>
                    <img src="../../assets/images/password_icon.svg" />
                </span>
            </div>
        </div>  
       <button :disabled="disableButton" class="app-btn app-btn--mt-40 app-btn--color-green app-btn--lg" @click="completeSetup">Complete setup</button>
   </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import toast from '../../utils/toast';
    import Password from 'vue-password-strength-meter'

    export default {
        name: 'newPassword',
        data() {
            return {
                password: '',
                buttonDisable: false,
                passwordStrengthIndicator: '',
                showNewPassword: false,
                strongePassword: false,
            }
        },
        watch: {
            confirmationTokenError (val) {
                if (val) {
                    // this.$nprogress.done()
                    this.buttonDisable = false
                }
            }
        },
        computed: {
            ...mapGetters(['confirmationTokenError']),
            disableButton () {
                if ( this.password && this.strongePassword ){
                    return false
                } else {
                    return true
                }
            }
        },
        components: { Password },
        methods: {
            completeSetup () {
                if(this.password.length > 0) {
                    this.buttonDisable = true
                    this.$store.dispatch('confirmToken', { token: this.$route.params.token, password: this.password, type: 'user_conf' })              
                } else {
                    toast.red('Password is required')
                }
            },
            toggleNewpassword () {
                this.showNewPassword = !this.showNewPassword
            },
            showScore(score) {
                console.log('score', score);

                this.passwordStrengthIndicator = '';
                if (score <= 1) {
                    this.strongePassword = false
                    this.passwordStrengthIndicator = 'Stronge Password required, Password is quite weak 😕'
                } else if (score === 2) {
                    this.strongePassword = false
                    this.passwordStrengthIndicator = 'Fair enough, but can be better 😐'
                } else {
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