<template>
  <div class="login-content">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="account">
        <el-input v-model="ruleForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登入</el-button
        >
        <el-button @click="register">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        account: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login();
        } else {
          return false;
        }
      });
    },
    // 注册
    register() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$API
            .regist({
              username: this.ruleForm.account,
              password: this.ruleForm.pass
            })
            .then(res => {
              if (res.err) {
                this.resetForm("ruleForm");
              } else {
                this.$message({
                  showClose: true,
                  message: `用户：${this.ruleForm.account} 注册成功`,
                  type: "success"
                });
                this.$router.replace({ path: "/" });
              }
            });
        } else {
          return false;
        }
      });
    },
    // 登入
    login() {
      this.$API
        .login({
          username: this.ruleForm.account,
          password: this.ruleForm.pass
        })
        .then(res => {
          if (res.data) {
            this.$router.replace({ path: "/" });
          }
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
.login-content {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 400px;
  max-height: 400px;
  margin: auto;
}
</style>
