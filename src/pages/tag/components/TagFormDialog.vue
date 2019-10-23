<template>
  <div class="">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      :title="rowData._id ? '编辑标签' : '新建标签'"
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
          <el-form-item label="标签名称" prop="name">
            <el-input
              style="width:200px;"
              v-model="formData.name"
              placeholder="标签名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload
              action="/api/upload"
              :on-change="handleChange"
              :file-list="fileList"
              list-type="picture-card"
              :on-remove="handleRemove"
              :on-preview="handlePictureCardPreview"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              style="width:200px;"
              v-model="formData.remark"
              type="textarea"
              placeholder="请输入内容"
              maxlength="200"
              show-word-limit
            >
            </el-input>
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
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { tagsCreate, tagsUpdate } from "@/api";
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
      Object.keys(this.formData).forEach(key => {
        this.$set(
          this.formData,
          key,
          this.rowData[key] === null ? undefined : this.rowData[key]
        );
      });
      if (this.rowData._id) {
        this.formData.logos = this.rowData.logos.map(v => v._id);
        this.fileList = this.rowData.logos.map(v => ({
          name: v.name,
          url: v.url
        }));
      }
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: [],
      loading: false,
      formData: {
        //  ... 表单字段
        name: undefined,
        remark: undefined,
        logos: undefined
      },
      rules: {
        //  ... 表单校验
        name: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 0, max: 20, message: "不能超过50个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.handleChange(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      this.formData.logos = fileList
        .filter(v => v.response && v.response._id)
        .map(v => v.response._id);
    },
    /** 确定 */
    confirm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.loading = true;
          let params = { ...this.formData };
          let api = tagsCreate;
          if (this.rowData._id) {
            api = tagsUpdate;
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
      // 初始化表单
      this.$refs["form"] && this.$refs["form"].resetFields();
      // 初始化没有挂载到表单的数据
      this.fileList = [];
      this.visible && this.$emit("update:visible", false);
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
