import ReactEcharts from 'echarts-for-react';
import { Card, Col, Row } from 'antd';
import styles from './index.scss';
import User from './users'
/**
 * title: 首頁
 */

function indexPage() {

  return (
    <div>
      <User></User>
    </div>
  );
}

export default indexPage