export const RULES = {
  phoneValid: (rule:any, value:string, callback: any)=>{
    const reg = /^1[3-9]\d{9}$/
    if(reg.test(value)){
      return callback()
    }else{
      return callback(new Error('请输入正确的手机号'))
    }
  },
  username: (rule:any,value:string, callback: any)=>{
    if( value.length > 18){
      return callback(new Error('用户名不可超过18字符'))
    }
    else if(value.length < 4 ){
      return callback(new Error('用户名不可小于4字符'))
    }
    else{
      return callback()
    }
  },
  password: (rule:any, value:string, callback: any)=>{
    if( value.length > 18){
      return callback(new Error('密码不可超过18字符'))
    }
    else if(value.length < 8 ){
      return callback(new Error('用户名不可小于6字符'))
    }
    else{
      return callback()
    }
  }
}
