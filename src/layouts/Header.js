import React from 'react';
import { Affix ,Menu , Dropdown , Icon } from 'antd';
import withRouter from 'umi/withRouter';
import { Link } from 'umi';
import router from 'umi/router';

const MenuItem = Menu.Item

const Header = ({location}) => {
	const onLogout = () => {
		localStorage.clear();
		router.push('/login')
	}
	const menu = (
		<Menu>
			<MenuItem>
				<span onClick={onLogout}>登出</span>
			</MenuItem>
		</Menu>
	)
 	return (
		<Affix offsetTop={0}>
		<div className="header">
		 <span>OOXX 公司 - 通訊錄</span>
				<Menu className="menu">
					{/* <MenuItem key="/">
						<Link to="/">首頁</Link>
					</MenuItem> */}
					{/* <MenuItem key="/users">
						<Link to="/users">用戶</Link>
					</MenuItem> */}
					<MenuItem key="/reports">
						<Link to="/reports">週報撰寫</Link>
					</MenuItem>
				</Menu>

			<div className="menu-login">
			<Dropdown overlay={menu}>
				<a className="ant-dropdown-link" href="#">
					<Icon type="user"/>
					{localStorage.nickname}
				</a>
			</Dropdown>
			</div>
		</div>
		</Affix>
 	)
}

export default withRouter(Header)
