<template>
  <div class="loginContainer">
    <div class="loginBox">
      <div id="avatar">
        <img src="../assets/Company.png" alt="" />
      </div>
      <el-form ref="form" :model="form.name" label-width="80px" class="login_form">
        <el-form-item>
          <el-input v-model="form.name" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item  prop="password">
         <el-input v-model="form.name" prefix-icon="el-icon-warning-outline" show-password></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: ''
        }
      }
    },
    methods: {
    }
  }
</script>


<style scoped>
.loginContainer {
  background-color: #2b4b6b;
  width: 100%;
  height: 100%;
}
.loginBox {
  background-color: #fff;
  border-radius: 3px;
  width: 466px;
  height: 286px;
  position: absolute;
  border: 0 solid 1em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}

#avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: #eee;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
}

#avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 1px 1px 10px #eee;
}

.login_form {
  position: relative;
  right: 31px;
  top: -13px;
  width: 100%;
}
.el-form-item {
  padding: 0px;
  float: left;
  width: 100%;
}

</style>
