import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './api/axios.ts'
import './assets/css/icon/iconfont.css'

import "./assets/css/style.css"
import './assets/css/scss/mixin.scss'

import '../static/js/self'

import { Button,Tabbar, TabbarItem } from 'vant';

import 'vant/lib/button/style'
import 'vant/lib/tabbar/style'
import 'vant/lib/tabbar-item/style'

const app = createApp(App);

app.use(Button)
app.use(Tabbar)
app.use(TabbarItem)


app.use(store).use(router).mount('#app')
