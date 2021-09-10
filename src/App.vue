<template>
    <div id="app">
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
