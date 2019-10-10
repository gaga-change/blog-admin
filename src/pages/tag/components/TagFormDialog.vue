<template>
  <div class="">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      title="新建标签"
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
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        //  ... 表单字段
        name: undefined,
        remark: undefined
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
      // ...
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
