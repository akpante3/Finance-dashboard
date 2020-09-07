<template>
   <div class="auth auth-content">
       <div class="auth__text--header">Password Reset</div>
       <div class="auth__text">
           To complete the password reset process, input a new password.
       </div>
        <app-input v-model="password" type="password" label="Password"  placeholder="New Password"/>
        <app-input v-model="confirmPassword" type="password" label="Confirm Password"  placeholder="Confirm New Password"/> 
       <button :disabled="buttonDisable" class="app-btn app-btn--mt-40 app-btn--color-green app-btn--lg" @click="completeSetup">Complete setup</button>
   </div>
</template>

<script>
    import AppInput from '../partials/AppInput';
    import { mapGetters } from 'vuex';
    import toast from '../../utils/toast';

    export default {
        name: 'resetPassword',
        data() {
            return {
                password: '',
                confirmPassword: '',
                buttonDisable: false,
            }
        },
        watch: {
            confirmationTokenError (val) {
                if (val) {
                   this.buttonDisable = false
                }
            }
        },
        computed: {
            ...mapGetters(['confirmationTokenError'])
        },
        components: {
            'app-input': AppInput
        },
        methods: {
            completeSetup () {
                if(!this.password.length) {
                    toast.red('Password is required')         
                } else if (this.password !== this.confirmPassword) {
                    toast.red('Password and Confirm-Password must be equal')
                } else {
                    this.buttonDisable = true
                    this.$store.dispatch('confirmToken', { token: this.$route.params.token, password: this.password, type: 'pass_reset' })     
                }
            }
        }
    }
</script>