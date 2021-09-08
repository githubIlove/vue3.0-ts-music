<template>
  <div id="page">
    <!-- <button @click="handleLogin">cline me</button> -->
    <h2>我的歌单</h2>
    <ul class="ul over_one">
      <li v-for="song in state.songListArr" :key="song.id" class="li" @click="listDetail(song)">
        <img class="song_picture" :src="song.coverImgUrl" >
        <div class="song_name over_one">{{song.name}}</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue'

import {Song} from '../api/interface/index'
import { getStroage } from '../utils/regular'

import { useRouter } from "vue-router";
export default defineComponent({
    setup() {
      const state = reactive({
        id: '6452',
        songListArr:[]
      })

      const router = useRouter()
      const userId:number = JSON.parse(getStroage('user')).userId 


      
      async function songList(){
        const res = await Song.songList(userId)
        let data = res.data
        if(data.code == 200){
          state.songListArr = data.playlist
        }
      }
      songList()




      function listDetail(value:any):void{
        router.push({name:'SongList',params:{id:value.id}})  //不配置路由  刷新会丢失参数   配置路由后  url :  xxx/123456
        // router.push({name:'SongList',query:{id:value.id}})   //不需要配置路由  参数会跟在url后面   url :  xxx?id=123456
        // router.query({name:'SongList',query:{id:value.id}})   //error  不存在这个方法了
      }

      return {
        state,
        // handleLogin,
        songList,
        listDetail
      }
    },
})
/**
 * 传参方法笔记
 * router.push({
    name:'SongList',  //或者使用path  但是params不生效
    params:{   // 类似 post 不会留在url    刷新页面会丢失   可以在路由上配置 path:'/xxx/:id'
      id:value.id
    }
  })

  router.push({
    name:'SongList',  
    query:{    // query  类型get传参  会保留在url上
      id:value.id
    }
  })
  * 
  * 补充   
  * router.query   可以使用path或name 匹配路由  刷新页面不会丢失参数
  * router.params  只能用name   否则会获取不到参数  需要配置路由 path:'/xxx/:id'
  * router.replace   不会留下历史栈
  * router.go  前进或后退几个页面
  */
</script>

<style lang="scss" scoped>
@import "../assets/css/scss/mixin.scss";
#page{
  padding:.64rem;
  h2{
    font-size: $font_large;
  }
  .ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .li{
      content: '';
      width: 29%;
      margin-bottom: .64rem;
      box-shadow: 0 0 4px #636363;
      border-radius: 0.213rem;
      font-size: 0;
      .song_picture{
        width: 100%;
        // height: 2rem;
        margin-bottom: .426rem;
        border-radius: .213rem;
      }
      .song_name{
        font-size: $font_little;
      }
    }
    &:after{
      content: ""; 
      width: 29%;
    }
  }
}
</style>