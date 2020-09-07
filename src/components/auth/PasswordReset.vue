<template>
    <div>
        <div class="auth auth-content" v-if="!resetPasswordStatus">
            <div class="auth__text--header">Password Reset</div>
            <div class="auth__text">
                No problem, just type in your e-mail and we’ll send you a link to create a new one.
            </div>
            <div class="input">
                <div class="input__left">
                    <div class="input__label" >Email</div>
                    <input type="email" placeholder="user@example.com" v-model="email"/> 
                </div>
            </div>
            <button :disabled="disableButton" class="app-btn app-btn--mt-40 app-btn--color-green app-btn--lg" @click="handlePasswordReset">Reset Password</button>
       </div>
        <div class="auth__success-message" v-else>
            A link has been sent to your email. Thank you           
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: 'passwordReset',
        data () {
            return {
                email: '',
                disableButton: false
            }
        },
        computed: {
            ...mapGetters([
                'resetPasswordStatus',
                'resetPasswordError'
            ])
        },
        watch: {
          resetPasswordStatus () {
            this.disableButton = false
          },
          resetPasswordError () {
            this.disableButton = false             
          }
        },
        methods: {
            handlePasswordReset () {
                this.disableButton = true
                return this.$store.dispatch('resetPassword', { email: this.email })
            }
        }
    }
</script>