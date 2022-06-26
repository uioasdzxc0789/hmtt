// vue脚手架项目默认的配置文件名
// webpack+node环境-导出配置对象
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: '127.0.0.1',
    port: 3001
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '黑马头条'
        return args
      })
  }
})
