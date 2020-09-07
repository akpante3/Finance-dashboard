<template>
    <div class="modal fade" id="CardReplacementRequest" tabindex="-1" role="dialog" aria-labelledby="ModalCardReplacementRequest" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ModalreportCardLost">Card replacement request</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="modal-body__item">
                        When you request for a new card, the admin will deactivate your current card. Proceed?
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="app-btn app-btn--md" data-dismiss="modal">Cancel</button>
                    <button type="button" class="app-btn app-btn--md app-btn--color-green" data-toggle="modal" data-target="#requestForAReplacementCard" data-dismiss="modal">Proceed</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'modal',
  }
</script>