<template>
  <el-container>
    <el-aside width="230px">
      <div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#25304c"
          active-text-color="#1d2842"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
            <template slot="title"
              ><i :class="menuLogo[item.id]"></i
              ><span style="color: white; text-align: left">{{
                item.name
              }}</span></template
            >
            <el-menu-item-group v-if="item.child">
              <el-menu-item v-for="ii in item.child" :key="ii.id"
                ><i class="el-icon-menu"></i
                ><span style="color:white">{{ ii.name }}</span></el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [
        { id: 1, name: "首页" },
        { id: 2, name: "白名单" },
        {
          id: 3,
          name: "数据分析",
          child: [
            { id: 30, name: "用户分析" },
            { id: 31, name: "访问分析" },
          ],
        },
        { id: 4, name: "JS分析" },
        { id: 5, name: "关于我们" },
      ],
      menuLogo: {
        1: "el-icon-user",
        2: "el-icon-lock",
        3: "el-icon-goods",
        4: "el-icon-notebook-2",
        5: "el-icon-data-line",
      },
    };
  },
};
</script>

<style>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  margin: 17px;
  border-radius: 10px;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 500px;
}

.el-aside {
  border-radius: 10px;
  margin: 17px;
  background-color: #25304c;
}

.el-main {
  background-color: #e9eef3;
}
</style>