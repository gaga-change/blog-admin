<template>
  <div class="ComponentNameClass">
    <base-list
      ref="baseList"
      :tableConfig="tableConfig"
      :searchConfig="searchConfig"
      :api="listApi"
      :showControl="true"
      :controlWidth="160"
      :parseData="parseData"
    >
      <template slot-scope="scope">
        <el-link
          type="primary"
          @click="
            nowRow = scope.row;
            postFormDialogVisible = true;
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
            postFormDialogVisible = true;
          "
        >
          新建笔记
        </el-button>
      </template>
    </base-list>
    <post-form-dialog
      :visible.sync="postFormDialogVisible"
      :row="nowRow"
      @submited="getTableData"
    />
  </div>
</template>

<script>
import PostFormDialog from "./components/PostFormDialog";
import { postsList, postsDestroy } from "@/api";
const tableConfig = [
  { label: "标题", prop: "title" },
  { label: "分类", prop: "categoryText" },
  { label: "标签", prop: "tagsText" },
  { label: "创建时间", prop: "createdAt", type: "time" }
];

const searchConfig = [{ label: "标题", prop: "title" }];

export default {
  components: { PostFormDialog },
  data() {
    return {
      postFormDialogVisible: false,
      nowRow: null,
      tableConfig,
      searchConfig,
      listApi: postsList,
      // 可选 附加查询条件
      appendSearchParams: {}
    };
  },
  methods: {
    /** 删除 */
    handleDelete(row) {
      this.$apiConfirm(`是否确定删除【${row.name}】？`, () =>
        postsDestroy(row._id)
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
