
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      // 'umi-plugin-gh-pages',
      'umi-plugin-react', {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'project-umi',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      }],
  ],
  // routes: [
  //   {
  //     path: '/',
  //     component: '../pages/login',
  //   },
  //   {
  //     path: '/', component: '../layouts/index', routes: [
  //       {
  //         path: '/users',
  //         component: '../pages/users'
  //       },
  //       {
  //         path: '/reports',
  //         component: '../pages/reports'
  //       }
  //     ]
  //   }
  // ],
  // publicPath: '/',
  proxy: {
    '/api': {
      target: 'https://cjy-react-interface.herokuapp.com/',
      changeOrigin: true,
    }
  }
}
