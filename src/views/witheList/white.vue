<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="查询分类">
          <el-option label="标题" value="shanghai"></el-option>
          <el-option label="IP" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="请输入ip/标题查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="add" @click="addDialogVisible = true">新增</el-button>
    <!-- 新增弹dialog -->
    <el-dialog title="新增白名单" :visible.sync="addDialogVisible" width="40%" class="addLog">
      <!-- dialog 的高度添加组件，高度会导致溢出，设置一个div 控制呈现 -->
      <div class="addDialog">
        <el-form ref="form" :model="addForm" label-width="50px" label-position="left" size="medium">
          <el-form-item label="标题:">
            <el-input v-model="addForm.title" type="text" maxlength="32" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="IP:">
            <el-input v-model="addForm.ip" type="text" maxlength="12" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" height="500" stripe border style="width: 100%">
      <!-- 这里  el-table-column不设置width 列的宽度自适应 -->
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="create_at" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_at | timeFormat }}
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="IP"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="" label="操作">
        <el-button type="primary" icon="el-icon-edit" size="small"></el-button>
        <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]"
      :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  created() {
    this.getWhiteList();
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
        page_size: 10,
      },
      total: 0,

      addDialogVisible: false,

      addForm: {
        ip: "",
        title: "",
      },
    };
  },
  methods: {
    // 获取数据
    getWhiteList() {
      this.$http
        .get("/api/v1/application/cdns", { params: this.queryInfo })
        .then((response) => {
          this.tableData = response.data.data;
          this.total = response.data.pagination.total_count;
        })
        .catch((err) => {
          if (err.response.status === 500) {
            return this.$message.error("服务端错误");
          }
        });
    },
    handleSizeChange(newSize) {
      this.queryInfo.page_size = newSize;
      this.getWhiteList();
    },
    handleCurrentChange(newPageNum) {
      this.queryInfo.page = newPageNum;
      this.getWhiteList();
    },
    // 新增
  },
};
</script>

<style>
.demo-form-inline {
  float: left;
}

.el-pagination {
  float: right;
}

.add {
  float: right;
}

.addDialog {
  height: auto;
  /* 溢出自动滚动 */
  overflow: auto;
  width: 400px;
  padding-left: 50px;
}
</style>
