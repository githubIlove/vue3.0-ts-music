import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './api/axios.ts'
import './assets/css/icon/iconfont.css'

import "./assets/css/style.css"
import './assets/css/scss/mixin.scss'

import '../static/js/self'

import { Button,Tabbar, TabbarItem, Toast } from 'vant';

import 'vant/lib/button/style'
import 'vant/lib/tabbar/style'
import 'vant/lib/tabbar-item/style'
import 'vant/lib/toast/style'


const app = createApp(App);

app.use(Button)
app.use(Tabbar)
app.use(TabbarItem)
app.use(Toast)


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    
    if(to.meta.tabShow){
        store.commit('tabShowFun', true)
    }else{
        store.commit('tabShowFun', true)
    }
    if(to.meta.playStrip){
        store.commit('playStripFun', true)
    }else{
        store.commit('playStripFun', false)
    }
    next()
});



app.use(store).use(router).mount('#app')
