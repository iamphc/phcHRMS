import { defineConfig } from 'umi';
const resolve = require('path').resolve

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: { immer: true },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  alias: {
    utils: resolve(__dirname, './src/utils'),
    apis: resolve(__dirname, './src/apis')
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true
    }
  }
});
