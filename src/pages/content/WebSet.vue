<template>
  <div v-loading="loading">
    <el-form
      ref="site"
      :model="site"
      :rules="rules"
      label-width="80px"
      size="small "
      class="demo-ruleForm"
    >
      <el-form-item label="站点标题" prop="header">
        <el-input v-model="site.header" placeholder="请输入站点标题"></el-input>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input
          v-model="site.subhead"
          maxlength="20"
          placeholder="请输入副标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="site.description"
          maxlength="200"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="关键词">
        <el-input
          v-model="site.keywords"
          mamaxlengthx="200"
          placeholder="请输入关键词"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('site')">
          {{ detail ? "立即修改" : "立即创建" }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { webSetsList, webSetsUpdate, webSetsCreate } from "@/api";
export default {
  data() {
    return {
      loading: true,
      detail: null,
      site: {
        header: "",
        subhead: "",
        description: "",
        keywords: ""
      },
      rules: {
        header: [
          { required: true, message: "请输入站点标题", trigger: "blur" },
          { min: 1, max: 25, message: "长度在 1 到 25 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    // 初始化数据
    initData() {
      webSetsList().then(res => {
        this.loading = false;
        if (!res) return;
        if (res.total) {
          let detail = res.list[0];
          this.detail = detail;
          Object.keys(this.site).forEach(key => {
            this.site[key] = this.detail[key];
          });
        }
      });
    },
    // 表单提交
    submitForm(formName) {
      let api = this.detail ? webSetsUpdate : webSetsCreate;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          let params = { ...this.site };
          api(params, this.detail ? this.detail._id : null).then(res => {
            if (!res) {
              this.loading = false;
            }
            this.$message.success(this.detail ? "修改成功！" : "创建成功！");
            this.initData();
          });
        }
      });
    }
  }
};
</script>
