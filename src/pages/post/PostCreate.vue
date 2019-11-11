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
        <el-input
          style="width:200px"
          v-model="formData.title"
          maxlength="300"
          placeholder="请输入标题"
        ></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category">
        <el-select
          style="width:200px"
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
          style="width:200px"
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
          style="width:200px"
          type="datetime"
          placeholder="选择日期时间"
          v-model="formData.releaseDate"
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
      <el-form-item label="发布" prop="show">
        <el-switch
          v-model="formData.show"
          :active-value="true"
          :inactive-value="false"
        >
        </el-switch>
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
      detail: {},
      loading: false,
      formData: {
        title: undefined,
        category: undefined,
        tags: undefined,
        releaseDate: Date.now(),
        intro: undefined,
        show: true
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
    } else {
      const cache = localStorage.getItem("POST_CACHE");
      if (cache) {
        this.$confirm("有检测到上次未完善的内容, 是否继续?", "提示", {
          confirmButtonText: "还原",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(() => {
            const detail = JSON.parse(cache);
            Object.keys(this.formData).forEach(key => {
              this.formData[key] = detail[key];
            });
            this.instance.setMarkdown(detail.markdown);
            this.$message({
              type: "success",
              message: "还原成功！"
            });
          })
          .catch(() => {
            localStorage.removeItem("POST_CACHE");
            this.$message({
              type: "info",
              message: "已清理缓存"
            });
          });
      }
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
  beforeDestroy() {
    if (this.instance) {
      if (
        (!this.edit && this.instance.getMarkdown().trim()) ||
        (this.edit &&
          this.detail.markdown &&
          this.instance.getMarkdown().trim() !== this.detail.markdown.trim())
      ) {
        let detail = {
          ...this.formData,
          content: this.instance.getHtml(),
          markdown: this.instance.getMarkdown()
        };
        localStorage.setItem("POST_CACHE", JSON.stringify(detail));
      } else {
        // 手动清除内容
        localStorage.removeItem("POST_CACHE");
      }
    }
  },
  methods: {
    // 数据初始化
    initData() {
      this.loading = true;
      postsShow(this.query.id).then(res => {
        this.loading = false;
        if (!res) return;
        this.detail = res;
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
            this.instance.setMarkdown("");
            localStorage.removeItem("POST_CACHE");
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
