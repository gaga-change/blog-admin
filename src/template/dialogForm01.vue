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
        <el-form
          :inline="false"
          :model="formData"
          :rules="rules"
          label-width="100px"
          ref="form"
        >
          <!-- 
          1. 确认元素
          2. 配置文案&描述 、调整样式
          3. 字段配置
          4. 规则配置
          -->
          <!-- 输入框 -->
          <el-form-item
            label="包装描述"
            prop="packageDesc"
          >
            <el-input
              style="width:200px;"
              v-model="formData.packageDesc"
              placeholder="数字，不能超过20个字符"
            ></el-input>
          </el-form-item>
          <!-- 多行文本框 -->
          <el-form-item
            label="包装描述"
            prop="packageDesc2"
          >
            <el-input
              style="width:200px;"
              v-model="formData.packageDesc2"
              type="textarea"
              placeholder="请输入内容"
              maxlength="30"
              show-word-limit
            >
            </el-input>
          </el-form-item>
          <!-- 数字框 -->
          <el-form-item
            label="最小单位"
            prop="single"
          >
            <el-input-number
              placeholder="最小单位"
              v-model="formData.single"
              :precision="0"
              :min="0"
              :max="99999999"
              controls-position="right"
            ></el-input-number>
          </el-form-item>
          <!-- 下拉框 -->
          <el-form-item
            label="库区性质"
            prop="warehouseAreaNature"
          >
            <el-select
              v-model="formData.warehouseAreaNature"
              placeholder="请选择库区性质"
              clearable
            >
              <el-option
                v-for="item in []"
                :key="item.name"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 开关 -->
          <el-form-item
            label="是否混批次"
            prop="isLot"
          >
            <el-switch
              v-model="formData.isLot"
              :active-value='1'
              :inactive-value='0'
            >
            </el-switch>
          </el-form-item>
          <!-- 单选 -->
          <el-form-item
            label="特殊资源"
            prop="resource"
          >
            <el-radio-group v-model="formData.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
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
        <el-button @click="close()">取 消</el-button>
        <el-button
          type="primary"
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
      },
      rules: {
        //  ... 表单校验
        packageDesc: [
          { required: true, message: '必填项', trigger: 'blur' },
          { min: 0, max: 20, message: '不能超过20个字符', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              value > 0 ? callback() : callback('数值必须大于0')
            },
            trigger: 'blur'
          }
        ]
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
      // 初始化表单
      // this.$refs['form'] && this.$refs['form'].resetFields()
      // 初始化没有挂载到表单的数据
      // ...
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