import axios from '../axios'

// 歌手热门50首歌曲
export class Song{
    static async singerTopSong(params: String): Promise<any> {
        return axios.get('/artist/top/song', {
            params: {
                id:params
            },
        })
    } 

    //歌手
    static async singer(params?: String): Promise<any> {
        return axios.get('/artist/list')
    }
    // 音乐是否可用
    static async checkSong(params: String): Promise<any> {
        return axios.get('/check/music',{
            params: {
                id:params
            },
        })
    }
    // 音乐链接
    static async songUrl(params: String): Promise<any> {
        return axios.get('/song/url',{
            params: {
                id:params
            },
        })
    }

    // 音乐详情
    static async songDet(params: String): Promise<any> {
        return axios.get('/song/detail',{
            params: {
                ids:params
            },
        })
    }
   
}

