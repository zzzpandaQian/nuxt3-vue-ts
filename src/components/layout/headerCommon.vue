<script setup lang="ts">
import { ref } from 'vue'
import { api } from '~/common/http/api';
import { useRouter } from 'vue-router';

const activeIndex = ref('1')
const activeIndex2 = ref('1')
const route = useRouter()
const emit = defineEmits<{
  (e: 'changeLanguage', language: string): void
}>()
const handleSelect = (key: string, keyPath: string[]) => {
  if(keyPath[0] == '3'){
    api.changeLanguage({data: {language: key}, method: "POST"})
    emit('changeLanguage', key)
  }

}
const isLogin = ref(false)
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
    <el-menu-item index="4" class="main-menu-item">
      <div v-if="!isLogin" @click="toLogin">{{$t('message.登录')}}</div>
      <div v-else>
        <!-- <img src="" alt=""> -->
        头像
      </div>
    </el-menu-item>

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

</style>
