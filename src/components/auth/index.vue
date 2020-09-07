<template>
   <div class="auth">
     <div class="auth__logo">
       <img src="../../assets/images/logo.svg" />
     </div>
      <div class="auth__auth-modal">
         <component :is="activeComponent"></component>
      </div>
   </div>
</template>

<script>
  import NewPassword from './NewPassword.vue'
  import LogIn from './LogIn'
  import PasswordReset from './PasswordReset'
  import UpdatePassword from './UpdatePassword'

  export default {
    name: 'authIndex',
    data () {
      return {
        activeComponent: 'log-in'
      }
    },
    mounted () {
      this.switchComponent()
    },
    watch: {
     '$route': 'switchComponent'
    },
    components: {
      'new-password': NewPassword,
      'log-in': LogIn,
      'password-reset': PasswordReset,
      'update-password': UpdatePassword,
    },
    methods: {
      switchComponent () {
        const names = ['new-password', 'log-in', 'password-reset', 'reset-password', 'update-password'];

        if (names.includes(`${this.$route.name}`)) {
            this.activeComponent = `${this.$route.name}`
        }
      }
    }
  }
</script>

