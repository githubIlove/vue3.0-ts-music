import axios from '../axios'

// import { HttpResponse } from '@/@types'

// interface allSongParam{
//   id: String|Number
// }

// export {getSong}
export class Song{
    static async getAllSong(params: String): Promise<any> {
        return axios.get('/artist/songs', {
          params: {
            id:params
          },
        })
    }
   
}