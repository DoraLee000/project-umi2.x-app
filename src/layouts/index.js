import { Layout, ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Header from './Header'
import Footer from './Footer'
import './index.scss'
const { Content } = Layout;

function BasicLayout({ location, children }) {
  if(location.pathname === '/login'){
    return children
  }
 
  return (
    <ConfigProvider locale={zhCN}>
      <Layout className="basic-layout">
        <Header/> 
        <Content className="conten">{children}</Content>
        <Footer/>
      </Layout>
    </ConfigProvider>
  );
}

export default BasicLayout;
