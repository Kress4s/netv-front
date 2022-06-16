<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="condition" placeholder="请选择">
          <el-option v-for="item in queryFilter" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchContent" placeholder="请输入ip/标题查询"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getWhiteList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="add" @click="addDialogVisible = true">新增</el-button>
    <!-- 新增弹dialog -->
    <el-dialog title="新增" :visible.sync="addDialogVisible" width="40%" class="addLog">
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
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addIP">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog title="修改" :visible.sync="editDialogVisible" width="40%" class="addLog">
      <!-- dialog 的高度添加组件，高度会导致溢出，设置一个div 控制呈现 -->
      <div class="addDialog">
        <el-form ref="form" :model="editForm" label-width="50px" label-position="left" size="medium">
          <el-form-item label="标题:">
            <el-input v-model="editForm.title" type="text" maxlength="32" show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="IP:">
            <el-input v-model="editForm.ip" type="text" maxlength="12" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit()">确 定</el-button>
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
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="small" @click="get(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteIP(scope.row.id)"></el-button>
        </template>
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
      queryFilter: [{
        value: 'keywords',
        label: 'IP'
      }, {
        value: 'keywords',
        label: '标题'
      }
      ],
      condition: "",
      searchContent: "",
      queryInfo: {
        page: 1,
        page_size: 10,
      },
      total: 0,

      addDialogVisible: false,

      editDialogVisible: false,

      addForm: {
        ip: "",
        title: "",
      },

      editForm: {
        ip: "",
        title: ""
      },
    };
  },
  methods: {
    // 获取数据
    getWhiteList() {
      if (this.condition != "" && this.searchContent != "") {
        this.queryInfo[this.condition] = this.searchContent
      }
      this.$http
        .get("/api/v1/application/cdns", { params: this.queryInfo })
        .then((response) => {
          this.tableData = response.data.data
          this.total = response.data.pagination.total_count
        })
        .catch((err) => {
          if (err.response.status === 500) {
            return this.$message.error("服务端错误");
          }
        });
        // 清除搜索条件
        delete this.queryInfo[this.condition]
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
    addIP() {
      this.$http.post("/api/v1/application/cdn", this.addForm).then((resp) => {
        this.addDialogVisible = false
        this.getWhiteList()
        this.$notify({
          title: '成功',
          message: resp.status,
          type: 'success'
        });
      }).catch((err) => {
        return this.$notify.error({
          title: '错误',
          message: err.response.status
        });
      })
    },
    // 获取
    get(id) {
      this.$http.get("/api/v1/application/cdn/" + id).then((resp) => {
        this.editForm = resp.data
      })
      this.editDialogVisible = true
    },
    // 修改
    edit() {
      this.$http.put("/api/v1/application/cdn/" + this.editForm.id, this.editForm).then((resp) => {
        this.getWhiteList()
        this.$notify({
          title: '修改成功',
          message: resp.status,
          type: 'success'
        });
      }).catch((err) => {
        return this.$notify.error({
          title: '错误',
          message: err.response.status
        });
      })
      this.editDialogVisible = false
    },
    async deleteIP(id) {
      var result = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
      console.log(result)
      if (result === "confirm") {
        this.$http.delete("/api/v1/application/cdn/" + id).then((resp) => {
          this.$notify({
            title: '删除成功',
            message: resp.status,
            type: 'success'
          });
          this.getWhiteList()
        }).catch((err) => {
          this.$notify.error({
            title: '错误',
            message: err.response.status
          });
        })
      }
    }
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
