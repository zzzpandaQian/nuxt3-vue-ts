<script setup lang="ts">
import { markRaw, reactive, ref, shallowReadonly } from 'vue'
import { api } from '~/common/http/api';
import { useRouter } from 'vue-router';
import createStore from '~/store';
import { storeToRefs } from 'pinia';

interface UserInfo{
  avatar: string,
  [propName: string]: any
}
const store = createStore()
console.log(store.$state.userInfo.avatar);

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const route = useRouter()
const emit = defineEmits<{
  (e: 'changeLanguage', language: string): void
}>()
const handleSelect = (key: string, keyPath: string[]) => {
  const handlerDict = {
    [key]: ()=>{
      console.log('函数不存在')
    },
    'zh': ()=>{
      api.changeLanguage({data: {language: key}, method: "POST"})
      emit('changeLanguage', key)
    },
    'en': ()=>{
      api.changeLanguage({data: {language: key}, method: "POST"})
      emit('changeLanguage', key)
    },
    'edit': ()=>{
      console.log('修改个人信息');
    },
    'logout': ()=>{
      console.log('退出登录');
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      store.$state.userInfo = {}
      store.$state.isLogin = false
      route.replace({path: '/login'})
    },

  }
  handlerDict[key]()

}
const isLogin = ref(false)
if(localStorage.getItem('token') && localStorage.getItem('userInfo')){
  isLogin.value = true
  // userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{avatar: ""}')
}

const toLogin = ()=>{
  route.push('/login')
}
</script>

<template>
  <div class="header-blk">
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0" class="p-t-2 p-b-2">
      <img src="@/assets/images/logo.png" height="70" alt="logo">
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1" class="main-menu-item">{{$t('message.首页')}}</el-menu-item>
    <el-menu-item index="2" class="main-menu-item">{{$t('message.我的')}}</el-menu-item>

    <el-sub-menu index="3">
      <template #title>{{$t('message.语言')}}</template>
      <el-menu-item index="zh">{{$t('message.中文')}}</el-menu-item>
      <el-menu-item index="en">{{$t('message.英语')}}</el-menu-item>
    </el-sub-menu>

    <el-menu-item index="4" class="main-menu-item" v-if="!store.$state.isLogin">
      <div  @click="toLogin">{{$t('message.登录')}}</div>
    </el-menu-item>
    <el-sub-menu index="4" class="avatar-wrap" v-else>
      <template #title>
        <img :src="store.$state.userInfo.avatar" class="avatar-img" alt="">
      </template>
      <el-menu-item index="edit">{{$t('message.修改信息')}}</el-menu-item>
      <el-menu-item index="logout">{{$t('message.退出')}}</el-menu-item>
    </el-sub-menu>
  </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.header-blk{
  ::v-deep ul.el-menu{
    height: 5rem;
  }
  ::v-deep .main-menu-item.el-menu-item{
    --el-menu-item-height: 5rem;
  }
}
.avatar-img{
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
}
.el-menu--horizontal>.el-sub-menu.avatar-wrap ::v-deep .el-sub-menu__icon-arrow{
  display: none!important;
}
</style>
