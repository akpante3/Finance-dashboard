<template>
    <div class="settings-page">
        <div class="settings-page__header-text">Download Statement</div>
        <!-- input -->
        <div class="settings-page__input">
            <app-input v-model="from" type="date" label="START DATE" placeholder="1 Jan 2020"/> 
            <app-input v-model="to" type="date" label="END DATE" placeholder="1 Jan 2020"/> 
        </div>
        <div class="settings-page__button">
          <button class="app-btn app-btn--md app-btn--color-green" @click="downloadStatement" :disabled="disableButton"><a>Download Statement</a></button>
        </div>
    </div>
</template>
<script>
  import helperMixin from '../../../mixins/helperMixin';
  import toast from '../../../utils/toast';
  import { mapGetters } from 'vuex';
  export default {
    name: 'settings-security',
    data () {
      return {
        from: "",
        to: "",
        buttonDisabled: false,
      }
    },
    mixins:[helperMixin],
    created () {
      this.$store.dispatch('fetchUserCard')
    },
    components: {},
    computed: {
        ...mapGetters(['accountStatement', 'userCard']),
       disableButton () {
         if (!this.from || !this.to || this.buttonDisabled) {
           return true
         } else {
           return false
         }
       }
    },
    watch: {
      accountStatement (val) {
        this.buttonDisabled = false
        window.location.assign(`${val.url}`)
      }
    },
    methods: {
      downloadStatement () {
        if (this.userCard.card.card_ref) {
          this.buttonDisabled = true
          this.$store.dispatch('getAccountStatement', this.userCard.card.card_ref)
        } else {
          toast.red('no card avaliable for Account Statement')
        }
      }
    }
  }
</script>