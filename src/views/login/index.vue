<template>
  <div class="contain">
    <el-tabs
      :stretch="true"
      @tab-change="tabChange"
      class="tabs-wrap"
      type="border-card"
    >
      <el-tab-pane label="登录">
        <el-form
          label-position="left"
          ref="uForm"
          label-width="80px"
          :rules="rules"
          :model="form"
        >
          <el-form-item label="用户名" required prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            label-width="80px"
            required
          >
            <el-input v-model="form.password" type="password" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册">
        <!-- 注册 -->
        <el-form
          label-position="left"
          ref="uForm"
          label-width="80px"
          :rules="rules"
          :model="form"
        >
          <el-form-item label="用户名" required prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
            label-width="80px"
            required
          >
            <el-input v-model="form.password" type="password" />
          </el-form-item>
          <el-form-item
            label="再次输入密码"
            prop="repassword"
            label-width="120px"
          >
            <el-input v-model="form.repassword" type="password" />
          </el-form-item>

          <el-form-item label="性别" label-width="80px">
            <el-switch
              v-model="form.gender"
              class="ml-2"
              inline-prompt
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
              active-value="0"
              inactive-value="1"
              active-text="男"
              inactive-text="女"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-button
        type="primary"
        class="login-btn"
        @click="login"
        v-if="currentTab == 0"
        >登录</el-button
      >
      <el-button type="primary" class="login-btn" @click="register" v-else
        >注册</el-button
      >
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ElTabs, ElTabPane, ElMessage, TabPanelName } from "element-plus";
import { reactive, ref, watch } from "vue";
import { RULES } from "~/common/validator/index.ts";
import { api } from "~/common/http/api";
import { useRouter } from "vue-router";
import createStore from '~/store';

// import { ElMessage } from 'element-plus/lib/components'
interface FORM{
  [propName: string]:any
}
const store = createStore()
const form = reactive<FORM>({
  name: "",
  password: "",
  gender: "0",
  repassword: "",
});
const router = useRouter()
const rules = reactive({
  name: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      validator: RULES.username,
      message: "用户名应大于4小于8字符",
      trigger: ["change", "blur"],
    },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (currentTab.value == 1) {
          api.validateName({ params: { name: value } }).then((res: any) => {
            if (res.data.message == "用户不存在") {
              return callback();
            } else {
              return callback(new Error("用户已存在"));
            }
          });
        }
      },
      message: "用户名已存在",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      validator: RULES.password,
      message: "密码应大于6小于10字符",
      trigger: "change",
    },
  ],
  repassword: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (form.password == value) {
          return callback();
        } else {
          return callback(new Error("俩次密码不匹配"));
        }
      },
      message: "俩次密码不匹配",
      trigger: "blur",
    },
  ],
});
const labelPosition = ref("left"),
  currentTab = ref(0);

watch(currentTab, (n) => {
  Object.keys(form).map((i: string) => {
    form[i] = "";
  });
});
const tabChange = (name: TabPanelName):any => {
  currentTab.value = +name;
};
// 登录
const login = () => {
  api.login({ data: form, method: "POST" }).then((res: any) => {
    if (res.data.code == 200) {
      ElMessage.success(res.data.message);
      localStorage.setItem("userInfo", JSON.stringify(res.data.data.user));
      store.$state.userInfo = res.data.data.user
      store.$state.isLogin = true
      router.replace({path: '/home'})
    } else {
      ElMessage.error(res.data.message);
    }
  });
};
const { password, name, gender } = form;
const register = () => {
  console.log("register", { password, name, gender });

  api
    .register({ data: form, method: "POST" })
    .then((res: any) => {
      if (res.data.code == 203) {
        ElMessage.error(res.data.message);
      } else {
        ElMessage.success(res.data.message);
      }
    })
    .catch((error: any) => {
      console.log("error", error);
    });
};
</script>

<style scoped lang="scss">
.contain {
  height: calc(100vh - 5rem);
  width: 100vw;
  display: flex;
}
.login-btn {
  width: 10rem;
  margin-left: 50%;
  transform: translateX(-50%);
}
.tabs-wrap {
  margin: auto;
  width: 20rem;
  padding-bottom: 1rem;
  position: relative;
}
</style>
