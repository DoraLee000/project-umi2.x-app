
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [  
      'umi-plugin-gh-pages',
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
  base: '/project-umi/',
  publicPath: '/project-umi/',
  proxy:{
    '/api':{
      target:'https://cjy-react-interface.herokuapp.com/',
      changeOrigin: true,
    }
  }
}
