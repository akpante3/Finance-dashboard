<template>
    <div class="side-bar">
        <div class="side-bar__links">
            <div 
                @click="$router.push({ name: 'dashboard-home' })" 
                :class="['side-bar__link' , $route.name === 'dashboard-home'? 'active-bar-link': '' ]"
            >
                <div class='side-bar__link__item'>
                    Home
                </div>
            </div>
            <div 
                @click="$router.push({ name: 'dashboard-card' })"
                :class="['side-bar__link' , $route.name === 'dashboard-card'? 'active-bar-link': '' ]"
            >
                <div  class="side-bar__link__item">
                    Card
                </div>
            </div>
            <div 
                :class="['side-bar__link', $route.path.includes('/dashboard/transactions') ? 'active-bar-link': '']"
                @click="$router.push({ name: 'dashboard-transactions' })"
            >
                <div class="side-bar__link__item">
                    Transactions
                </div>
            </div>
            <div
                @click="$router.push({ name: 'dashboard-settings' })"
                :class="['side-bar__link', $route.path.includes('/dashboard/settings') ? 'active-bar-link': '']">
                <div class="side-bar__link__item">
                    Settings  
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'side-bar'
  }
</script>