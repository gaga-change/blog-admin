<template>
  <div class="ComponentNameClass">
    <base-list
      ref="baseList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :api="listApi"
      :showControl="true"
      :controlWidth="160"
    >
      <template slot-scope="scope">
        <el-link
          type="primary"
          @click="
            nowRow = scope.row;
            categoryFormDialogVisible = true;
          "
          >编辑</el-link
        >
        <el-divider direction="vertical"></el-divider>
        <el-link type="primary" @click="handleDelete(scope.row)">删除</el-link>
      </template>
      <template slot="btns">
        <el-button
          type="primary"
          size="mini"
          @click="
            nowRow = null;
            categoryFormDialogVisible = true;
          "
        >
          新建分类
        </el-button>
      </template>
    </base-list>
    <category-form-dialog
      :visible.sync="categoryFormDialogVisible"
      :row="nowRow"
      @submited="getTableData"
    />
  </div>
</template>

<script>
import CategoryFormDialog from "./components/CategoryFormDialog";
import { categoriesList, categoriesDestroy } from "@/api";
const tableConfig = [
  { label: "名称", prop: "name" },
  { label: "备注", prop: "remark" },
  { label: "创建时间", prop: "createdAt", type: "time" }
];

const searchConfig = [{ label: "名称", prop: "name" }];

export default {
  components: { CategoryFormDialog },
  data() {
    return {
      categoryFormDialogVisible: false,
      nowRow: null,
      tableConfig,
      searchConfig,
      listApi: categoriesList,
      // 可选 附加查询条件
      appendSearchParams: {}
    };
  },
  methods: {
    /** 删除 */
    handleDelete(row) {
      this.$apiConfirm(`是否确定删除【${row.name}】？`, () =>
        categoriesDestroy(row._id)
      ).then(res => {
        if (!res) return;
        this.$message.success("操作成功！");
        this.getTableData();
      });
    },
    /** 刷新列表 */
    getTableData() {
      this.$refs["baseList"].fetchData();
    },
    /** 新建 */
    handleCreate() {
      this.$router.push({ path: "/qualityTesting/create" });
    }
  }
};
</script>
