<template>
  <div class="">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      :title="rowData._id ? '编辑菜单' : '新建菜单'"
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
          <el-form-item label="菜单名称" prop="name">
            <el-input
              style="width:200px;"
              v-model="formData.name"
              placeholder="请输入菜单名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="菜单路径" prop="path">
            <el-input
              style="width:200px;"
              v-model="formData.path"
              placeholder="请输入菜单路径"
            ></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon">
            <el-input
              style="width:200px;"
              v-model="formData.icon"
              placeholder="请输入图标"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="formData.type">
              <el-radio :label="0">内链</el-radio>
              <el-radio :label="1">外链</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="优先级" prop="order">
            <el-input-number v-model="formData.order"></el-input-number>
          </el-form-item>
          <el-form-item label="是否显示" prop="show">
            <el-switch
              v-model="formData.show"
              :active-value="true"
              :inactive-value="false"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              style="width:200px;"
              v-model="formData.remark"
              type="textarea"
              placeholder="请输入备注"
              maxlength="200"
              show-word-limit
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取 消</el-button>
        <el-button @click="reset()">重 置</el-button>
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
import { pageMenusCreate, pageMenusUpdate } from "@/api";
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
      if (this.rowData._id) {
        this.$nextTick(() => {
          Object.keys(this.formData).forEach(key => {
            this.formData[key] =
              this.rowData[key] === null ? undefined : this.rowData[key];
          });
        });
      }
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      loading: false,
      formData: {
        //  ... 表单字段
        name: null,
        path: null,
        icon: null,
        type: 0,
        remark: null,
        order: 0,
        show: true
      },
      rules: {
        //  ... 表单校验
        name: [
          { required: true, message: "必填项", trigger: "blur" },
          { min: 0, max: 20, message: "不能超过50个字符", trigger: "blur" }
        ],
        path: [{ required: true, message: "必填项", trigger: "blur" }]
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
          let api = pageMenusCreate;
          if (this.rowData._id) {
            api = pageMenusUpdate;
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
    reset() {
      this.$refs["form"] && this.$refs["form"].resetFields();
    },
    /** 关闭弹窗 */
    close() {
      // 初始化表单
      this.$refs["form"] && this.$refs["form"].resetFields();
      // 初始化没有挂载到表单的数据
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
