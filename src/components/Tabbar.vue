<template>
    <div class="tabbar">
        <PlayMusic v-if="state.playStripStatus" :show="state.tabShowStatus"></PlayMusic>
        <footer class="footer" v-if="state.tabShowStatus">
            <div v-for="tab in tabbars" :key="tab.id" @click="changeTab(tab)" >
                <router-link :to="tab.pathUrl" >
                    <i :class="active == tab.id?tab.active:tab.inactive " class="iconfont"></i>
                    <div>{{tab.name}}</div>
                </router-link>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref,reactive, watch,computed ,watchEffect} from 'vue'
import { useRouter } from "vue-router";
import { changeTabbar } from "../typings/type"
import { useStore } from 'vuex'

import PlayMusic from './PlayMusic.vue'
export default defineComponent({
    components:{
        PlayMusic
    },
    setup() {
        const tabbars = [
            {
                id:0,
                path:'index',
                name:'发现',
                active:'icon-yinle',
                inactive:'icon-yinle1',
                pathUrl:'/',
            },
            {
                id:1,
                path:'broadcasting',
                name:'电台',
                active:'icon-diantai2',
                inactive:'icon-diantai',
                pathUrl:'/broadcasting',
            },
            {
                id:2,
                path:'attention',
                name:'关注',
                active:'icon-yiguanzhu',
                inactive:'icon-guanzhu',
                pathUrl:'/attention',
            },
            {
                id:3,
                path:'personal',
                name:'我的',
                active:'icon-wodedangxuan',
                inactive:'icon-wodexianxing',
                pathUrl:'/personal',
            },
        ] 


        var active = ref<number>(0);
        const state = reactive({
            playStripStatus:true,
            tabShowStatus:true
        })
        const router = useRouter()
        const store = useStore()

        var tabShow = computed(():boolean => {
            return store.state.tabShow
        })
        var playStrip = computed(():boolean => {
            return store.state.playStrip
        })

        watch(
            [
                playStrip,
                tabShow,
            ],
            ([newplayStrip,newtabShow])=>{
                state.playStripStatus = newplayStrip
                state.tabShowStatus = newtabShow
            },
            {
                immediate: true
            }
        )
      
        function changeTab(res: changeTabbar): void {
            // res.path == 'index' ? router.push(`/`) : router.push(`/${res.path}`) ;
            active.value =  res.id
        }
            
        return { 
            state,
            active,
            tabbars,
            changeTab,
            tabShow,
        };
    },
})
</script>

<style scope  lang="scss">
@import "../assets/css/scss/mixin.scss";
html,body{
    @include background_color($background-color-theme2);
}
.tabbar{    
    position: fixed;
    bottom: 0;
    width: 100%;
}
.footer{
    display: flex;
    height: 2.13rem;
    padding: 0 1.24rem;
    font-size: $font_little_s;
    justify-content: space-between;
    align-items: center;
    @include background_color($background-color-theme1);
    i{
        font-size: $font_medium_s;
    }
    div{
        text-align: center;
    }

    a {
        @include font_color($font-color-theme3);
        &.router-link-exact-active {
            @include font_color($font-color-theme1);
        }
    }
}

#nav {
    padding: 30px;
}

</style>
