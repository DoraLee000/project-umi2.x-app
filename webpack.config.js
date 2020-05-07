/**
 * 不是真實的 webpack 配置，僅為了兼容 webstorm 和 intellij idea 代碼跳轉
 * ref: https://github.com/umijs/umi/issues/1109#issuecomment-423380125
 */

module.exports = {
  resolve: {
    alias: {
      '@': require('path').resolve(__dirname, 'src'),
    },
  },
};
