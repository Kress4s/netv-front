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
          class="el-menu-vertical-demo"
          background-color="#25304c"
          active-text-color="#1d2842"
          unique-opened
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
                ><span style="color: white">{{ ii.name }}</span></el-menu-item
              >
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
  background-color: #fff;
  color: #333;
}

.el-aside {
  border-radius: 10px;
  margin: 17px;
  background-color: #25304c;
}

.el-main {
  background-color: #e9eef3;
}

.el-submenu {
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