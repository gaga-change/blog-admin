<template>
	<div v-loading="loading">
		<el-form ref="site" :model="site" :rules="rules" label-width="80px" size="small " class="demo-ruleForm">
			<el-form-item label="站点标题" prop="header">
				<el-input v-model="site.header"></el-input>
			</el-form-item>
			<el-form-item label="副标题">
				<el-input v-model="site.subhead" maxlength="20"></el-input>
			</el-form-item>
			<el-form-item label="描述">
				<el-input v-model="site.description" maxlength="200" placeholder="description"></el-input>
			</el-form-item>
			<el-form-item label="关键词">
				<el-input v-model="site.keywords" mamaxlengthx="200" placeholder="keywords"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('site')">立即修改</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>


<script>
export default {
	data() {
		return {
			loading: true,
			site: {
				header: '',
				subhead: '',
				description: '',
				keywords: '',
			},
			rules: {
				header: [
					{ required: true, message: '请输入站点标题', trigger: 'blur' },
					{ min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur' }
				]
			}
		};
	},
	created() {
		this.initData()
	},
	methods: {
		// 初始haul数据
		initData() {
			this.$API.getSite().then(res => {
				this.loading = false
				this.site = res.data
			})
		},
		// 表单提交
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.loading = true
					this.$API.setSite(this.site).then(res => {
						this.loading = false
						if (!res.err) {
							this.$message({
								showClose: true,
								message: '修改成功',
								type: 'success'
							})
							this.site = res.data
						}
					})
				} else {
					return false;
				}
			})
		}
	}
};
</script>