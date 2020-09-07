<template>
    <div class="nav-container" v-click-outside="handleOutsideClick"> 
        <div class="app-nav">
            <div class="app-nav__logo">
                <div class="app-nav__side-bar-toggle" @click="toggleSideBar">
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.2606 9.13147H0.73938V11.4143H13.2606V9.13147Z" fill="black"/>
                        <path d="M13.2606 4.63489H0.73938V6.91776H13.2606V4.63489Z" fill="black"/>
                        <path d="M13.2606 0H0.73938V2.28287H13.2606V0Z" fill="black"/>
                    </svg>           
                </div>
                <img src="../assets/images/logo.svg" />
            </div>
            <div class="app-nav__right">  
                <div class="app-nav__right__item">
                    <span @click="toggleNotification" class="notification__drop-down__bell">
                        <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 24.75C8.26089 25.6387 9.07629 26.2492 10.0025 26.2492C10.9287 26.2492 11.7441 25.6387 12.005 24.75" stroke="#8B98AD" stroke-width="1.64" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10 6C14.1421 6 17.5 9.35786 17.5 13.5C17.5 20.546 19 21.75 19 21.75H1C1 21.75 2.5 19.834 2.5 13.5C2.5 9.35786 5.85786 6 10 6Z" stroke="#8B98AD" stroke-width="1.64" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19 6C20.6569 6 22 4.65685 22 3C22 1.34315 20.6569 0 19 0C17.3431 0 16 1.34315 16 3C16 4.65685 17.3431 6 19 6Z" fill="#83BFFF"/>
                        </svg>
                    </span>
                     <div class="notification__drop-down" v-show="showNotification"> 
                        <div class="notification__drop-down__drop-down-panel" v-if="userNotification">
                            <div class="notification__drop-down__drop-down-panel__item-wrapper">
                                <div class="notification__drop-down__drop-down-panel__item" v-for="notification in userNotification" :key="notification.id">
                                    <div>
                                        <div v-if="notification.type === 'success'">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.99998 0.5C4.4774 0.5 0 4.97722 0 10.5C0 16.0227 4.4774 20.5 9.99998 20.5C15.5232 20.5 20 16.0227 20 10.5C20 4.97722 15.523 0.5 9.99998 0.5ZM8.16557 15.6368L3.76237 11.2338L5.22998 9.76615L8.16557 12.7016L14.77 6.09696L16.2376 7.56457L8.16557 15.6368Z" fill="#1AA152"/>
                                            </svg>
                                        </div>
                                        <div v-else-if="notification.type === 'warning'">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0.5C4.5 0.5 0 5 0 10.5C0 16 4.5 20.5 10 20.5C15.5 20.5 20 16 20 10.5C20 5 15.5 0.5 10 0.5ZM11 15.5H9V13.5H11V15.5ZM11 11.5H9V5.5H11V11.5Z" fill="#F5A621"/>
                                            </svg>
                                        </div>
                                        <div v-else-if="notification.type === 'danger'">
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0.5C4.48607 0.5 0 4.98607 0 10.5C0 16.0139 4.48607 20.5 10 20.5C15.5139 20.5 20 16.0139 20 10.5C20 4.98607 15.5139 0.5 10 0.5ZM15 11.75H5V9.25001H15V11.75Z" fill="#D01D1B"/>
                                            </svg>
                                        </div>
                                        <div v-else>
                                            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 0.595739C4.53912 0.595739 0.0958609 5.03846 0.095861 10.4999C0.0958609 15.9613 4.53885 20.4037 10 20.404C15.4611 20.4043 19.9041 15.9613 19.9041 10.4999C19.9039 5.03873 15.4609 0.595739 10 0.595739ZM15.5234 10.4999C15.5234 10.9206 15.1824 11.2616 14.7616 11.2616L10.7617 11.2616L10.7617 15.4517C10.7617 15.8724 10.4207 16.2134 10 16.2134C9.57927 16.2134 9.23827 15.8724 9.23827 15.4517V11.2616L5.23836 11.2616C4.81763 11.2616 4.47636 10.9203 4.47663 10.4999C4.47663 10.0791 4.81763 9.73815 5.23836 9.73815L9.23827 9.73814L9.23827 5.92894C9.23827 5.50821 9.57927 5.16721 10 5.16721C10.4207 5.16721 10.7617 5.50821 10.7617 5.92894L10.7617 9.73815L14.7616 9.73814C15.1824 9.73814 15.5234 10.0791 15.5234 10.4999Z" fill="#057700"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div class="notification__drop-down__drop-down-panel__item__text">
                                        <div class="notification__drop-down__drop-down-panel__item__text__comment">
                                            {{ notification.comment }}
                                        </div>
                                        <div class="notification__drop-down__drop-down-panel__item__text__date">
                                            {{ notificationDateFormat(notification.ts) }}
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>                     
                     </div>
                </div>
                <div class="app-nav__right__user-image app-nav__right__item" >
                    <!-- <canvas id="avatar"></canvas> -->
                    <!-- <div class="avatar-initials-wrapper"> -->
                        <div class="avatar-initials">
                            <div>{{avatarInitails}}</div>
                        </div>
                    <!-- </div> -->
                   <!-- <img src="https://ca.slack-edge.com/T12M936G1-UGNBQG73L-7e205f6c5c79-512" />  -->
                </div>
                <span class="app-nav__right__name">{{ firstName }} {{ lastName }}</span>
                <span class="app-nav__right__name app-nav__right__profile-drop-down-link" @click="toggleProfiledropdown">
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 1.5L6 5.5L1.5 1.5" stroke="#7C889D" stroke-width="1.64" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <div class="profile__drop-down" v-show="showProfileDropDown"> 
                    <div class="profile__drop-down__drop-down-panel">
                        <div class="profile__drop-down__drop-down-panel__item" @click="logOut">
                            LogOut
                        </div> 
                        <div class="profile__drop-down__drop-down-panel__item" @click="$router.push({ name: 'settings-account'})">
                           Profile
                        </div> 
                    </div>                     
                </div>
            </div>
        </div>
        <div :class="['nav-container__side-bar', showSideBar ? 'nav-container__side-bar--show' : 'nav-container__side-bar--hide']" >
            <div class="nav-container__side-bar__bar" @click="toggleSideBar">
               <SideBar />
            </div>
            <div class="nav-container__side-bar__background" @click="toggleSideBar"></div>
        </div>
    </div>
</template>

<script>
    import SideBar from './partials/SideBar';
    import { getUserDetails } from '../utils/utils';
    import { mapGetters } from 'vuex';
    import helperMixin from '../mixins/helperMixin'
    import moment from 'moment';

    export default {
        name: 'navBar',
        data () {
            return {
                showSideBar: false,
                firstName: '',
                lastName: '',
                showNotification: false,
                showProfileDropDown: false,
                userNotification:'',
                avatarInitails: ''
            }
        },
        components: {
            SideBar
        },
        mixins: [helperMixin],
        created () {
            this.$store.dispatch('getNotificationList')
        },
        computed: {
            ...mapGetters(['notificationList'])
        },
        watch: {
            notificationList (val) {
                
                this.userNotification = val.notifications;
            }
        },
        mounted () {
            this.firstName = getUserDetails().firstName
            this.lastName = getUserDetails().lastName
            this.mountAvatar()
        },
        methods: {
            mountAvatar () {
               this.avatarInitails = `${this.firstName[0]}${this.lastName[0]}`
            },
            handleOutsideClick () {
                this.showNotification = false
                this.showProfileDropDown = false
            },
            toggleSideBar () {
                this.showSideBar = !this.showSideBar
                this.showNotification = false
                this.showProfileDropDown = false
            },
            toggleNotification () {
                this.showNotification = !this.showNotification
                this.showProfileDropDown = false
            },
            toggleProfiledropdown () {
                this.showProfileDropDown = !this.showProfileDropDown
                this.showNotification = false
            },
            notificationDateFormat(data) {
               const date = new Date(data)
               return moment(date).fromNow(Date.now());
            }
        }
    }
</script>