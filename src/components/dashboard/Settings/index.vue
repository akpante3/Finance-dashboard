<template>
    <div class="dashboard-settings">
        <div class="dashboard-settings__header">
           <div class="dashboard-settings__header__text">Settings</div>
        </div>
        <div class="dashboard-settings__card card">
             <div class="dashboard-settings__card__header">
                <div
                    @click="$router.push({ name:'settings-account' })"
                    :class="['dashboard-settings__card__header__link', $route.name === 'settings-account' ?  'dashboard-settings__card__header__link--active' : '']"
                >Account</div>
                <div
                    @click="$router.push({ name:'settings-security' })"
                    :class="['dashboard-settings__card__header__link', $route.name === 'settings-security' ?  'dashboard-settings__card__header__link--active' : '']"
                >
                Security
                </div>
                <div 
                    @click="$router.push({ name:'account-statement' })"
                    :class="['dashboard-settings__card__header__link', $route.name === 'account-statement' ?  'dashboard-settings__card__header__link--active' : '']"
                >
                    Account statement
                    </div>
             </div>
             <div class="dashboard-settings__card__body">
                 <router-view></router-view>
             </div>

        </div>
    </div>
</template>

<script>
  export default {
    name: 'dashboard-settings',
    components: {
    }
  }
</script>