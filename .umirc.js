
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  // routes: [
  //    { path: '/', component: './users' },
  //   // { path: '/list', component: './b', Routes: ['./routes/PrivateRoute.js'] },
  //   // { path: '/users', component: './users/_layout',
  //   //   routes: [
  //   //     { path: '/users/detail', component: './users/detail' },
  //   //     { path: '/users/:id', component: './users/id' }
  //   //   ]
  //   // },
  // ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
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
  proxy:{
    '/api':{
      target:'https://cjy-react-interface.herokuapp.com/',
      changeOrigin: true,
    }
  }
}
