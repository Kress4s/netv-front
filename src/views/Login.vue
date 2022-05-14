<template>
  <div class="loginContainer">
    <div class="loginBox">
      <div id="avatar">
        <img src="../assets/Company.png" alt="" />
      </div>
      <!-- <el-form ref="form" :model="form.name" label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form> -->
    </div>
  </div>
</template>

<script>
//   export default {
//     data() {
//       return {
//         form: {
//           name: '',
//           region: '',
//           date1: '',
//           date2: '',
//           delivery: false,
//           type: [],
//           resource: '',
//           desc: ''
//         }
//       }
//     },
//     methods: {
//       onSubmit() {
//         console.log('submit!');
//       }
//     }
//   }
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
  width: 400px;
  height: 450px;
  position: absolute;
  border: 0 solid 1em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>
