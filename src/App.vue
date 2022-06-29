<script lang="ts" setup>
import {ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import headerCommon from '@/components/layout/headerCommon.vue';
import {api} from '@/common/http/api';

interface languageinterface{
  [propName: string]: any
}
const {t, locale} = useI18n()

const Ellocale = ref(zhCn)
const languageDict:languageinterface = {
  'zh': zhCn,
  'en': en
}
const changeLanguage_ = (language:string):void=>{
  console.log(language);

  Ellocale.value = languageDict[language]
  locale.value = language
}

const value1 = ref('')

api.fakeLogin().then((res: any)=>{
  localStorage.setItem('token', 'Bearer ' + res.data.data.token)
  localStorage.setItem('language', res.data.data.user.language || 'zh')
  changeLanguage_(localStorage.getItem('language') || 'zh')
})
</script>

<template>
  <el-config-provider :locale="Ellocale">
    <headerCommon @changeLanguage="changeLanguage_"></headerCommon>
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">

</style>
