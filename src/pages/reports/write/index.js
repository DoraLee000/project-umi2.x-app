import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { Content } from '@/components/Layout';

class index extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
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
              <Select placeholder="請選擇接收人"/>
              )
            }
          </Form.Item>
          <Form.Item className="action">
            <Button>取消</Button>
            <Button type="primary">提交</Button>
          </Form.Item>
        </Form>
      </Content>
    );
  }
}

export default Form.create()(index);
