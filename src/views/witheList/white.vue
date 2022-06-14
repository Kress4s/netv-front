<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="分类">
        <el-select v-model="formInline.region" placeholder="分类">
          <el-option label="标题" value="shanghai"></el-option>
          <el-option label="IP" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="formInline.user" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe border style="width: 100%">
      <!-- 这里  el-table-column不设置width 列的宽度自适应 -->
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="create_at" label="创建时间"> </el-table-column>
      <el-table-column prop="ip" label="IP"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="" label="操作"></el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]"
      :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  created() {
    this.getWhiteList()
  },
  data() {
    return {
      tableData: [],
      formInline: {
        user: "",
        region: "",
      },
      queryInfo: {
        page: 1,
        page_size: 10
      },
      total: 0,
    };
  },
  methods: {
    // 获取数据
    getWhiteList() {
      this.$http.get("/api/v1/application/cdns", { params: this.queryInfo}).then((response) => {
        this.tableData = response.data.data
        this.total = response.data.pagination.total_count
      }).catch((err) => {
        if (err.response.status === 500) {
          return this.$message.error("服务端错误")
        }
      })
    },
    handleSizeChange(newSize) {
      this.queryInfo.page_size = newSize
      this.getWhiteList()
    },
    handleCurrentChange(newPageNum) {
      this.queryInfo.page = newPageNum
      this.getWhiteList()
    }
  }
};
</script>

<style>
.el-form {
  float: right;
}
</style>