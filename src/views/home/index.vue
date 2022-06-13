<script setup lang="ts">
import { ElMessage } from "element-plus"

  const showElmessage = ()=>{
    ElMessage.success('Hello')
  }
</script>

<template>
  <div>
    <el-button @click="showElmessage">显示elmessage</el-button>
  </div>
</template>

<style scoped>

</style>
