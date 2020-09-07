<template>
    <div class="modal fade" id="retireTransactionModal" tabindex="-1" role="dialog" aria-labelledby="ModalRetireTransaction" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="ModalRetireTransaction">Retire Transaction</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div>
                    <div class="modal-body__item">
                        <div>Transaction amount</div>
                        <div>₦ {{ formatMoney(transaction.amount) }}</div>
                    </div>
                    <div class="modal-body__item">
                        <!-- <app-input type="select" v-model="transactionPurpose" label="PURPOSE OF TRANSACTION" placeholder="purpose" :options="expensecode" />  -->
                        <app-input type="search-select" label="PURPOSE OF TRANSACTION" :options="expensecode" v-model="transactionPurpose" placeholder="Search option"/> 
                        <app-input type="text" v-model="transactionComment" label="Comment" placeholder="Enter your comment here..."/> 
                    </div>
                    <div class="modal-body__item">
                        <div>Receipt upload</div>
                        <div class="receipt-upload">
                            <div class="receipt-upload__icon">
                                    <img src="../../../assets/images/upload_icon.svg" />
                                </div>
                                <div class="receipt-upload__button"> 
                                    <button class="app-btn app-btn--sm" @click="triggerModal" :disabled="uploaded" >
                                        <span v-if="uploaded">Uploaded</span>
                                        <span v-else>Upload receipt</span>
                                    </button>
                                </div>
                        </div>
                        <div class="receipt-upload-item" v-if="uploaded">
                            <div class="receipt-upload-item__name">{{ uploadedFilename }}</div>
                            <div class="receipt-upload-item__icon" @click="clearUpload">&times;</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="app-btn app-btn--md app-btn--bg-white" data-dismiss="modal">Cancel</button>
                <button :disabled="buttonDisable" type="button" class="app-btn app-btn--md app-btn--color-green" @click="submitRetirement">Retire</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as filestack from 'filestack-js';
    import helperMixin from '../../../mixins/helperMixin'
    import { mapGetters } from 'vuex';

    export default {
        name: 'RetireTransactionModal',
        data () {
            return {
               uploadedFile: '',
               transactionPurpose: '',
               transactionComment: '',
               expensecode: [],
               uploaded: false,
               uploadedFilename: ''
            }
        },
        props:['transaction'],
        computed: {
           ...mapGetters(['newRetirement', 'getExpenseCode']),
            buttonDisable () {
               if(!this.uploadedFile || !this.transactionPurpose ) {
                    return true
               } else {
                    return false
               }
            },

        },
        mixins:[helperMixin],
        created() {
           this.$store.dispatch('fetchExpenseCode')
        },
        watch: {
            newRetirement(newVal) {
                if (newVal) {
                    this.$router.go(0)
                }
            },
            getExpenseCode(newval) {
              if (newval) {
                const list = newval.map((code) => {
                    return { code: code.uid, label: code.name }
                })
                const listExpected = list.sort((a, b) => {
                    var nameA = a.label[0].toUpperCase(); // ignore upper and lowercase
                    var nameB = b.label[0].toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }

                    // names must be equal
                    return 0;
                });
                this.expensecode = [...listExpected]
              }
            },
            uploadedFile () {
                if (this.uploadedFile) { 
                    this.uploaded = true
                } else {
                    this.uploaded = false
                }
                      
            }
        },
        methods: {
            triggerModal () {
                let key = process.env.FILE_STACK_KEY || 'A7cQku57kRoGAs6V4DTD6z'
                const client = filestack.init(key);
                let vm = this;
                client.picker({
                    uploadInBackground: false,
                    onUploadDone: res => {
                        vm.uploadedFilename = res.filesUploaded[0].originalFile.name
                        vm.uploadedFile = res.filesUploaded[0].url
                    }
                }).open()
            },

            submitRetirement () {
                const payload = {
                    transaction_id: this.transaction.id,
                    expense_code: this.transactionPurpose,
                    supporting_document: this.uploadedFile
                }
                this.$store.dispatch('postNewRetirement', payload)
            },

            clearUpload () {
                this.uploadedFile = ''
            }
        }
    }

</script>