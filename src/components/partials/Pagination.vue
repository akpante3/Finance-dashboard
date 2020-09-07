<!--pagination-->
<template>
    <div class="pagination pagination--pageContext">
        <div class="pagination__container flex-container flex-container--start-x">
            <!-- pagination content -->
            <div class="pagination__content__left hide-on-small-screen">
                <!--{{transferProp.pagination.current_page}}-->
                <div class="positionRelative pagination__current-page">
                    <span class="showing-text">Page</span>
                    <input id="currentPage" class="form__input form__input--fake-padding" @keyup.enter="setUrlParams(paginationData.currentPage, null)" v-model="paginationData.currentPage"/>
                </div>
                <div class="pagination__total-pages">of {{formatCount(paginationData.totalPages)}} pages </div>
                <!--{{paginationData.totalPages}}-->
                <div class="pagination__current-limit select">
                    <span class="showing-text">Showing</span>
                    <select name="" id="" class="select__input select__input--sm select__input--fake-padding" v-model="perPageSelected" @change="setUrlParams(null, perPageSelected)" :disabled="paginationProp.disableLimit">
                        <option value="" disabled>Page numbers</option>
                        <option value="10"> 10 per page</option>
                        <option value="20"> 20 per page</option>
                        <option value="30"> 30 per page</option>
                        <option value="40"> 40 per page</option>
                        <option value="50"> 50 per page</option>
                    </select>
                    <div class="select__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10"><path fill-rule="evenodd" d="M6.03 3.03L3.025.025.02 3.03h6.01zM5.88 7.071L2.975 9.975.07 7.07H5.88z" fill="#42476f"></path></svg>
                    </div>
                </div>
            </div>

            <div class="pagination__content__right flex-container">

                <!-- Pagination item -->
                <div class="pagination__item pagination__item--prev">
                    <!-- pagination prev link -->
                    <button class="pagination__item__link no--border-radius--all" :disabled="isFirstPage()" @click="setUrlParams(paginationData.currentPage - 1, null)">
                        <svg enable-background="new 0 0 31.494 31.494" version="1.1" viewBox="0 0 31.494 31.494" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                            <path d="m10.273 5.009c0.444-0.444 1.143-0.444 1.587 0 0.429 0.429 0.429 1.143 0 1.571l-8.047 8.047h26.554c0.619 0 1.127 0.492 1.127 1.111s-0.508 1.127-1.127 1.127h-26.554l8.047 8.032c0.429 0.444 0.429 1.159 0 1.587-0.444 0.444-1.143 0.444-1.587 0l-9.952-9.952c-0.429-0.429-0.429-1.143 0-1.571l9.952-9.952z" fill="#1E201D"/>
                        </svg>
                    </button>
                </div>

                <!-- Pagination item -->
                <div v-for="number in 11" :key="number" >
                    <div v-if="getPaginationCount(number)" class="pagination__item">
                        <!-- pagination link -->
                        <button class="pagination__item__link" :class="{'active':paginationData.currentPage === getPaginationCount(number)}" @click ="setUrlParams(getPaginationCount(number), null)">{{getPaginationCount(number)}}</button>
                    </div>
                </div>

                <!-- Pagination item -->
                <div class="pagination__item pagination__item--next">
                    <!-- pagination next link -->
                    <button class="pagination__item__link no--border-radius--all" :disabled="isLastPage()" @click="setUrlParams(paginationData.currentPage + 1, null)">
                        <svg enable-background="new 0 0 31.49 31.49" version="1.1" viewBox="0 0 31.49 31.49" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                            <path d="m21.205 5.007c-0.429-0.444-1.143-0.444-1.587 0-0.429 0.429-0.429 1.143 0 1.571l8.047 8.047h-26.554c-0.619 1e-3 -1.111 0.493-1.111 1.112s0.492 1.127 1.111 1.127h26.554l-8.047 8.032c-0.429 0.444-0.429 1.159 0 1.587 0.444 0.444 1.159 0.444 1.587 0l9.952-9.952c0.444-0.429 0.444-1.143 0-1.571l-9.952-9.953z" fill="#1E201D"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .panel__pagination{
        z-index:2;
        position:relative;
    }
</style>

<script>
    import { queryList } from '../../utils/utils'

    export default {

        mounted(){
            if(this.paginationData.perPage >= 10){
                this.perPageSelected = this.paginationData.perPage;
            }
            console.log('pageInfo',this.paginationData);
        },

        data(){
            return{
                perPageSelected:10,
                pageNumber:1,
            }
        },

        computed:{
            paginationData(){
                return{
                    perPage:this.paginationProp.pageData.pageSize,
                    currentPage: JSON.parse(this.paginationProp.pageData.currentPage),
                    totalPages: this.paginationProp.pageData.totalPages,
                }

            },
            paginationStart(){
                if(this.paginationData.currentPage > 6){
                    return this.paginationData.currentPage - 6;
                }
                else{
                    return 0;
                }
            },

        },


        props: [
            'paginationProp'
        ],

        methods:{
            setUrlParams(page, per_page){
                let pageObject = {
                    paginationNumber: page == null?this.paginationData.currentPage: page,
                    pageLimit: per_page == null?this.paginationData.perPage: per_page,
                };

                let currentRoute = this.$route.path;
                let queryParam = this.serialize(queryList(this.$route, pageObject));

                this.$router.replace(`${currentRoute}?${queryParam}`)
            },

            isFirstPage(){
                return this.paginationData.currentPage === 1
            },

            isLastPage(){
                return this.paginationData.currentPage === this.paginationData.totalPages
            },

            //get pagination count
            getPaginationCount(number){
                let pageNumbers = this.paginationStart + number;
                if(pageNumbers > this.paginationData.totalPages){
                    return false;
                }
                return pageNumbers;
            },
            formatCount: function (x) {
                return (x) ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
            },
            serialize(obj) {
                let str = [];
                for (let p in obj)
                    if (Object.prototype.hasOwnProperty.call(obj, p)) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                return str.join("&");
            },
        }

    }
</script>

