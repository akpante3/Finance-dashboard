<template>
    <div class="notification-bell">
        <div class="notification-bell__bell">
            <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 24.75C8.26089 25.6387 9.07629 26.2492 10.0025 26.2492C10.9287 26.2492 11.7441 25.6387 12.005 24.75" stroke="#8B98AD" stroke-width="1.64" stroke-linecap="round" stroke-linejoin="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6C14.1421 6 17.5 9.35786 17.5 13.5C17.5 20.546 19 21.75 19 21.75H1C1 21.75 2.5 19.834 2.5 13.5C2.5 9.35786 5.85786 6 10 6Z" stroke="#8B98AD" stroke-width="1.64" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 6C20.6569 6 22 4.65685 22 3C22 1.34315 20.6569 0 19 0C17.3431 0 16 1.34315 16 3C16 4.65685 17.3431 6 19 6Z" fill="#83BFFF"/>
            </svg>
            <div class="notification-bell__dropdown">
               <div class="notification-bell__dropdown-panel">


               </div>
            </div> 
        </div>    
    </div>
</template>

<script>
  export default {
    name: 'notification-bell'
  }
</script>