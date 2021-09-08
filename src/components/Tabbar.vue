<template>
    <div class="tabbar">
        <PlayMusic></PlayMusic>
        <footer class="footer">
            <div v-for="tab in tabbars" :key="tab.id" @click="changeTab(tab)">
                <i :class="active == tab.id?tab.active:tab.inactive " class="iconfont"></i>
                <div>{{tab.name}}</div>
            </div>
        </footer>

        <!-- <van-tabbar v-model="active" @change="onChange">
            <van-tabbar-item name="index" icon="home-o">发现</van-tabbar-item>
            <van-tabbar-item>
                <span>发现</span>
                <template #icon_index="props">
                    <img :src="props.active ? icon.active : icon.inactive" />
                </template>
            </van-tabbar-item>


            <van-tabbar-item name='broadcasting' icon="search">电台</van-tabbar-item>
            <van-tabbar-item name="attention" icon="friends-o">关注</van-tabbar-item>
            <van-tabbar-item name="personal" icon="setting-o">我的</van-tabbar-item>
        </van-tabbar> -->
    </div>
</template>

<script lang="ts">
import { defineComponent,ref,reactive, watch,computed } from 'vue'
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
            },
            {
                id:1,
                path:'broadcasting',
                name:'电台',
                active:'icon-diantai2',
                inactive:'icon-diantai',
            },
            {
                id:2,
                path:'attention',
                name:'关注',
                active:'icon-yiguanzhu',
                inactive:'icon-guanzhu',
            },
            {
                id:3,
                path:'personal',
                name:'我的',
                active:'icon-wodedangxuan',
                inactive:'icon-wodexianxing',
            },
        ] 


        var active = ref<number>(0);
        const state = reactive({
            
        })
        

        
        const router = useRouter()
        const store = useStore()
        var tabShow = ref<boolean>(store.state.tabShow ) 

        watch(tabShow, (newVal,oldVal)=>{
            console.log(newVal,oldVal)
        })

        // const nextAge = computed(() => {
        //     return tabShow
        // })
        // console.log(nextAge)


        function changeTab(res: changeTabbar): void {
            res.path == 'index' ? router.push(`/`) : router.push(`/${res.path}`) ;
            active.value =  res.id
        }

            
        return { 
            active,
            tabbars,
            changeTab,
            tabShow
        };
    },
})
</script>

<style scope  lang="scss">
@import "../assets/css/scss/mixin.scss";
.footer{
    display: flex;
    height: 2.13rem;
    padding: 0 1.24rem;
    font-size: $font_little_s;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: calc(100% - 2.48rem);
    @include font_color($font-color-white);
    @include background_color($background-color-white);
    i{
        font-size: $font_medium_s;
    }
    div{
        text-align: center;
    }
}
</style>
