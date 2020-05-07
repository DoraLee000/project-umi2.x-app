/* eslint-disable no-unused-expressions */
import React from 'react';
import { Row, Col, Card, Pagination } from 'antd';
import { connect } from 'dva';
// import { cloneBtn } from '@/utils/hoc'

const ListModal = ({ list, page, pageSize, total, dispatch }) => {

  const handleChange = current => {
    if (current !== page ) getDatas(current)
  }
  const getDatas = page => {
    dispatch({ 
      type:'reports/fetchReports', 
      payload: { page }
    })
  }

  const colSpan = { xl: 6, xxl: 4, span: 6 }
  return (
    <div>
      <Row gutter={ 20 }>
        { list.map(( item ) => {
          <Col { ...colSpan } key={ item.id }>
            <Card title={ item.title }>
              <p className="title">{ item.title.slice(0,10) }</p>
              <p>接收人:{ item.receiverName.slice(0,20) }</p>
            </Card>
          </Col>
          })
        }
      </Row>
      {list.length ? (
        <Pagination
          current={ page }
          pageSize={ pageSize }
          total={ total }
          onChange={ handleChange }
          className="global-pagination"
        />
      ):''}
    </div>
  )
}

export default connect(({ reports })=>({ ...reports }))(ListModal)