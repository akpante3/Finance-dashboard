<template>
<div>
    <Nav />
    <div class="dashboard">
        <span class="dashboard__side-bar">
            <SideBar />
        </span>
        <div class="dashboard__pages">
            <router-view />
        </div>
    </div>
</div>
</template>

<script>
import Nav from '../Nav.vue';
import SideBar from '../partials/SideBar.vue';


  export default {
    name: 'home',
    components: {
        Nav,
        SideBar
    }
  }
</script>