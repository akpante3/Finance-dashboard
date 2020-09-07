// import { authenticateUser } from '@/utils/utils'
import moment from 'moment'
import axios from 'axios'

export default {
  methods: {
      formatMoney (x) {
        return (x) ? x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
      },
      formatDate (date) {
        return moment(date).format('MM/DD/YYYY');
      },
      logOut () {
        localStorage.clear();
        this.$router.push({name: 'log-in'})
      },
      formatCardNumber (str) {
        return str.match(/.{1,4}/g)
      },
      fromNowDateFormat (data) {
        return moment(data).fromNow(Date.now());
      },
      forceFileDownload(response){
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', 'file.png') //or any other extension
          document.body.appendChild(link)
          link.click()
      },

      downloadTransactionReceipt (data) {
          const instance = axios.create();

          instance({
              method: 'Get',
              url: data,
              responseType: 'arraybuffer',
          })
          .then(response => {
              this.forceFileDownload(response)
          })
          .catch(() => console.log('error occured'))
      }
    },
}