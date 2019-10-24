<template>
  <el-menu
    :default-active="active"
    class="el-menu-vertical-demo"
    :router="true"
  >
    <!-- <el-submenu index="1">
			<template slot="title">
				<i class="el-icon-location"></i>
				<span slot="title">导航一</span>
			</template>
			<el-menu-item-group>
				<span slot="title">分组一</span>
				<el-menu-item index="1-1">选项1</el-menu-item>
				<el-menu-item index="1-2">选项2</el-menu-item>
			</el-menu-item-group>
			<el-menu-item-group title="分组2">
				<el-menu-item index="1-3">选项3</el-menu-item>
			</el-menu-item-group>
			<el-submenu index="1-4">
				<span slot="title">选项4</span>
				<el-menu-item index="1-4-1">选项1</el-menu-item>
			</el-submenu>
		</el-submenu> -->
    <el-menu-item index="PostCreate" :route="{ name: 'PostCreate' }">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">发布笔记</span>
    </el-menu-item>
    <el-menu-item index="PostList" :route="{ name: 'PostList' }">
      <i class="el-icon-document"></i>
      <span slot="title">笔记列表</span>
    </el-menu-item>
    <el-menu-item index="CategoryList" :route="{ name: 'CategoryList' }">
      <i class="el-icon-folder"></i>
      <span slot="title">分类管理</span>
    </el-menu-item>
    <el-menu-item index="TagList" :route="{ name: 'TagList' }">
      <i class="el-icon-price-tag"></i>
      <span slot="title">标签管理</span>
    </el-menu-item>
    <el-menu-item index="PageMenuList" :route="{ name: 'PageMenuList' }">
      <i class="el-icon-help"></i>
      <span slot="title">导航管理</span>
    </el-menu-item>
    <el-menu-item index="WebSet" :route="{ name: 'WebSet' }">
      <i class="el-icon-setting"></i>
      <span slot="title">站点设置</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  props: {
    navActive: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      active: ""
    };
  },
  watch: {
    // 监听路由变动
    navActive(val) {
      this.active = val;
    }
  },
  created() {
    this.active = this.$route.name;
  }
};
</script>
