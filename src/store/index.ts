import {defineStore} from 'pinia';

export default defineStore('index', {
  state: ()=>{
    return {
      userInfo: JSON.parse(localStorage.getItem('userInfo') ?? '{}'),
      isLogin: false
    }
  },
  getters:{
    getUserInfo(state){
      return state.userInfo
    }
  },
  actions: {

  }
})
