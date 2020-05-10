/**
 * title: 我的週報
 * Routes:
 *  - ./src/routes/PrivateRoute.js
 * authority: ["admin","user"]
 */

import React, { Component } from 'react';
import { Form, Input, Button, Select, Message } from 'antd';
import { Content } from '@/components/Layout';
import Edit from 'wangeditor';
import router from 'umi/router';
import { connect } from 'dva';

// 動態路由

class $id$ extends Component {

  constructor(props) {
    super(props);

    this.id = props.match.params.id
    this.state = {
      editorContent: null,
      editorCheck: true
    }
  }

  componentDidMount() {
    if (this.id) {
      //編輯
      this.getDatasEditor()
        .then(() => {
          const { content } = this.props.info;
          this.setState({
            editorContent: content,
          });
          this.initEditor();
        });
    } else {
      this.initEditor();
    }
    this.getAllUsers();
  }

  getAllUsers() {
    this.props.dispatch({
      type: 'reports/getAllUsers'
    }).then(res => {
      this.renderUsers();
    })
  }

  getDatasEditor() {
    return this.props.dispatch({
      type: 'reports/fetchInfo',
      payload: this.id
    });
  }

  renderUsers() {
    const { allUsersList } = this.props
    return (
      <Select placeholder="請選擇接收人">
        {allUsersList.map(({ username, nickname }, index) => [
          <Select.Option value={username} key={index}>
            {nickname}
          </Select.Option>
        ])}
      </Select>
    )
  }

  initEditor() {
    //參數指定element
    const editor = new Edit(this.refs.editorRef);
    let editorCheck = true;
    // 監聽內容 ; 如果都沒有內容則是<p><br></p>
    editor.customConfig.onchange = html => {
      if (!html || html === '<p><br></p>') {
        editorCheck = false
      }
      this.setState({
        editorContent: html,
        editorCheck: editorCheck
      })
    }
    editor.create(); //create
  }

  handleOK = () => {
    const { editorContent, editorCheck } = this.state
    this.props.form.validateFields((err, value) => {
      if (!err) {
        if (editorContent && editorCheck) {
          // reports 是 connect models 的 namespace
          console.log('this.id', this.id)
          this.props.dispatch({
            type: this.id ? 'reports/updateReport' : 'reports/addReport',
            payload: { ...value, content: editorContent, id: this.id }
          }).then((res) => {
            if (res && res.state === 'success') {
              Message.success(res.msg || '週報提交成功');
              router.push('/reports')
            } else {
              Message.error(res.msg || '週報提交失敗');
            }
          })
        } else {
          this.setState({
            editorCheck: false
          })
        }
      }
    })
  }

  handleCancel = () => {
    router.push('/reports')
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { editorCheck } = this.state;
    const { title, receiverName, content } = this.props.info;
    return (
      <Content>
        <Form>
          <Form.Item label="標題">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '用戶名不可以為空'
                },
              ],
              initialValue: title
            })(
              <Input autoComplete="off" placeholder="請輸入周報標題" />
            )
            }
          </Form.Item>
          <Form.Item label="接收人">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '用戶名不可以為空'
                },
              ],
              initialValue: receiverName
            })(
              this.renderUsers()
            )
            }
          </Form.Item>
          <Form.Item label="內容" required>
            <div
              ref="editorRef"
              style={!editorCheck ? { border: '1px red solid' } : { border: '1px #eee solid' }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {!editorCheck && <p style={{ color: 'red' }}>內容不能為空</p>}

          </Form.Item>
          <Form.Item className="action">
            <Button onClick={this.handleCancel}>取消</Button>
            <Button type="primary" onClick={this.handleOK}>提交</Button>
          </Form.Item>
        </Form>
      </Content>
    );
  }
}

export default connect(({ reports }) => ({ ...reports }))(Form.create()($id$));
