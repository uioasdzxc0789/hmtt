module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      // rootValue设置基准字体大小
      rootValue ({ file }) {
        // 只有我们自己写的除以75，其他vant，github-markdown样式除以37.5
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },
      // propList设置又哪些样式的属性名比如width，height可以转换
      propList: ['*']
    }
  }
}
