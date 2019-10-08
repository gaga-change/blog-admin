<template>
  <div>
    <!-- showControlFixed 需要为 false，不然异常。fixed原理为双表叠加。 -->
    <base-list
      ref="baseList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :labelWidth="labelWidth"
      :api="api"
      :showControl="showControl"
      :controlWidth="controlWidth"
      :showControlFixed="false"
      :expand="true"
      @expandChange="hanldeExpandChange"
      @updateData="updateData"
      :parseData="middleParseData"
      :select="select"
      @selectionChange="rows => $emit('selectionChange', rows)"
      :selectable="selectable"
    >
      <template slot-scope="scope">
        <slot v-bind:row="scope.row" v-bind:index="scope.index"></slot>
      </template>
      <template slot="btns">
        <slot name="btns"></slot>
      </template>
      <template slot="expand" slot-scope="scope">
        <base-table
          :ref="`childTable-${scope.row._key}`"
          :config="childTableConfig"
          :data="scope.row._childData"
          :loading="scope.row._childLoading"
          :select="childSelect"
          :showIndex="childShowIndex"
          @selectionChange="
            rows => childSelectionChange(rows, scope.row, scope.row._key)
          "
          :selectable="childSelectable"
        >
        </base-table>
      </template>
    </base-list>
  </div>
</template>

<script>
export default {
  props: {
    /** 允许多表勾选 */
    selectTables: {
      type: Boolean,
      default: false
    },
    /** 子表是否可选 */
    childSelect: {
      type: Boolean,
      default: true
    },
    /** 子表可选条件 */
    childSelectable: {
      type: Function,
      default: () => true
    },
    /** 子表 是否显示序号 */
    childShowIndex: {
      type: Boolean,
      default: false
    },
    /** 子表表格配置 */
    childTableConfig: {
      type: Array,
      default: () => []
    },
    /** 子表api */
    childApi: {
      type: Function,
      default: null
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
    return {
      childSelectRows: [], // 单表
      childSelectRowsTotal: {} // 跨多表
    };
  },
  methods: {
    /** 列表内容刷新 */
    updateData() {
      // 重置选中
      this.childSelectRowsTotal = {};
      if (this.selectTables) {
        this.$emit("childSelectionChange", []);
      }
    },
    /** 清除选中 */
    clearSelection() {
      this.$refs["baseList"].clearSelection();
    },
    /** 刷新列表 */
    fetchData() {
      this.$refs["baseList"].fetchData();
    },
    /** 返回列表添加字段 */
    middleParseData(res) {
      let data;
      let total;
      if (this.parseData) {
        let obj = this.parseData(res);
        data = obj.data;
        total = obj.total;
      } else {
        data = res.data.list || [];
        total = res.data.total;
      }
      data.forEach((v, index) => {
        v._childData = [];
        v._childLoading = false;
        v._key = Date.now() + "-" + index;
      });
      return { data, total };
    },
    /** 子表多选 */
    childSelectionChange(selectRows, mainRow, key) {
      if (this.selectTables) {
        this.childSelectRowsTotal[key + ""] = { selectRows, mainRow };
        let temp = [];
        Object.keys(this.childSelectRowsTotal).forEach(key => {
          temp.push(this.childSelectRowsTotal[key]);
        });
        this.$emit("childSelectionChange", temp);
      } else {
        let oldKey = this.childSelectRows.key;
        let oldRows = this.childSelectRows;
        if (
          oldKey !== key &&
          (selectRows.length !== 0 || oldRows.length === 0)
        ) {
          // 更换列
          this.childSelectRows = [...selectRows];
          this.childSelectRows.key = key;
          this.childSelectRows.mainRow = mainRow;
          this.$emit(
            "childSelectionChange",
            this.childSelectRows,
            this.childSelectRows.mainRow
          );
          if (oldKey !== undefined) {
            // 准备重置 上一个列
            this.$nextTick(() => {
              // 翻页后元素消失判断
              this.$refs[`childTable-${oldKey}`] &&
                this.$refs[`childTable-${oldKey}`].clearSelection();
            });
          }
        } else if (oldKey === key) {
          // 更新列
          this.childSelectRows.splice(0);
          this.childSelectRows.push(...selectRows);
          this.$emit(
            "childSelectionChange",
            this.childSelectRows,
            this.childSelectRows.mainRow
          );
        } else {
          // 被重置
        }
      }
    },
    /** 子列表展开 */
    hanldeExpandChange(row) {
      row._childLoading = true;
      return this.childApi(row).then(data => {
        row._childLoading = false;
        row._childData = data || [];
      });
      // childApi({ orderCode: row.orderCode }).then(res => {
      //   row._childLoading = false
      //   if (!res || !res.data || !res.data[0]) return
      //   row._childData = res.data[0].queryOutWarehouseOrderDetailVOSList || []
      // })
    }
  }
};
</script>
