import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"

export interface RequestInterceptor{
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
    requestErrorInterceptor?: (error: AxiosError) => void
    responseInterceptor?: (response: AxiosResponse) => AxiosResponse
    responseErrorInterceptor?: <T>(error: T) => T
}

export interface RequestConfig extends AxiosRequestConfig{
    interceptor?: RequestInterceptor,
    showload?: boolean
}