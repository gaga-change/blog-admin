<template>
  <div v-loading="loading">
    <el-form
      :model="formData"
      :rules="rules"
      :inline="true"
      ref="formData"
      label-width="100px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" maxlength="300"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select
          :loading="!map['categories']"
          v-model="formData.category"
          placeholder="请选择分类"
          clearable
        >
          <el-option
            v-for="item in map['categories']"
            :key="item.key"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <el-select
          :loading="!map['tags']"
          v-model="formData.tags"
          placeholder="请选择分类"
          multiple
          clearable
        >
          <el-option
            v-for="item in map['tags']"
            :key="item.key"
            :label="item.key"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布时间" prop="date">
        <el-date-picker
          type="datetime"
          placeholder="选择日期时间"
          v-model="formData.releaseDate"
          style="width: 193px"
        ></el-date-picker>
      </el-form-item>
      <div ref="markdown" class="mb15"></div>
      <el-form-item label="描述">
        <el-input
          type="textarea"
          :rows="2"
          v-model="formData.intro"
          style="width:400px;"
        ></el-input>
      </el-form-item>
      <div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formData')">{{
            edit ? "立即修改" : "立即创建"
          }}</el-button>
          <!-- <el-button @click="resetForm('formData')">重置</el-button> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
import "tui-editor/dist/tui-editor-extScrollSync.js";
import Editor from "tui-editor";
import { postsCreate, postsUpdate, postsShow } from "@/api";
export default {
  data() {
    return {
      edit: false, // 是否是编辑状态
      query: this.$route.query,
      loading: false,
      formData: {
        title: undefined,
        category: undefined,
        tags: undefined,
        releaseDate: Date.now(),
        intro: undefined
      },
      rules: {
        title: [{ required: true, message: "请输入笔记标题", trigger: "blur" }]
      }
    };
  },
  computed: {
    map() {
      return this.$store.state.map;
    }
  },
  created() {
    if (this.query.id) {
      this.edit = true;
      this.initData();
    }
  },
  mounted() {
    const instance = new Editor({
      el: this.$refs["markdown"],
      initialEditType: "markdown",
      previewStyle: "vertical",
      height: "600px",
      exts: ["scrollSync"]
    });
    this.instance = instance;
  },
  methods: {
    // 数据初始化
    initData() {
      this.loading = true;
      postsShow(this.query.id).then(res => {
        this.loading = false;
        if (!res) return;
        Object.keys(this.formData).forEach(key => {
          this.formData[key] = res[key];
        });
        this.instance.setMarkdown(res.markdown);
      });
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let detail = {
            ...this.formData,
            content: this.instance.getHtml(),
            markdown: this.instance.getMarkdown()
          };
          let api = this.edit ? postsUpdate : postsCreate;
          this.loading = true;
          api(detail, this.edit ? this.query.id : undefined).then(res => {
            this.loading = false;
            if (!res) return;
            this.$message.success(this.edit ? "修改成功" : "创建成功");
            // 非编辑状态改为编辑状态
            this.edit = true;
            this.$router.replace({
              name: "PostList"
            });
          });
        }
      });
    },
    resetForm(formName) {
      this.instance.setMarkdown("");
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less"></style>
