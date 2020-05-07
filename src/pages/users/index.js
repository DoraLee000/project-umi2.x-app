import React from 'react';
import { Button , Divider , Message, Popconfirm } from 'antd';
import { Content , Tool } from '@/components/Layout';
import Table from '@/components/Table';
import { connect } from 'dva';
import UserModal from './components/UserModal'

const index = ({ dispatch, loading, addLoading, total, page, pageSize, list }) => {

  const columns =[
    {
      title: '中文姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'nickname',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '用戶類型',
      dataIndex: 'type',
      key: 'type',
      render: text => <span>{ text === "0" ? '管理者' : '一般用戶' }</span>
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <div>
          <UserModal onAdd={ value => handleEdit( record.id, value )} title='編輯用戶' record={record}>
          <a>編輯</a>
          </UserModal>
          <Popconfirm title='確定刪除此用戶嘛?' onConfirm={()=> handleDelete( record.id )}>
            <a>刪除</a>
          </Popconfirm>
        </div>
      ),
    }
  ];
  const reload = () => {
    dispatch({ 
      type: 'users/userServices' , 
      payload: { page: 1 } 
    })
  }
  const addUser = (value) => {
    return dispatch({ type: 'users/addUser' , payload: value })
    .then( res => {
      if( res && res.state == 'success' ){
        Message.success( res.msg )
        reload()
        return res
      }else{
        Message.error( '無法新增用戶' )
      }
    })
  }
  const pageChange = pageNum => {
    if( page !== pageNum ){
      dispatch({ 
        type: 'users/userServices' , 
        payload: { page: pageNum } 
      })
    }
  }
  const handleEdit = (id, value) => {
    return dispatch({ type: 'users/editUser' , payload: { id, value }})
    .then( res => {
      if( res && res.state == 'success' ){
        Message.success( res.msg || '編輯成功' )
        reload()
        return res
      }else{
        Message.error( '編輯失敗' )
      }
    })
  }
  const handleDelete = id => {
    return dispatch({ type: 'users/removeUser' , payload: id })
    .then( res => {
      if( res && res.state == 'success' ){
        Message.success( res.msg || '刪除用戶成功' )
        reload()
        return res
      }else{
        Message.error( '刪除用戶失敗' )
      }
    })
  }
  return (
    <Content>
      <Tool>
        <UserModal onAdd={ addUser } addLoading={ addLoading }>
          <Button type="primary">新增用戶</Button>
        </UserModal>
      </Tool>
      <Table 
        columns={ columns } 
        dataSource={ list } 
        rowKey={( list,index )=> list.id } 
        loading={ loading }
        pagination={{
          total: total,
          pageSize: pageSize,
          current: page,
          onChange: pageChange
        }}
        /> 
    </Content>
  )
}

export default connect(({ users , loading }) => ({ 
  ...users ,
  loading: loading.effects['users/userServices'],
  addLoading: loading.effects['users/addUser'],
}))( index )