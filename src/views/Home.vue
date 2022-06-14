<template>
  <el-container>
    <el-aside width="230px">
      <div>
        <div class="brandP">
          <div class="brand">
            <span>NETV</span>
          </div>
          <div>
            <span>奈特鱼网络平台</span>
          </div>
        </div>
        <el-menu
          default-active="/home/welcome"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#25304c"
          text-color="#fff"
          active-text-color="rgb(155, 230, 255)"
          :collapse="isCollapse"
          unique-opened
          :router="true"
        >
        <!-- 在:router="true" 启动vue-router模式时,index为vue的路由 -->
          <el-menu-item :index="'/home' + item.path" v-for="item in noChild" :key="item.id">
            <i :class="menuLogo[item.id]"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
          <el-submenu :index="item.id" v-for="item in hasChild" :key="item.id">
            <template slot="title">
              <i :class="menuLogo[item.id]"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group
              v-for="subItem in item.child"
              :key="subItem.id"
            >
              <el-menu-item :index="'/home' + subItem.path">{{
                subItem.name
              }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <div class="user">
          <img src="../assets/logo.png" alt="" />
          <el-dropdown>
            <span class="el-dropdown-link">
              张三<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>用户中心</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuList: [
        { id: 1, name: "首页", path:"/welcome"},
        { id: 2, name: "白名单", path:"/whileList"},
        {
          id: 3,
          name: "数据分析",
          path:"/dataAnalysis",
          child: [
            { id: 30, name: "用户分析", path:"/dataAnalysis/user"},
            { id: 31, name: "访问分析", path:"/dataAnalysis/visit"},
          ],
        },
        { id: 4, name: "JS分析", path:"/jsAnalysis"},
        { id: 5, name: "关于我们", path:"/us" },
      ],
      menuLogo: {
        1: "el-icon-s-home",
        2: "el-icon-s-custom",
        3: "el-icon-s-marketing",
        4: "el-icon-s-data",
        5: "el-icon-s-flag",
      },
    };
  },
  computed: {
    noChild() {
      return this.menuList.filter((item) => !item.child);
    },
    hasChild() {
      return this.menuList.filter((item) => item.child);
    },
  },
};
</script>

<style>
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  margin: 17px 17px 17px 5px;
  border-radius: 10px;
  background-color: #fff;
  color: #333;
}

.el-aside {
  border-radius: 10px;
  margin: 17px;
  background-color: #25304c;
}

.el-main {
  background-color: #fff;
  border-radius: 10px;
  margin: 0 17px 17px 5px;
}

.el-submenu {
  position: relative;
  left: 10px;
}

.el-menu-item{
  position: relative;
  left: 10px;
}



.brand {
  margin-top: 26px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #9be6ff;
  font-size: 40px;
  cursor: pointer;
}
.brand + div {
  font-size: 14px;
  color: #adbae2;
  line-height: 14px;
  text-align: center;
}

.brandP {
  margin-bottom: 75px;
  position: relative;
  right: 28px;
}

.user {
  float: right;
  height: 60px;
}

.user > img {
  height: 40px;
  width: 40px;
  border: blue solid 1px;
  border-radius: 100%;
  position: relative;
  top: 9px;
  right: 16px;
}

.el-dropdown {
  /* line-height: 60px; */
  position: relative;
  bottom: 6px;
  cursor: pointer;
}
</style>