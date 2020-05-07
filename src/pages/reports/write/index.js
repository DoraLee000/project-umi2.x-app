/**
 * title: 週報
 */

import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Content } from '@/components/Layout';
import Edit from 'wangeditor';
import { connect } from 'dva';

class index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editorContent:null,
      editorCheck:true
    }
  }

  componentDidMount() {
    this.initEditor();
    this.getAllUsers();
  }

  getAllUsers(){
    this.props.dispatch({ 
      type:'reports/getAllUsers'
    }).then(res=>{
      this.renderUsers();
    })
  }

  renderUsers(){
    const { allUsersList } = this.props
    return (
      <Select placeholder="請選擇接收人">
        { allUsersList.map(({ nickname }, index )=> [
          <Select.Option value={index} key={index}>
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
      if( !html || html === '<p><br></p>') {
        editorCheck = false
      }
      this.setState({
        editorContent:html,
        editorCheck:editorCheck
      })
    }
    editor.create(); //create
  }

  handleOK = () => {
    const { editorContent, editorCheck } = this.state
    this.props.form.validateFields((err,value)=>{
      if (!err) {
        if(editorContent && editorCheck){
          console.log(value,editorContent)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { editorCheck } = this.state;
    return (
      <Content>
        <Form>
          <Form.Item label="標題">
          { getFieldDecorator('title',{
              rules:[
                {
                  required:true,
                  message:'用戶名不可以為空'
                },
              ],
            })(
            <Input placeholder="請輸入周報標題"/>
            )
          }
          </Form.Item>
          <Form.Item label="接收人">
            { getFieldDecorator('receiverId',{
                rules:[
                  {
                    required:true,
                    message:'用戶名不可以為空'
                  },
                ],
              })(
              this.renderUsers()
              )
            }
          </Form.Item>
          <Form.Item label="內容" required>
            <div ref="editorRef" style={!editorCheck ? { border:'1px red solid' } : { border:'1px #eee solid' }}/>
            { !editorCheck && <p style={{ color:'red' }}>內容不能為空</p> } 

          </Form.Item>
          <Form.Item className="action">
            <Button className="">取消</Button>
            <Button type="primary" onClick={this.handleOK }>提交</Button>
          </Form.Item>
        </Form>
      </Content>
    );
  }
}

export default connect(({ reports })=> ({ ...reports }))(Form.create()(index));
