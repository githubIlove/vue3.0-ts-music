import axios from '../axios'

// import { HttpResponse } from '@/@types'

// interface allSongParam{
//   id: String|Number
// }

// export {getSong}
// 获取歌手全部歌曲
export class Song{
  static async getAllSong(params: string): Promise<any> {
    return axios.get('/artist/songs', {
      params: {
        id:params
      },
    })
  }
  static async songList(params: number): Promise<any> {
    return axios.get('/user/playlist', {
      params: {
        uid:params
      },
    })
  }
}

