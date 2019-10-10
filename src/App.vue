<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
@import url("./public.less");
#app {
  overflow-y: hidden;
  height: 100%;
}
</style>
