import axios from '../axios'


export class SongInfo{
    static async getSongs<T>(params: T): Promise<any> {
        return axios.get('/playlist/detail', {
            params: {
                id:params
            },
        })
    }

    //歌手
    static async singer(params?: string): Promise<any> {
        return axios.get('/artist/list')
    }
    // 音乐是否可用
    static async checkSong(params: string): Promise<any> {
        return axios.get('/check/music',{
            params: {
                id:params
            },
        })
    }
    // 音乐链接
    static async songUrl(params: string): Promise<any> {
        return axios.get('/song/url',{
            params: {
                id:params
            },
        })
    }
   
}

