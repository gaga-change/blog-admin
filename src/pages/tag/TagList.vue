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
            tagFormDialogVisible = true;
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
            tagFormDialogVisible = true;
          "
        >
          新建标签
        </el-button>
      </template>
    </base-list>
    <tag-form-dialog
      :visible.sync="tagFormDialogVisible"
      :row="nowRow"
      @submited="getTableData"
    />
  </div>
</template>

<script>
import TagFormDialog from "./components/TagFormDialog";
import { tagsList, tagsDestroy } from "@/api";
const tableConfig = [
  { label: "名称", prop: "name" },
  { label: "备注", prop: "remark" },
  { label: "创建时间", prop: "createdAt", type: "time" }
];

const searchConfig = [{ label: "名称", prop: "name" }];

export default {
  components: { TagFormDialog },
  data() {
    return {
      tagFormDialogVisible: false,
      nowRow: null,
      tableConfig,
      searchConfig,
      listApi: tagsList,
      // 可选 附加查询条件
      appendSearchParams: {}
    };
  },
  methods: {
    /** 删除 */
    handleDelete(row) {
      this.$apiConfirm(`是否确定删除【${row.name}】？`, () =>
        tagsDestroy(row._id)
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
    /** 可选 返回列表添加字段 */
    parseData(res) {
      let data = res.data.list || [];
      let total = res.data.total;
      data.forEach(v => {
        v.updateLockStatusOutLoading = false;
        v.updateLockStatusInLoading = false;
      });
      return { data, total };
    },
    /** 新建 */
    handleCreate() {
      this.$router.push({ path: "/qualityTesting/create" });
    }
  }
};
</script>
