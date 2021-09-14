<template>
    <div class="play-music" :class="sinkBottom?'un_sink':'sink'">
        <div class="content_box">
            <div class="left">
                <div class="music-picture">
                    <img :src="state.picture" alt="">
                </div>
                <div class="music-name over_one">
                    <span class="singer">{{state.singer}}</span>
                    &nbsp;-&nbsp;
                    <span class="song-title">{{state.name}}</span>
                </div>
            </div>
            <div class="right">
                <div class="play-pause ">
                    <div class="content1">
                        <div class="circle">
                            <div class="item">
                                <circle-progress :rate="state.progress"></circle-progress>
                            </div>
                        </div>
                    </div>
                    <i :class="!state.playState?'icon-bofang1':'icon-zanting1'" class="iconfont " @click="playPrepare"></i>
                </div>
                <div class="stay-list">
                    <i class="iconfont icon-bofangliebiao"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent,ref,reactive, watch,computed} from 'vue'

// import { Song } from '../api/interface/playMusic'
// import { Toast } from 'vant'
import { useStore } from 'vuex'
import { songDetails  } from "../utils/public";
import { setStroage,getStroage,musicTime } from '../utils/regular'
// import {playMusicData} from '../typings/type'
import CircleProgress from '../components/CircleProgress.vue'

export default defineComponent({
    props:{
        show:Boolean
    },
    components: {
        CircleProgress
    },
    setup(props,ctx) {
        const state = reactive({
            id:'',
            name:'',
            songUrl: '',
            picture:'',
            singer:'',
            currentTime:0,
            playState:false,
            audio:new Audio(),
            SongUndefined:true,//当前播放条是否有音乐
            progress:0
        })

        var songCache = getStroage('song_info')
        
        if(songCache){
            let songCacheJson = JSON.parse(getStroage('song_info'))
            state.id = songCacheJson.id
            state.name = songCacheJson.name
            state.picture = songCacheJson.picture
            state.singer = songCacheJson.singer
            state.audio.currentTime = state.currentTime = songCacheJson.currentTime
            state.audio.src = state.songUrl = songCacheJson.songUrl
            state.SongUndefined = false
        }else{
            state.SongUndefined = false
        }

        const store = useStore()

        var sinkBottom = computed(():boolean => {
            return props.show
        })    

        var changeSong = computed(():boolean => {
            return store.state.changeSong
        }) 
        
        var songReady = computed(():boolean => {
            return store.state.songUrlReady
        })

        watch(changeSong,()=>{
            let song = JSON.parse(getStroage('song_info'))
            if(song.id == state.id){
                // 播放的是同一首歌
                state.audio.currentTime = state.currentTime
            }else{
                state.id = song.id
                state.name = song.name
                state.picture = song.picture
                state.singer = song.singer
            }
        })
        watch(songReady,()=>{
            let song = JSON.parse(getStroage('song_info'))
            state.audio.currentTime = state.currentTime = song.currentTime
            state.audio.src = state.songUrl = song.songUrl
            getSongDel(song.id)
            playSong()
        })

        async function getSongDel(id:string){
            let songInfo = await songDetails(id)
            let time = songInfo.songs[0].dt
            let allSeconds = parseInt((time/1000).toFixed())
            // console.log(musicTime(time))
            progress(allSeconds)
        }
        function progress(time:number){
            let timer = setInterval(()=>{
                let num = state.audio.currentTime
                // num++
                state.progress = Number((state.audio.currentTime/time).toFixed(3))
                if(num >= time){
                    clearInterval(timer)
                }
            },1000)
        }
        
        const audioRef = ''
        // const singerSongs =  async () => {
        //     const res = await Song.singerTopSong('2116')
        // }

        // async function singer(){
        //     const res = await Song.singer()
        // }

        function playPrepare (){    
            if(state.playState){
                state.audio.pause()
                state.playState = false
                return
            }
            if(!state.playState && state.audio.src){
                playSong()
                return
            }
            
        }  
        function playSong(){
            state.audio.play()
            state.playState = true
        }



        // async function playSong(){
        //     const res = await Song.checkSong('66282')
        //     if(res.status == 200){
        //         const res_two = await Song.songUrl('66282')
        //         if(res_two.status == 200){
        //             state.songUrl = res_two.data.data[0].url
        //             state.audio.src = state.songUrl
        //             state.audio.play()
        //             state.playState = true
        //         }else{
        //             Toast(res.data.message);
        //         }
        //     }else{
        //         Toast(res.data.message);
        //     }
        // }

        return{
            playPrepare,
            // singerSongs,
            playSong,
            // singer,
            state,
            audioRef,
            sinkBottom,
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
    width: 100%;
    @include font_color($font-color-theme1);
    justify-content: center;
    // @include background_color($background-color-theme1);
    .content_box{
        // background: linear-gradient(to right, #a8edea 0%, #fed6e3 100%);
        // background: linear-gradient(to right, #fa709a 0%, #fee140 100%);
        @include background_color($background-color-theme1);
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
                    font-size: 0;
                    border-radius: 50%;
                    position: relative;
                i{
                    
                    position: absolute;
                    z-index: 2;
                    top: .26rem;
                    left: .298rem;
                    @include font_color($font-color-theme1);
                }
                .icon-bofang1{
                    font-size: $font_medium;
                }
                .icon-zanting1{
                    font-size: $font_medium_s;
                }
            }
            .stay-list{
                i{
                    font-size: .938rem;
                    @include font_color($font-color-theme1);
                }
            }
        }
    }
}
.sink{
    bottom: 0;
}
.un_sink{
    bottom: 2.13rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.content1 {
    margin: 0 auto;
    display: block;
    width: 1.28rem;
    .circle {
      width: 1.28rem;
      .item {
      display: block;
      width: 1.28rem;
      height: 1.28rem;
    }
    }
}

</style>
