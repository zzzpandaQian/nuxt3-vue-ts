<script lang="ts" setup>
import {ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import indexDB from './indexDB'
interface languageinterface{
  [propName: string]: any
}
const {t, locale} = useI18n()

const Ellocale = ref(zhCn)
const languageDict:languageinterface = {
  'zh': zhCn,
  'en': en
}
const changeLanguage = (language:string):void=>{
  Ellocale.value = languageDict[language]
  locale.value = language
}
const db = new indexDB('test')
db.openDB(1, 'id', ['a0', 'a1', 'a2'])
const value1 = ref('')
</script>

<template>
  <el-config-provider :locale="Ellocale">
    <a class="mr-1" @click="changeLanguage('en')">英文</a>
    <a class="mr-1" @click="changeLanguage('zh')">中文</a>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
    />
    <router-link to="/home">{{t('message.首页')}}</router-link>
    <router-link to="/dbtest">dbtest</router-link>
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">

</style>
