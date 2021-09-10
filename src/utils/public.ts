// import { defineComponent,ref,reactive, watch,computed ,watchEffect} from 'vue'
import { Song } from '../api/interface/playMusic'
import { Toast } from 'vant'
import { playSongLocal } from '@/typings/type'
import { setStroage,getStroage } from '../utils/regular'
import  store  from '../store/index'

async function canPlay(val:any): Promise<void> {
    const res = await Song.checkSong(val.id)
    if(res.status == 200){
        getSongUrl(val.id)
        var data:playSongLocal = {
            id:val.id,
            name:val.name,
            songUrl:'',
            picture:val.al.picUrl,
            singer:val.ar[0].name,
            currentTime:0
        }
        setStroage('song_info',JSON.stringify(data))
        store.commit('playNewSongFun')

    }else{
        Toast(res.data.message);
    }
}
async function getSongUrl(val:string): Promise<void>{
    const res = await Song.songUrl(val)
    if(res.status == 200){
        let data = res.data
        let song_info = JSON.parse(getStroage('song_info'))
        song_info.songUrl = data.data[0].url
        setStroage('song_info',JSON.stringify(song_info))
        store.commit('songReadyFun')    
    }else{
        Toast(res.data.message);
    }

}

export {canPlay}