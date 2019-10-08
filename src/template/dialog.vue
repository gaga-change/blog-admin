<template>
  <div class="">
    <!-- 600px【小型，单列】 70% 【中型，双列】-->
    <el-dialog
      title="title"
      :visible="visible"
      width="70%"
      :before-close="handleClose"
      @close="close"
    >
      <div>
        内容
      </div>
      <!-- <el-alert
        class="mt15"
        title="温馨提示："
        type="info"
        :closable="false"
      >
        <p>举例，商品最小单位默认为1,4个最小单位为一个内包装【一个内包装数量为4】，
          2个内包装为1箱【一箱数量8】，10箱为一个容器【一容器数量为80】</p>
      </el-alert> -->
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="close()"
          size="mini"
        >取 消</el-button>
        <el-button
          type="primary"
          size="mini"
          :loading="loading"
          @click="confirm()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 父级设置
 * <dialog
      :visible.sync="dialogVisible"
      :row="selectedRow"
      @submited="getTableData()"
    />
 */
// import { saveApi } from '@/api'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    /** 数据初始 */
    row: {
      type: Object,
      default: {}
    }
  },
  computed: {
    /** 防止父级传递 null */
    rowData() {
      return this.row || {}
    }
  },
  watch: {
    /** 监听数据切换，重置表单 */
    visible(val) {
      if (!val) return
      Object.keys(this.formData).forEach(key => {
        this.$set(this.formData, key, this.rowData[key] === null ? undefined : this.rowData[key])
      })
    }
  },
  data() {
    return {
      loading: false,
      formData: {
        //  ... 表单字段
      }
    }
  },
  methods: {
    /** 确定 */
    confirm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = { ...this.formData }
          for (let key in params) {
            if (params[key] === undefined) {
              params[key] = ''
            }
          }
          // saveApi(params).then(res => {
          //   this.loading = false
          //   if (!res) return
          //   this.$message.success('操作成功！')
          //   this.$emit('submited')
          //   this.close()
          // })
        }
      })
    },
    /** 关闭弹窗 */
    close() {
      // this.$refs['form'] && this.$refs['form'].resetFields()
      this.visible && this.$emit('update:visible', false)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  }
}
</script>