import axios, { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'
import {RequestConfig, RequestInterceptor } from './types'

class HttpRequest{
    instance: AxiosInstance
    interceptor?: RequestInterceptor
    loading?: any
    constructor(config: RequestConfig){
        this.instance = axios.create(config);
        this.interceptor = config?.interceptor
    }
    request(config: RequestConfig){
        if(config.showload ?? true){
            this.loading = ElLoading.service({
                text: "加载中...",
                lock: true,
                background: 'rgba(0,0,0,.1)'
            })
        }
        if(config?.interceptor?.requestInterceptor){
            config = config.interceptor.requestInterceptor(config)
        }
        this.instance.interceptors.request.use(
            (config: RequestConfig)=>{
                console.log('全局request拦截');
                return config
            },
            (error)=>{
                this.loading?.close()
            }
        )
        this.instance.interceptors.response.use(
        (response) => {
            // 这一步判断个体的config中是否自定义了拦截器
            // 若存在拦截器优先执行个体拦截器
            this.loading?.close()
            if (config?.interceptor?.responseInterceptor) {
            response = config.interceptor.responseInterceptor(response)
            }
            console.log('实例response拦截')
            return response
        },
        (err) => {
            this.loading?.close()
        }
        )
        return this.instance.request(config)
    }
}   

export default HttpRequest