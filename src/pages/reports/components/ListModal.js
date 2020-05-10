/* eslint-disable no-unused-expressions */
import React from 'react';
import { Row, Col, Card, Pagination, Tooltip, Icon, Popconfirm, Message } from 'antd';
import { connect } from 'dva';

const ListModal = ({ list, page, pageSize, total, dispatch, loading }) => {

  const handleChange = current => {
    if (current !== page) getDatas(current)
  }
  const getDatas = page => {
    dispatch({
      type: 'reports/fetchReports',
      payload: { page }
    })
  }

  const handleDelete = id => {
    dispatch({
      type: 'reports/removeReport',
      payload: { id }
    }).then((res) => {
      if (res && res.status === 'success') {
        Message.success(res.msg);
        getDatas(1)
      } else {
        Message.error(res ? res.msg : '週報刪除發生異常');
      }
    })
  }

  const colSpan = { xl: 6, xxl: 4, span: 6 }
  return (
    <div>
      {list.length > 1 ?
        <div>
          <Row gutter={20}>
            {list.map((item) => {
              <Col {...colSpan} key={item.id}>
                <Card title={item.title} extra={
                  <div>
                    <Tooltip title="編輯" placement="top">
                      <a href={`reports/write/${item.id}`}>
                        <Icon type="form" />
                      </a>
                    </Tooltip>
                    <Popconfirm title="是否確認刪除此週報" onConfirm={() => { handleDelete(item.id) }}>
                      <Tooltip title="刪除" placement="top">
                        <a>
                          <Icon type="delete" />
                        </a>
                      </Tooltip>
                    </Popconfirm>
                  </div>
                }>
                  <p className="title">{item.title.slice(0, 10)}</p>
                  <p>接收人:{item.receiverName.slice(0, 20)}</p>
                </Card>
              </Col>
            })
            }
          </Row>
          {list.length ? (
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              onChange={handleChange}
              className="global-pagination"
            />
          ) : ''}
        </div> : <div>目前尚額相關週報</div>
      }
    </div>
  )
}

export default connect(({ reports }) => ({ ...reports }))(ListModal)
