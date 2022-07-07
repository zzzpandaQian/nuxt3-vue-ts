<script lang="ts" setup>
import {ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import {ref, onBeforeMount} from 'vue'
import {useI18n} from 'vue-i18n'
import headerCommon from '@/components/layout/headerCommon.vue';
import {api} from '~/common/http/api';
import { useRouter } from 'vue-router';
import createStore from '~/store';
interface languageinterface{
  [propName: string]: any
}
const {t, locale} = useI18n()
const store = createStore()
const router = useRouter()
const Ellocale = ref(zhCn)
const languageDict:languageinterface = {
  'zh': zhCn,
  'en': en
}
onBeforeMount(()=>{
  if(localStorage.getItem('token') && localStorage.getItem('userInfo')){
    store.$state.isLogin = true
    store.$state.userInfo = JSON.parse(localStorage.getItem('userInfo') ?? '{}')
  }else{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    router.replace({path: '/login'})
  }
})
const changeLanguage_ = (language:string):void=>{
  console.log(language);
  localStorage.setItem('language', language)
  Ellocale.value = languageDict[language]
  locale.value = language
}

const value1 = ref('')


</script>

<template>
  <el-config-provider :locale="Ellocale">
    <headerCommon @changeLanguage="changeLanguage_"></headerCommon>
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">

</style>
