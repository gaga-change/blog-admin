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
          >快速编辑</el-link
        >
        <el-divider direction="vertical"></el-divider>
        <el-link
          type="primary"
          @click="
            $router.push({ name: 'PostCreate', query: { id: scope.row._id } })
          "
          >编辑</el-link
        >
        <el-divider direction="vertical"></el-divider>
        <el-link type="primary" @click="handleDelete(scope.row)">删除</el-link>
      </template>
      <template slot="btns">
        <el-button type="primary" size="mini" @click="handleCreate">
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
  { label: "发布", prop: "show", type: "enum", enum: "booleanEnum" },
  { label: "发布时间", prop: "releaseDate", type: "time" },
  { label: "创建时间", prop: "createdAt", type: "time" }
];

const searchConfig = [
  { label: "标题", prop: "title" },
  { label: "分类", prop: "category", type: "enum", enum: "categories" },
  { label: "标签", prop: "tags", type: "enum", enum: "tags" }
];

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
      this.$apiConfirm(`是否确定删除【${row.title}】？`, () =>
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
      this.$router.push({ name: "PostCreate" });
    }
  }
};
</script>
