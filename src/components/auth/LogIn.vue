<template>
   <div class="auth auth-content">
       <div class="auth__text--header">Login to your account</div>
       <div>
            <div class="input--mt input">
            <div class="input__left">
                <div class="input__label">Email</div>
                <input v-model="email" placeholder="user@example.com"/> 
            </div>
        </div>
        <app-input v-model="password" type="password" label="Password"  placeholder="Your Password"/> 
       </div>
        <div class="auth__footer">
            <div><span class="auth__forgot-password-link" @click="$router.push({ name: 'password-reset' })">Forgot password?</span></div>
            <div><button :disabled="disableButton" class="app-btn app-btn--color-green app-btn--lg" @click="loginUser">Log in</button></div>
        </div>
   </div>
</template>

<script>
//   import { mapGetters } from 'vuex'
  export default {
    name: 'logIn',
    data () {
        return {
            email: '',
            password: '',
            disableButton: false,
        }
    },
    computed: {
        // ...mapGetters(['loggedUser', 'logInError'])
    },
    watch: { },
    methods: {
        loginUser() {
            // reset login error data in the store 
            this.$store.commit('LOG_IN_ERROR', false )

            this.disableButton = true
            this.$store.dispatch('login', { email: this.email, password: this.password })
        }
    }
  }
</script>
