<template>
	<el-container>
		<el-header>
			<!-- 头部 -->
			<v-top-header></v-top-header>
		</el-header>
		<el-container>
			<el-scrollbar class="page-component__scroll ">
				<el-aside width="200px">
					<!-- 侧边栏 -->
					<v-left-aside></v-left-aside>
				</el-aside>
				<el-main>
					<router-view/>
				</el-main>
			</el-scrollbar>
		</el-container>
	</el-container>

</template>
<script>
import TopHeader from './nav_bar/TopHeader.vue'
import LeftAside from './nav_bar/LeftAside.vue'
export default {
	components: {
		'v-top-header': TopHeader,
		'v-left-aside': LeftAside
	},
	data() {
		return {
			isCollapse: true
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	}
}
</script>
<style lang="less">
.el-header {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1500;
    color: #333;
    line-height: 60px;
    background-color: #f8f8f9;
}
.el-container {
    padding: 0;
    margin-top: 0;
    height: 100%;
    min-height: auto;
    box-sizing: border-box;
}
.page-component__scroll {
	width: 100%;
    height: calc(100% - 60px);
    margin-top: 60px;
    .el-scrollbar__wrap {
        overflow-x: auto;
    }
}
.el-aside {
    position: fixed;
    top: 0;
    bottom: 0;
    margin-top: 60px;
    color: #333;
    text-align: center;
	background-color: #fff;
	.el-menu {
		height: 100%;
	}
}

.el-main {
    background-color: #fff;
    color: #333;
    margin-left: 200px;
    // text-align: center;
	// line-height: 160px;
}
</style>
