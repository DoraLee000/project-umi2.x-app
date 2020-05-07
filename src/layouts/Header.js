import React from 'react';
import { Affix ,Menu , Dropdown , Icon } from 'antd';
import withRouter from 'umi/withRouter';
import { Link } from 'umi';

const MenuItem = Menu.Item

const Header = ({location}) => {
	const menu = (
		<Menu>
			<MenuItem>
				<span>登出</span>
			</MenuItem>
		</Menu>
	)
 	return (
		<Affix offsetTop={0}>
		<div className="header">
		 <span>OOXX 公司 - 通訊錄</span>
		 <div>
				<Menu>
					<MenuItem key="/">
						<Link to="/">首頁</Link>
					</MenuItem>
					<MenuItem key="/users">
						<Link to="/users">用戶</Link>
					</MenuItem>
					<MenuItem key="/reports">
						<Link to="/reports">週報</Link>
					</MenuItem>
				</Menu>
		 	</div>

			<div className="menu-login">
			<Dropdown overlay={menu}>
				<a className="ant-dropdown-link" href="#">
					<Icon type="user"/>
				</a>
			</Dropdown>
			</div>
		</div>
		</Affix>
 	)
}

export default withRouter(Header)
