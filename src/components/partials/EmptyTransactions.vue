<template>
    <!-- input -->
    <div class="empty-transaction">
        <div class="empty-transaction__header"> {{ header || '404' }} </div>
        <div class="empty-transaction__text"> {{ text || 'Page Not Found!' }} </div>
    </div>
</template>

<script>
  export default {
    name: 'app-input',
    props:['header', 'text']
  }
</script>