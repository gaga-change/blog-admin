<template>
  <div class="ComponentNameClass">
    <base-list
      ref="baseList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :api="listApi"
      :showControl="true"
      :controlWidth="160"
      :select="true"
      @selectionChange="selectionChange"
      :selectable="() => true"
    >
      <template slot-scope="scope">
        <el-link
          type="primary"
          @click="
            $router.push({
              path: `/qualityTesting/detail`,
              query: { id: scope.row.id }
            })
          "
          >详情</el-link
        >
        <el-divider direction="vertical"></el-divider>
        <el-link type="primary">修改</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link type="primary" @click="handleDeleteRow(scope.row)"
          >删除</el-link
        >
      </template>
      <template slot="btns">
        <el-button type="primary" size="mini" @click="handleCreate">
          新建质检记录
        </el-button>
        <el-tooltip
          class="item"
          effect="dark"
          content="导出当前查询的所有记录"
          placement="top"
        >
          <el-button type="primary" size="mini" @click="() => {}">
            导出
          </el-button>
        </el-tooltip>
      </template>
    </base-list>
  </div>
</template>

<script>
import { checkOrderList } from "@/api";
const tableConfig = [
  { label: "质检单号 ", prop: "orderCode", width: 140 },
  { label: "收货单号 ", prop: "receiveOrderCode", width: 140 },
  { label: "创建人", prop: "createrName" },
  { label: "创建时间", prop: "gmtCreate", type: "time", width: 140 },
  { label: "是否虚拟区", prop: "isVirtual", type: "enum", enum: "yesOrNoEnum" }
];
const searchConfig = [
  { label: "质检单号", prop: "orderCode" },
  {
    label: "创建时间",
    prop: "createTimeArea",
    props: ["startDate", "endDate"],
    type: "timeArea"
  },
  {
    label: "库区性质",
    prop: "warehouseAreaNature",
    type: "enum",
    enum: "mapConfig"
  }
];
export default {
  data() {
    return {
      tableConfig,
      searchConfig,
      listApi: checkOrderList,
      selectRows: [],
      // 可选 附加查询条件
      appendSearchParams: {}
    };
  },
  methods: {
    /** 刷新列表 */
    getTableData() {
      this.$refs["baseList"].fetchData();
    },
    /** 主表多选 */
    selectionChange(selectRows) {
      this.selectRows = [...selectRows];
    },
    /** 删除当前行 */
    handleDeleteRow(row) {
      // this.$apiConfirm('是否确定删除？', () => delApi(row.id)).then(res => {
      //   if (!res) return
      //   this.$message.success('操作成功！')
      //   this.getTableData()
      // })
    },
    /** 可选 返回列表添加字段 */
    parseData(res) {
      let list = res.list || [];
      let total = res.total;
      list.forEach(v => {
        v.tagsText = v.tags.map(v => v.name).join(",");
        v.categoryText = v.category && v.category.name;
      });
      return { list, total };
    },
    /** 新建 */
    handleCreate() {
      this.$router.push({ path: "/qualityTesting/create" });
    }
  }
};
</script>
