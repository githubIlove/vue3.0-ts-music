<template>
    <div id="app">
        <!-- 
            动态显示底部状态
            1. meta: { navShow: true, cname: '一级页面' }, 在路由中添加
            2.vuex
            3.router-view
         -->
        <tabbar></tabbar>
        <router-view/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import tabbar from './components/Tabbar.vue'


export default defineComponent({
    components:{
        tabbar,
        
    },
    setup() {
        
    },
})
</script>


<style lang="scss">

#app {
    width: 100%;
    height: 100%;
}

// #nav {
//     padding: 30px;
//     a {
//         font-weight: bold;
//         color: #2c3e50;

//         &.router-link-exact-active {
//         color: #42b983;
//         }
//     }
// }
</style>
