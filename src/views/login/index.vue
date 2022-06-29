<template>
  <div class="container">
    <el-tabs :stretch="true" class="tabs-wrap" type="border-card">
      <el-tab-pane label="登录" >
          <el-form :label-position="labelPosition" ref="uForm" label-width="80px" :rules="rules" :model="form">
          <el-form-item label="用户名" required prop="username">
            <el-input v-model="form.username" />
          </el-form-item>
          <el-form-item label="密码" prop="pwd" label-width="80px" required>
            <el-input v-model="form.pwd" type="password" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册">
        <!-- 注册 -->
      </el-tab-pane>
      <el-button type="primary" class="login-btn" >登录</el-button>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ElTabs, ElTabPane } from 'element-plus'
import {reactive, ref} from 'vue';
import {RULES} from '@/common/validator';

// import { ElMessage } from 'element-plus/lib/components'
    const form = reactive({
      username: '',
      pwd: ''
    })
    const rules = reactive({
      username: [{required: true, message: '请输入用户名', trigger: 'blur'}, {validator: RULES.username, message: "用户名应大于4小于8字符", trigger: ["change","blur"]}],
      pwd: [{required: true, message: '请输入密码', trigger: 'blur'}, {validator: RULES.pwd, message: "密码应大于6小于10字符", trigger: "change"}]
    })
    const labelPosition = ref('left')
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
}
.login-btn{
  width: 10rem;
}
.tabs-wrap {
  margin: auto;
  width: 20rem;
  height: 15rem;
  position: relative;
}
</style>
