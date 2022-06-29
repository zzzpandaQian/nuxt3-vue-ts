import http from './config';
interface Data{
  params?:{
    [propName: string]: any
  } ,
  data?:{
    [propName: string]: any
  } ,
  method?: string,
  [propName: string]: any
}

export const api = {
  fakeLogin: ()=>{return http.request({url: '/auth/test'})},
  changeLanguage: (data: Data)=>{return http.request({url: '/user/language', ...data})},
}
