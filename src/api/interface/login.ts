import axios from '../axios'

interface loginData{
    phone:string,
    password:string
}
// 登录
// export class Song{
//     static async getAllSong(params: String): Promise<any> {
//         return axios.get('/artist/songs', {
//           params: {
//             id:params
//           },
//         })
//     }
   
// }

function loginFun (params: loginData):Promise<any>{
    return axios.get('/login/cellphone', {
        params: {
            phone:params.phone,
            password:params.password
        },
    })
}

export {loginFun}