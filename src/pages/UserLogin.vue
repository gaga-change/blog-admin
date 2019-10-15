<template>
  <div class="login-content">
    <div class="main-content">
      <h2 class="text-center">博客管理系统</h2>
      <el-form
        :model="formData"
        status-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        label-position="top"
      >
        <el-form-item label="用户名" prop="username">
          <el-input size="middle" v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            size="middle"
            v-model="formData.password"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            v-if="!noUser"
            type="primary"
            size="middle"
            @click="submitForm"
            :loading="authLoginLoading"
            style="width:100%"
            >登 入</el-button
          >
          <el-button v-else size="middle" type="primary" @click="submitForm"
            >注册并登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { authLogin, usersTotal } from "@/api";
export default {
  data() {
    return {
      authLoginLoading: false,
      noUser: false,
      formData: {
        password: undefined,
        username: undefined
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    usersTotal().then(res => {
      if (!res) return;
      const { total } = res;
      if (total === 0) {
        this.noUser = true;
      }
    });
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.login();
        }
      });
    },
    // 登入
    login() {
      this.authLoginLoading = true;
      authLogin({ ...this.formData }).then(res => {
        this.authLoginLoading = false;
        if (!res) return;
        if (this.noUser) {
          this.$message({
            showClose: true,
            message: `用户：${this.formData.username} 注册成功`,
            type: "success"
          });
        }
        this.$router.replace({ path: "/" });
      });
    }
  }
};
</script>
<style lang="less">
.login-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("//cdn.yanjd.top/blog/img/bg/bg1.jpg") no-repeat center;
  background-size: cover;
  .main-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 300px;
    max-height: 300px;
    margin: auto;
    h2 {
      font-weight: normal;
      font-size: 32px;
      color: #fff;
    }
    label {
      padding: 0;
      color: #fff;
    }
  }
}
</style>
