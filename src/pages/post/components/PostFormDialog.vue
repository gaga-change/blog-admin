<template>
  <div class="">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      :title="rowData._id ? '编辑笔记' : '新建笔记'"
      :visible="visible"
      width="600px"
      :before-close="handleClose"
      @close="close"
    >
      <div>
        <el-form
          :inline="false"
          :model="formData"
          :rules="rules"
          label-width="100px"
          ref="form"
        >
          <el-form-item label="标题" prop="title">
            <el-input
              style="width:200px;"
              v-model="formData.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="category">
            <el-select
              :loading="categoriesListLoading"
              v-model="formData.category"
              placeholder="请选择分类"
              clearable
            >
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标签" prop="tags">
            <el-select
              :loading="tagsListLoading"
              v-model="formData.tags"
              placeholder="请选择分类"
              multiple
              clearable
            >
              <el-option
                v-for="item in tags"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="confirm()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { postsCreate, postsUpdate, categoriesList, tagsList } from "@/api";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    /** 数据初始 */
    row: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    /** 防止父级传递 null */
    rowData() {
      return this.row || {};
    }
  },
  watch: {
    /** 监听数据切换，重置表单 */
    visible(val) {
      if (!val) return;
      let temp = { ...this.rowData };
      temp.category = temp.category._id;
      temp.tags = temp.tags.map(v => v._id);
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = temp[key];
      });
    }
  },
  data() {
    return {
      categoriesListLoading: true,
      tagsListLoading: false,
      categories: [],
      tags: [],
      loading: false,
      formData: {
        //  ... 表单字段
        title: undefined,
        category: undefined,
        tags: undefined
      },
      rules: {
        //  ... 表单校验
        title: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 0, max: 200, message: "不能超过200个字符", trigger: "blur" }
        ],
        category: [{ required: true, message: "必填项", trigger: "blur" }]
      }
    };
  },
  created() {
    this.categoriesListLoading = true;
    categoriesList({ pageSize: 999 }).then(res => {
      this.categoriesListLoading = false;
      if (!res) return;
      this.categories = res.list;
    });
    this.tagsListLoading = true;
    tagsList({ pageSize: 999 }).then(res => {
      this.tagsListLoading = false;
      if (!res) return;
      this.tags = res.list;
    });
  },
  methods: {
    /** 确定 */
    confirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          let params = { ...this.formData };
          for (let key in params) {
            if (params[key] === undefined) {
              params[key] = "";
            }
          }
          let api = postsCreate;
          if (this.rowData._id) {
            api = postsUpdate;
          }
          api(params, this.rowData._id).then(res => {
            this.loading = false;
            if (!res) return;
            this.$message.success("操作成功！");
            this.$emit("visible:update", false);
            this.$emit("submited");
            this.close();
          });
        }
      });
    },
    /** 关闭弹窗 */
    close() {
      this.visible && this.$emit("update:visible", false);
      this.$nextTick(() => {
        Object.keys(this.formData).forEach(key => {
          this.formData[key] = undefined;
        });
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>
