<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="笔记标题" prop="title">
				<el-input v-model="ruleForm.title"></el-input>
			</el-form-item>
			<el-form-item label="笔记分类">
				<el-input v-model="ruleForm.categories"></el-input>
			</el-form-item>
			<el-form-item label="笔记标签">
				<el-input v-model="ruleForm.tags"></el-input>
			</el-form-item>
			<el-form-item label="发布时间" required>
				<el-col :span="11">
					<el-form-item prop="date1">
						<el-date-picker type="datetime" placeholder="选择日期时间" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-form-item>
			<textarea ref="markdown"></textarea>
			<el-form-item label="描述">
				<el-input type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>

	</div>
</template>
<script>
import SimpleMDE from 'simplemde'
export default {
	data() {
		return {
			CREAT: 1,
			MODIFY: 2,
			status: null, // 状态：编辑或创建
			query: this.$route.query,
			detail: {}, // 详情
			simplemde: null, 
			ruleForm: {
				title: '',
				categories: '',
				tags: '',
				date1: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			rules: {
				title: [
					{ required: true, message: '请输入笔记标题', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 50 个字符', trigger: 'blur' }
				],
				date1: [
					{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
				],
				type: [
					{ type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
				],
				resource: [
					{ required: true, message: '请选择活动资源', trigger: 'change' }
				],
				desc: [
					{ required: true, message: '请填写活动形式', trigger: 'blur' }
				]
			}
		};
	},
	created() {
		if (this.query.id) {
			this.status = this.MODIFY
		}
		this.initData()
	},
	mounted() {
		this.simplemde = new SimpleMDE({ element: this.$refs['markdown'] })
	},
	methods: {
		// 数据初始化
		initData() {
			if (this.status == this.MODIFY) { // 编辑
				this.$API.postGet({ id: this.query.id }).then(res => {
					let detail = res.data
					this.ruleForm.title = detail.title
					this.ruleForm.categories = detail.categories.join(',')
					this.ruleForm.tags = detail.tags.join(',')
					this.ruleForm.date1 = new Date(detail.date)
					this.simplemde.value(detail.markdown)
				})
			} else { // 创建
				
			}
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
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