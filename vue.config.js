const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

// 配置项目端口和启动浏览器打开
module.exports = {
  devServer: {
    open: true,
    port: 8888
  }
}