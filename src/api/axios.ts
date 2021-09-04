import axios,{AxiosRequestConfig,AxiosResponse} from 'axios'
import qs from 'qs'  //处理  重复请求

var domainUrl:string = '/api'

if (process.env.NODE_ENV === "development") {
    domainUrl = "/api";
} else if (process.env.NODE_ENV === "test") {
    domainUrl = '/api'
} else {
    domainUrl = '/api'
}

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config 
 */
const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
    if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
}

/**
 * 移除请求
 * @param {Object} config 
 */
 const removePending = (config: AxiosRequestConfig) => {
    const url = [
      config.method,
      config.url,
      qs.stringify(config.params),
      qs.stringify(config.data)
    ].join('&')
    if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
      const cancel = pending.get(url)
      cancel(url)
      pending.delete(url)
    }
}
/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
 export const clearPending = () => {
    for (const [url, cancel] of pending) {
      cancel(url)
    }
    pending.clear()
}



const request = axios.create({
    timeout:10000,
    baseURL:domainUrl,
    withCredentials: true, // 是否跨站点访问控制请求
    validateStatus() {
        // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true
    },
    // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
    transformRequest: [(data) => {
        data = JSON.stringify(data)
        return data
    }],
    transformResponse: [(data) => {
        if (typeof data === 'string' && data.startsWith('{')) {
          data = JSON.parse(data)
        }
        return data
    }]
  
})

// 请求拦截
request.interceptors.request.use((config: AxiosRequestConfig) => {
    removePending(config) // 在请求开始前，对之前的请求做检查取消操作
    addPending(config) // 将当前请求添加到 pending 中
    // let token = localStorage.getItem('token')
    // if(token){
    //   config.headers.Authorization = `${token}`;
    // }
    return config
  }, (error) => {
    return Promise.resolve(error)
})

// // 相应拦截

request.interceptors.response.use((response: AxiosResponse) => {
    // const status = response.status
    removePending(response) // 在请求结束后，移除本次请求
    return response
}, (error) => {
    return Promise.reject(error)
})


export default request;