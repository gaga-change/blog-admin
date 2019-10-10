<template>
  <div class="BaseListComponent">
    <div>
      <search-form
        :config="searchConfig"
        @search="handleSearch"
        :labelWidth="labelWidth"
      >
      </search-form>
    </div>
    <div class="f12 mt15">
      <slot name="btns"></slot>
    </div>
    <div class="mt15">
      <base-table
        ref="baseTable"
        :api="api"
        :parseData="parseData"
        :config="tableConfig"
        :data.sync="tableData"
        :searchParams="searchParams"
        :showControl="showControl"
        :controlName="controlName"
        :controlWidth="controlWidth"
        :showControlFixed="showControlFixed"
        :select="select"
        @selectionChange="selectionChange"
        @expandChange="row => $emit('expandChange', row)"
        :selectable="selectable"
        :expand="expand"
      >
        <template slot-scope="scope">
          <slot v-bind:row="scope.row" v-bind:index="scope.index"></slot>
        </template>
        <template slot="expand" slot-scope="scope">
          <slot
            name="expand"
            v-bind:row="scope.row"
            v-bind:index="scope.index"
          ></slot>
        </template>
      </base-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /** 是否扩展 */
    expand: {
      type: Boolean,
      default: false
    },
    /** 附加的搜索条件 */
    appendSearchParams: {
      type: Object,
      default: () => ({})
    },
    searchConfig: {
      type: Array,
      default: () => []
    },
    /** 搜索 label宽度 */
    labelWidth: {
      type: Number,
      default: 80
    },
    tableConfig: {
      type: Array,
      default: () => []
    },
    /** 表格api接口 */
    api: {
      type: Function,
      default: null
    },
    /** 表格api接口 -  解析接口返回的数据。 */
    parseData: {
      type: Function,
      default: null
    },
    /** 显示 【操作】 */
    showControl: {
      type: Boolean,
      default: false
    },
    /** 显示 【操作】 - 更改名称 */
    controlName: {
      type: String,
      default: "操作"
    },
    /** 显示 【操作】 - 宽度 */
    controlWidth: {
      type: Number,
      default: 160
    },
    /** 操作栏 是否固定右侧 */
    showControlFixed: {
      type: Boolean,
      default: true
    },
    /** 是否可选 */
    select: {
      type: Boolean,
      default: false
    },
    /** 可选条件 */
    selectable: {
      type: Function,
      default: () => true
    }
  },
  data() {
    let initSearchParams = {};
    let query = this.$route.query;
    this.searchConfig.forEach(v => {
      if (v.default !== undefined && v.default !== null) {
        initSearchParams[v.prop] = v.default;
      }
      if (query[v.prop]) {
        initSearchParams[v.prop] = query[v.prop];
      }
    });
    return {
      tableData: [],
      searchParams: { ...this.appendSearchParams, ...initSearchParams },
      selectRows: [],
      rowNow: {}
    };
  },
  watch: {
    tableData(val) {
      this.$emit("updateData", val);
    }
  },
  methods: {
    /** 清除选中 */
    clearSelection() {
      this.$refs["baseTable"].clearSelection();
    },
    /** 搜索 */
    handleSearch(params, callback) {
      let obj = { ...params, ...this.appendSearchParams };
      this.searchParams = obj;
      this.$nextTick(() => {
        this.$emit("search", { ...obj });
        this.$refs["baseTable"].fetchData().then(callback);
      });
    },
    /** 刷新列表 */
    fetchData(callback) {
      this.$refs["baseTable"].fetchData().then(callback);
    },
    /** 多选选择 */
    selectionChange(val) {
      this.$emit("selectionChange", val);
    }
  }
};
</script>

<style lang="less">
.BaseListComponent {
  &.red {
    .el-card {
      border: 1px solid#f56c6c6e !important;
    }
  }
}
</style>
