/**
 * title: 首頁
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 * authority: ["admin","user"]
 */

import ReactEcharts from 'echarts-for-react';
import { Card, Col, Row } from 'antd';
import styles from './index.scss';
import User from './users'

const indexPage = () => {

  return (
    <div>
      <User></User>
    </div>
  );
}

export default indexPage
