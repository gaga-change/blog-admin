<template>
  <div>
    <double-list
      ref="doubleList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :api="listApi"
      :showControl="true"
      :controlWidth="160"
      @childSelectionChange="childSelectionChange"
      :childApi="childApi"
      :childTableConfig="childTableConfig"
    >
      <template slot-scope="scope">
        <el-link type="primary" @click="temp(scope.row)">修改</el-link>
        <el-divider direction="vertical"></el-divider>
      </template>
      <template slot="btns">
        <el-button type="primary">添加</el-button>
      </template>
    </double-list>
  </div>
</template>

<script>
import { getInfoOutWarehousing, getInfoDetailOutWarehousing } from "@/api";

const childTableConfig = [
  { label: "商品编码", prop: "skuCode", width: 150 },
  { label: "商品名称", prop: "skuName", width: 150 },
  { label: "规格", prop: "skuFormat" },
  { label: "型号", prop: "skuModel" },
  { label: "单位", prop: "skuUnitCode" },
  { label: "商品数量", prop: "numberOfProducts" },
  { label: "出库数量", prop: "realOutQty" },
  { label: "出库批次", prop: "batchNo" },
  { label: "备注", prop: "remarkInfo" }
];
const tableConfig = [
  { label: "出库时间", prop: "gmtCreate", type: "time", width: 140 },
  { label: "出库单号", prop: "orderCode" },
  { label: "计划单号", prop: "planCode", width: 140 },
  { label: "推送状态", prop: "isPush", type: "enum", enum: "isPushStateEnum" },
  {
    label: "单据类型",
    prop: "orderType",
    type: "enum",
    enum: "busiBillTypeEnum"
  },
  {
    label: "单据状态",
    prop: "orderStatus",
    type: "enum",
    enum: "outboundOrderStatus"
  },
  { label: "客户/供应商", prop: "ownerName" },
  { label: "操作人", prop: "createrName" }
];
const searchConfig = [
  { label: "计划单号", prop: "planCode" },
  { label: "出库单号", prop: "orderCode" },
  { label: "客户/供应商", prop: "ownerName" },
  {
    label: "单据状态",
    prop: "orderStatus",
    type: "enum",
    enum: "outboundOrderStatus"
  },
  {
    label: "出库时间",
    prop: "createTimeArea",
    props: ["startDate", "endDate"],
    type: "timeArea"
  }
];

export default {
  data() {
    return {
      tableConfig,
      searchConfig,
      childTableConfig,
      listApi: getInfoOutWarehousing,
      childSelectRows: [],
      mainRow: {}
    };
  },
  methods: {
    /** 子表内容获取 */
    childApi(row) {
      return getInfoDetailOutWarehousing({ orderCode: row.orderCode }).then(
        res => {
          if (!res || !res.data || !res.data[0]) return;
          return res.data[0].queryOutWarehouseOrderDetailVOSList || [];
        }
      );
    },
    /** 刷新列表 */
    getTableData() {
      this.$refs["doubleList"].fetchData();
    },
    /** 子表多选 */
    childSelectionChange(selectRows, mainRow) {
      this.childSelectRows = selectRows;
      this.mainRow = mainRow;
    }
    // /** 子表多选（允许跨多表） */
    // childSelectionChange(selectRowsAndMainRow) {
    //   let temp = []
    //   selectRowsAndMainRow.forEach(({ selectRows, mainRow }) => {
    //     temp.push(...selectRows.map(v => {
    //       return {
    //         planCode: mainRow.planCode,
    //         ownerCode: mainRow.ownerCode,
    //         ...v,
    //       }
    //     }))
    //   })
    //   this.childSelectRows = temp
    // }
  }
};
</script>
