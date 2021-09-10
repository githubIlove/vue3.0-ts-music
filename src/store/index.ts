import { createStore } from 'vuex'

export default createStore({
  
  state: {
    playStrip:true,  //显示播放条
    tabShow:true,  //显示tab
    playNewSong:'',//播放音乐url
    changeSong:true,//监听是否点击了播放
    songUrlReady:false,//监听点击播放的音乐 url是否准备就绪
  },
  mutations: {
    playStripFun(state, val:boolean):void {
      state.playStrip = val
    },
    tabShowFun(state, val:boolean):void {
      state.tabShow = val
    },
    playNewSongFun(state):void {
      state.changeSong = !state.changeSong
    },
    songReadyFun(state):void {
      state.songUrlReady = !state.songUrlReady
    }
  },
  actions: {
  },
  modules: {
  }
})