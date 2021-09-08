<template>
    <div class="play-music">
        <div class="content">
            <div class="left">
                <div class="music-picture">
                    <img src="../assets/image/timg.jpg" alt="">
                </div>
                <div class="music-name over_one">
                    <span class="singer">周杰伦</span>
                    &nbsp;-&nbsp;
                    <span class="song-title">七里香</span>
                </div>
            </div>
            <div class="right">
                <div class="play-pause">
                    <i :class="!state.playState?'icon-bofang':'icon-zanting'" class="iconfont " @click="playPrepare"></i>
                </div>
                <div class="stay-list">
                    <i class="iconfont icon-bofangliebiao"></i>
                </div>
            </div>
        </div>

        
    </div>
</template>

<script lang="ts">
import { defineComponent,ref,reactive, nextTick,toRefs ,effect,onMounted} from 'vue'

import { Song } from '../api/interface/playMusic'
import { Toast } from 'vant'

// import {playMusicData} from '../typings/type'

export default defineComponent({
    setup() {
        const state = reactive({
            songUrl : '',
            playState:false,
            audio:new Audio()
        })
        const audioRef = ''


        const singerSongs =  async () => {
            const res = await Song.singerTopSong('2116')
        }

        async function singer(){
            const res = await Song.singer()
        }

        function playPrepare (){
            if(state.playState){
                state.audio.pause()
                state.playState = false
                return
            }
            if(!state.playState && state.audio.src){
                state.audio.play()
                state.playState = true
                return
            }
            playSong()
        }   

        async function playSong(){
            const res = await Song.checkSong('66282')
            if(res.status == 200){
                const res_two = await Song.songUrl('66282')
                if(res_two.status == 200){
                    state.songUrl = res_two.data.data[0].url
                    state.audio.src = state.songUrl
                    state.audio.play()
                    state.playState = true
                }else{
                    Toast(res.data.message);
                }
            }else{
                Toast(res.data.message);
            }
        }
        

        return{
            playPrepare,
            singerSongs,
            playSong,
            singer,
            state,
            audioRef
        }
    },
    created(){
        // setTimeout(()=>{
        //     this.singerSongs()
        // },0)
    }
})
</script>

<style scope  lang="scss">
@import "../assets/css/scss/mixin.scss";
.play-music{
    display: flex;
    height: 1.7rem;
    font-size: $font_little_s;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 2.13rem;
    width: 100%;
    @include font_color($font-color-white);
    justify-content: center;
    // @include background_color($background-color-white);
    .content{
        background: linear-gradient(to right, #a8edea 0%, #fed6e3 100%);
        // background: linear-gradient(to right, #fa709a 0%, #fee140 100%);
        height: 100%;
        width: calc(100% - 1.2rem);
        border-radius:.21rem .85rem .85rem .21rem;
        display: flex;
        .left{
            display: flex;
            align-items: center;
            flex: .76;
            .music-picture{
                width: 1.92rem;
                height: 1.92rem;
                margin-top: -.213rem;
                display: flex;
                min-width: 1.92rem;
                align-items: center;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: .213rem .213rem 0 0;
                    object-fit: cover;
                }
            }
            .music-name{
                margin-left: .64rem;
            }
        }
        .right{
            display: flex;
            align-items: center;
            flex: .24;
            justify-content: space-evenly;
            .play-pause{
                i{
                    font-size: 1.11rem;
                }
            }
            .stay-list{
                i{
                    font-size: .938rem;
                }
            }
        }
    }
}
</style>
