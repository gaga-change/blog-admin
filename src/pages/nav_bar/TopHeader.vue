<template>
  <div>
    <div class="top-header">
      <router-link to="/">喜欢JS的无名小站</router-link>
      <el-button class="logout" type="text" @click="logout">退出</el-button>
    </div>
  </div>
</template>
<script>
import { authLogout } from "@/api";
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$router.replace({ name: "UserLogin" });
      authLogout();
    }
  }
};
</script>

<style lang="less">
.top-header {
  text-align: left;
  a {
    display: inline-block;
    color: #333;
    text-decoration: none;
    &:hover {
      color: #409eff;
    }
  }
}
.logout {
  height: 60px;
  float: right;
}
</style>
