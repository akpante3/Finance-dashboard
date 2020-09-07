<template>
    <div>
        <div v-if="loading" class="loader-container">
            <div class="loader">
                <img src="../../../assets/images/spinner.svg" />
            </div>
        </div>
        <div class="settings-page" v-else>
            <div class="settings-page__header-text">Edit profile</div>
            <div class="settings-page__text">Update your profile information.</div>
            <div class="settings-page__input">
                <app-input type="number" label="FULL NAME" :placeholder="`${profileData.first_name} ${profileData.last_name}`" v-model="mobile" :disabled="true" />
                <app-input type="number" label="PHONE NUMBER" :placeholder="profileData.mobile ? profileData.mobile : ''" v-model="mobile" :disabled="true"/>
                <app-input type="text" label="EMAIL" :placeholder="profileData.email" :disabled="true" />
                <app-input type="text" label="DEPARTMENT" :placeholder="userDepartment(profileData.dept_id)" :disabled="true" />
                <app-input type="text" label="GENDER" :placeholder="profileData.gender === 'm'? 'Male' : 'Female'" v-model="gender" :disabled="true" /> 
                <app-input type="select" :selected="profileData.marital_status" label="MARITAL STATUS" :options="['married','single','divorced']" v-model="marital_status"/> 
            </div>
            <div class="settings-page__button">
            <button :disabled="disabledButton" class="app-btn app-btn--md app-btn--color-green" @click="editAccount">Save changes </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
  export default {
    name: 'settings-account',
    components: {},
    data() {
        return {
            full_name: '',
            mobile: '',
            department: '',
            gender: '',
            marital_status: '',
            loading: true,
            profileData: {},
            departments: []
        }
    },
    computed: {
     ...mapGetters(['userEditSuccess', 'userEditErrror', 'userProfile', 'getDepartment']),
     disabledButton () {
        if (this.profileData.marital_status !== this.marital_status && this.marital_status) {
           return false
        } else {
            return true
        }
     }
    },
    watch: {
        userEditSuccess () {
            this.loading = false
        },
        userEditErrror () {
          this.loading = false
        },
        userProfile (data) {
            this.loading = false
            this.profileData = data  
        },
        getDepartment (data) {
            this.departments = data
        }

    },
    created () {
        this.$store.dispatch('fetchDepartment')
        this.$store.dispatch('getUserProfile')
    },
    methods: {
        editAccount () {
            this.loading = true;
            const data = {
                marital_status: this.marital_status                
            }
            this.$store.dispatch('editUserProfile', data)
        },
        userDepartment (data) {
            if (this.departments.length) {
                const department = this.departments.filter(dept => dept.id === data)
                return department[0].name
            }
        }
    },
  }
</script>