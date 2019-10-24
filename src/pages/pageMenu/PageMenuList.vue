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
            pageMenuFormDialogVisible = true;
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
            pageMenuFormDialogVisible = true;
          "
        >
          新建菜单
        </el-button>
      </template>
    </base-list>
    <pageMenu-form-dialog
      :visible.sync="pageMenuFormDialogVisible"
      :row="nowRow"
      @submited="getTableData"
    />
  </div>
</template>

<script>
import PageMenuFormDialog from "./components/PageMenuFormDialog";
import { pageMenusList, pageMenusDestroy } from "@/api";
const tableConfig = [
  { label: "名称", prop: "name" },
  { label: "路径", prop: "path" },
  { label: "类型", prop: "type", type: "enum", enum: "pageMenuType" },
  { label: "是否显示", prop: "show", type: "enum", enum: "booleanEnum" },
  { label: "优先级", prop: "order" },
  { label: "备注", prop: "remark" },
  { label: "创建时间", prop: "createdAt", type: "time" }
];

const searchConfig = [{ label: "名称", prop: "name" }];

export default {
  components: { PageMenuFormDialog },
  data() {
    return {
      pageMenuFormDialogVisible: false,
      nowRow: null,
      tableConfig,
      searchConfig,
      listApi: pageMenusList,
      // 可选 附加查询条件
      appendSearchParams: {}
    };
  },
  methods: {
    /** 删除 */
    handleDelete(row) {
      this.$apiConfirm(`是否确定删除【${row.name}】？`, () =>
        pageMenusDestroy(row._id)
      ).then(res => {
        if (!res) return;
        this.$message.success("操作成功！");
        this.getTableData();
      });
    },
    /** 刷新列表 */
    getTableData() {
      this.$refs["baseList"].fetchData();
      this.$store.dispatch("initMap", "pageMenus");
    },
    /** 新建 */
    handleCreate() {
      this.$router.push({ path: "/qualityTesting/create" });
    }
  }
};
</script>
