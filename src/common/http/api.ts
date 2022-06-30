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
  validateName: (data: Data) => { return http.request({url: '/user/validate/name', ...data})},
  register: (data: Data) => { return http.request({url: '/user/register', ...data})},
  login: (data: Data) => { return http.request({url: '/user/login', ...data})},

}
