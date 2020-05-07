/**
 * title: 登入
 */

import React from 'react';
import router from 'umi/router';
import jwtDecoder from 'jwt-decode';
import { Layout,Form, Icon, Input, Button, Message } from 'antd';
import styles from './index.scss';
import { connect } from 'dva';

const { Content , Footer } = Layout;

const Login = ({ form, dispatch, loading }) => {
	const handleSubmit = () => { 
		form.validateFields((err, values) => {
			if (!err) {
				dispatch({
					type: 'login/login',
					payload: values
				}).then(res=>{
					if (res && res.state === 'suc'){
						const token = jwtDecoder(res.token);
						const { id, nickname, username, type } = token;
						localStorage.setItem('username', username);
						localStorage.setItem('nickname', nickname);
						localStorage.setItem('userId', id);
						localStorage.setItem('authority', type === '0' ? 'admin' : 'user');
						router.push('/')
					}else{
						Message.error(res ? res.msg : '登入失敗')
					}
				})
			}
		})
	}
 	return (
		<Layout>
			<Content className={styles.content}>
				<div className={styles.form}>
				<h1>管理系統</h1>
				<Form className="login-form">
					<Form.Item>
						{
							form.getFieldDecorator('username',{
								rules: [
									{
										required: true,
										message: '用戶名不得為空值',
									},
								],
							})(
						<Input
              prefix={<Icon type="user" className={styles.iconStyle} />}
							placeholder="Username"
							autoFocus
						/>
						)}
					</Form.Item>
					<Form.Item>
						{
							form.getFieldDecorator('password',{
								rules: [
									{
										required: true,
										message: '密碼不得為空值',
									},
								],
							})(
						<Input
							prefix={<Icon type="lock" className={styles.iconStyle} />}
							type="password"
							placeholder="Password"
						/>
						)}
					</Form.Item>
					<Form.Item>
						<Button loading={loading} type="primary" onClick={handleSubmit} htmlType="submit" className="login-form-button" block>
							Log in
						</Button>
					</Form.Item>
				</Form>
				</div>
			</Content>
			<Footer/>
		</Layout>
 	)
}

export default connect(({ loading })=>({
	loading: loading.effects['login/login']
}))(Form.create()(Login))