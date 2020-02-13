import React, { Component } from 'react'
import { Modal, Form, Input, Radio } from 'antd';
import { cloneBtn } from '@/utils/hoc'


const FormItem = Form.Item
const RadioGroup = Radio.Group
const FormLayout = { labelCol: { span:'6'} , wrapperCol: { span:'14'} } 


class UserModal extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.props.form.validateFields(( err, values ) => {
			if (!err) {
        this.props.onAdd( values ).then( res => {
          if( res.state == "success" ){
            this.handleCancel()
          }
        })
			}
		})
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { children, addLoading, title } = this.props;
    const { username, nickname, type } = this.props.record;
    return (
      <>
        { cloneBtn(children , this.showModal) }
        <Modal
          title={title}
          centered={true}
          maskClosable={false}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          confirmLoading={addLoading}
        >
          <Form>
            <FormItem label='中文姓名' {...FormLayout}>
              { getFieldDecorator('username',{
                  rules:[
                    {
                      required:true,
                      message:'用戶名不可以為空'
                    },
                  ],
                  initialValue:username,
                })(
                <Input placeholder='請輸入用戶名'></Input>
                )
              }
            </FormItem>
            <FormItem label='聯絡信箱' {...FormLayout}>
              { getFieldDecorator('nickname',{
                  rules:[
                    {
                      required:true,
                      message:'聯絡信箱不可以為空'
                    },
                  ],
                  initialValue:nickname,
                })(
                  <Input placeholder='請輸入姓名'></Input>
                )
              }
            </FormItem>
            <FormItem label='用戶類型' {...FormLayout}>
              { getFieldDecorator('type',{
                  rules:[
                    {
                      required:true,
                      message:'請選擇用戶類型'
                    },
                  ],
                  initialValue:type || '1',
                })(
                  <RadioGroup>
                    <Radio value={'0'}>管理員</Radio>
                    <Radio value={'1'}>一般用戶</Radio>
                  </RadioGroup>
                )
              }
            </FormItem>
          </Form>
        </Modal>
      </>
    )
  }
}
UserModal.defaultProps = {
  title: '新增用戶',
  record: { username: '', nickname: '', type:'1' }
}
export default Form.create()(UserModal)
