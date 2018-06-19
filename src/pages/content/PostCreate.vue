<template>
	<div v-loading="loading">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="笔记标题" prop="title">
				<el-input v-model="ruleForm.title" maxlength=50></el-input>
			</el-form-item>
			<el-form-item label="笔记分类">
				<el-input v-model="ruleForm.categories"></el-input>
			</el-form-item>
			<el-form-item label="笔记标签">
				<el-input v-model="ruleForm.tags"></el-input>
			</el-form-item>
			<el-form-item label="发布时间" required>
				<el-col :span="11">
					<el-form-item prop="date">
						<el-date-picker type="datetime" placeholder="选择日期时间" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-form-item>
			<textarea ref="markdown"></textarea>
			<el-form-item label="描述">
				<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">{{edit ? '立即修改' : '立即创建'}}</el-button>
				<!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
			</el-form-item>
		</el-form>

	</div>
</template>
<script>
import SimpleMDE from 'simplemde'
export default {
	data() {
		return {
			edit: false, // 是否是编辑状态
			query: this.$route.query,
			loading: false,
			simplemde: null,
			ruleForm: {
				title: '',
				categories: '',
				tags: '',
				date: '',
				desc: '',
			},
			rules: {
				title: [
					{ required: true, message: '请输入笔记标题', trigger: 'blur' },
				],
				date: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				],
			}
		};
	},
	created() {
		if (this.query.id) {
			this.edit = true
			this.loading = true
		}
	},
	mounted() {
		this.initData()
	},
	beforeRouteUpdate(to, from, next) {
		if (!to.query.id) {
			this.edit = false
			this.$refs['ruleForm'].resetFields()
			this.ruleForm.desc = ''
			this.simplemde.value('## 标题')
		}
		next()
	},
	methods: {
		// 笔记详情转表单信息
		detailToFrom(detail) {
			this.ruleForm.title = detail.title
			this.ruleForm.desc = detail.intro
			this.ruleForm.categories = detail.categories.join(',')
			this.ruleForm.tags = detail.tags.join(',')
			this.ruleForm.date = new Date(detail.date)
		},
		// 数据初始化
		initData() {
			if (this.edit) { // 编辑
				this.$API.postGet({ id: this.query.id }).then(res => {
					this.loading = false
					this.detailToFrom(res.data)
					this.simplemde = new SimpleMDE({ element: this.$refs['markdown'], initialValue: res.data.markdown })
				})
			} else {
				this.simplemde = new SimpleMDE({ element: this.$refs['markdown'], initialValue: '## 标题' })
			}
		},
		// 提交
		submitForm(formName) {

			this.$refs[formName].validate((valid) => {
				if (valid) { // 验证通过
					let detail = {
						id: this.query.id,
						title: this.ruleForm.title,
						categories: this.ruleForm.categories,
						tags: this.ruleForm.tags,
						date: this.ruleForm.date,
						markdown: this.simplemde.value(),
						intro: this.ruleForm.desc
					}
					let api = this.edit ? this.$API.postMod : this.$API.postAdd
					this.loading = true
					api(detail).then(res => {
						this.loading = false
						this.$message({
							message: this.edit ? '修改成功' : '创建成功',
							type: 'success'
						})
						if (!this.edit) { // 非编辑状态改为编辑状态
							this.edit = true
							this.$router.replace({ name: 'PostCreate', query: { id: res.data.id } })
							this.query.id = res.data.id
							this.detailToFrom(res.data)
						}
					})
				} else {
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
}
</script>
<style lang="less">
.editor-toolbar.fullscreen {
    z-index: 1600;
}
.CodeMirror-fullscreen {
    z-index: 1600;
}
</style>