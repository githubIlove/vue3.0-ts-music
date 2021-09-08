import { createStore } from 'vuex'

export default createStore({
  
  state: {
    playStrip:true,  //显示播放条
    tabShow:true,  //显示tab
  },
  mutations: {
    playStripFun(state, val:boolean):void {
      state.playStrip = val
    },
    tabShowFun(state, val:boolean):void {
      state.tabShow = val
    },
  },
  actions: {
  },
  modules: {
  }
})
