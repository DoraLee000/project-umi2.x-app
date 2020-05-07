import ReactEcharts from 'echarts-for-react';
import { Card, Col, Row } from 'antd';
import styles from './index.scss';
import User from './users'
/**
 * title: 首頁
 * Routes: 
 *  - ./src/routes/PrivateRoute.js
 * authority: ["admin","user"]
 */

function indexPage() {

  return (
    <div>
      首頁
      {/* <User></User> */}
    </div>
  );
}

export default indexPage
