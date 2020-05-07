import router from 'umi/router';

export default ({ children, match, route }) => {

  //如果沒有登入情況下;返回登入頁面
  if (!localStorage.username && match.path !== '/login') {
    router.push('/login')
  }

  if (localStorage.username && match.path === '/login') {
    router.push('/reports')
  }

  return children
}
