<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("initMap");
  }
};
</script>

<style lang="less">
@import url("./public.less");
#app {
  overflow-y: hidden;
  height: 100%;
}
.CodeMirror-scroll {
  min-height: 160px;
}
.el-divider__text,
.el-link {
  font-size: 12px;
  line-height: 1.6;
}
.el-select-dropdown__item {
  font-size: 12px;
  line-height: 28px;
  height: 28px;
}
</style>
