<template>
	<div>
		<div class="block">
			<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination> -->
		</div>
		<el-table :data="itemList" border style="width: 100%">
			<el-table-column prop="date" label="日期" width="150">
			</el-table-column>
			<el-table-column prop="title" label="标题" >
			</el-table-column>
			<el-table-column prop="categories" label="目录" width="120">
			</el-table-column>
			<el-table-column prop="tags" label="标签" width="120">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="100">
				<template slot-scope="scope">
					<el-button @click="postDelete(scope.row)"  type="text" size="small">删除</el-button>
					<el-button @click="goModify(scope.row)"  type="text" size="small">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="block">
			<!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
			</el-pagination> -->
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			itemList: []
		}
	},
	created() {
		this.initData()
	},
	methods: {
		// 删除笔记
		postDelete(row) {
			this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$API.postDel({ id: row.id }).then(res => {
					this.itemList = this.itemList.filter(item => {
						return item.id != row.id
					})
					this.$message({
						type: 'success',
						message: '删除成功!'
					})
				})
			})
		},
		// 挑战之修改页面
		goModify(row) {
			this.$router.push({ name: 'PostCreate', query: { id: row.id } })
		},
		// 初始化数据
		initData() {
			this.$API.posts().then(res => {
				let items = res.data.list || []
				items.forEach(item => {
					let tags = item.tags.join(",")
					let categories = item.categories.join(",")
					let date = new Date(item.date)
					let str = []
					str.push(this.doubleNum(date.getFullYear()))
					str.push(this.doubleNum(date.getMonth() + 1))
					str.push(this.doubleNum(date.getDate()))
					item.date = str.join("-")
				})
				let count = res.data.count
				let page = res.data.page || 1
				this.itemList = items
			})
		},
		// 数字小于10，补零
		doubleNum(num) {
			if (num < 10) return "0" + num
			return num
		},

	},
}
</script>