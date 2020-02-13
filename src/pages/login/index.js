/**
 * title: 登入
 */

import React from 'react';
import { login } from './services/login';
import router from 'umi/router';
import { Layout,Form, Icon, Input, Button, Checkbox} from 'antd';
import styles from './index.scss';
const { Content , Footer } = Layout;

const Login = ({ form }) => {
	const handleSubmit = () => { 
		form.validateFields((err, values) => {
			if (!err) {
        login(values)
				.then(data => router.push('/'))
				.catch(err => console.log(err))
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
						<Button type="primary" onClick={handleSubmit} htmlType="submit" className="login-form-button">
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

export default Form.create()(Login)