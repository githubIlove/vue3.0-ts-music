<template>
  <div id="songList">
    <header class="header">
      <div class="content">
        <img :src="state.listDel.coverImgUrl" alt="">
        <div class="text_info">
          <div class="list_name">{{state.listDel.name}}</div>
          <div class="create_time">{{state.listDel.createTime}}</div>
        </div>
      </div>
    </header>
    <div class="music">
      <ul class="box">
        <li class="list" v-for="(item,i) in state.listDel.tracks" :key="item.id" @click="playBefore(item)">
          <div class="number">{{i+1}}</div>
          <div class="song_content">
            <div class="name over_one">{{item.name}}</div>
            <div class="singer over_one">{{item.ar[0].name}}-{{item.al.name}}</div>
          </div>
          <div class="operation"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive ,provide} from 'vue'

import { SongInfo } from '../api/interface/songList'
import { timeFilter } from '../utils/regular'
import { useRoute  } from "vue-router";

import { canPlay  } from "../utils/public";


export default defineComponent({
    setup(props,ctx) {
      const state = reactive({
        listDel: {},
      })
      const route = useRoute ()
      const songListId = route.params.id
      // const userId:number = JSON.parse(getStroage('user')).userId 
      async function songListDel(){
        const res = await SongInfo.getSongs(songListId)
        let data = res.data
        if(data.code == 200){
          data.playlist.createTime = timeFilter(data.playlist.createTime,2)
          state.listDel = data.playlist
        }
      }
      songListDel()
      function playBefore(val:any){
        canPlay(val)
      }

      // const handleLogin = async () => {
      //   const res = await Song.getAllSong(state.id)
      // }
      return {
        state,
        playBefore
        // handleLogin,
        // songList
      }
    },
})
</script>

<style lang="scss" scoped>
@import "../assets/css/scss/mixin.scss";
#songList{
  .header{
    width: 100%;
    height: 7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 100%);
    .content{
      width: 90%;
      height: 5rem;
      display: flex;
      font-size: 0;
      img{
        width: 5rem;
        height: 100%;
        object-fit: cover;
        border-radius: .213rem;
      }
      .text_info{
        display: flex;
        padding-left: .64rem;
        flex-direction: column;
        justify-content: space-around;
        .list_name{
          font-size: $font_large_s;
          color: #3a3a3a;
        }
        .create_time{
          font-size: $font_large_s;
          color: #3a3a3a;
        }
      }
    }
  }
  .music{
    padding: .426rem .64rem 1.7rem .64rem;
    // @include background_color($background-color-white);
    background: #d7e2cb;
    .list{
      border-bottom: 1px solid #ececec;
      display: flex;
      padding: .213rem 0;
      align-items: center;
      .number{
        flex: .15;
        text-align: center;
        color: black;
        font-size: $font_little;
      }
      .song_content{
        flex: .65;
        display: flex;
        flex-direction: column;
        color: black;
        padding-left: .426rem;
        .name{
          font-size: $font_little;
          margin-bottom: .213rem;
        }
        .singer{
          font-size: $font_little_s;
        }
      }
      .operation{
        flex: .2;
      }
    }
  }
}

</style>