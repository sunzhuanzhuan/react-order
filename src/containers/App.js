import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Layout, Button, Icon, message } from 'antd';
import SiderMenu from '../components/SiderMenu'
import { getUserLoginInfo, getUserConfigKey } from '../login/actions'
import { resetSiderAuth, getAuthorizations, setSliderMenuCollapse } from '../actions'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const { Header, Content } = Layout;
const Cookies = require('js-cookie');
window.Cookies = Cookies;

class App extends Component {
	state = {
		collapsed: true,
		isLoaded: false,
		heightLayout: document.documentElement.clientHeight + 'px'
	};
	onCollapse = (collapsed) => {
		this.setState({ collapsed });
	}
	logout = () => {
    Cookies.remove('token');
		this.props.history.push('/login');
		this.props.actions.resetSiderAuth()
	}
	async componentWillMount() {

		window.myHistory = this.props.history
		//重新获取页面尺寸，以防继承前一浏览页面的滚动条
		window.onresize = null
    NProgress.start()
    try {
      await this.props.actions.getAuthorizations();
    }catch (e) {
      NProgress.done()
      return message.error('权限接口错误!')
    }
    NProgress.inc()
		let Info;
		try {
      Info = await this.props.actions.getUserLoginInfo();
    }catch (e) {
      NProgress.done()
      return message.error('获取用户信息错误!')
    }
		let userInfoId = Info.data.user_info.user_id
		// 获取配置
		this.props.actions.getUserConfigKey({ keys: 'shence_base_url_for_b,babysitter_host' }).then((res) => {
			let userResult = res.data.shence_base_url_for_b
			window.bentleyConfig = res.data || {}
		});

		this.setState({
			isLoaded: true
		},NProgress.done)
		window.addEventListener('resize', this.setHeight);
	}
	setHeight = () => {
		this.setState({
			heightLayout: document.documentElement.clientHeight + 'px'
		})
	}
	componentWillUnmount() {
		// Cookies.remove('token');
		window.removeEventListener('resize', this.setHeight);
	}
	render() {
		const height = this.state.heightLayout
		const isLoaded = this.state.isLoaded
		let layStyle = {
			height: height,
			minWidth: 1200
		}
		let headerStyle = {
			height: '55px',
			backgroundColor: '#000c17',
			color: '#fff',
			fontSize: '18px',
			padding: '0 10px',
			lineHeight: '55px',
			position: 'relative'
		}
		let contentStyle = {
			backgroundColor: '#fff',
			margin: '0 20px',
			padding: '20px',
			position: 'relative'
		}
		let btnStyle = {
			position: 'absolute',
			right: '10px',
			top: '10px'
		}

		const { loginReducer: { userLoginInfo, UserConfigKey }, siderMenuAuth = [] } = this.props;
    const { babysitter_host = {} } = UserConfigKey;
		return isLoaded && userLoginInfo['X-Access-Token'] ? <Layout style={layStyle}>
			<Header style={headerStyle}>
				<span>NB</span>
				<div className="user-name">
					您好,
					<Icon type="user" />
					{userLoginInfo.user_info.real_name}
				</div>
				<Button type="primary" className="old-platform"
					href={babysitter_host.value || "http://toufang.weiboyi.com"}
					icon="logout"
				>老平台</Button>
				<Button type="primary" onClick={this.logout.bind(this)} style={btnStyle}>退出</Button>
			</Header>
			<Layout>
				<SiderMenu onCollapse={this.props.actions.setSliderMenuCollapse} assignments={siderMenuAuth} routing={this.props.routing}/>
				<Content style={contentStyle} id='app-content-children-id'>
					{this.state.isLoaded && this.props.children}
				</Content>
			</Layout>
		</Layout> : null
	}
}

App.propTypes = {
	children: PropTypes.element
}

const mapStateToProps = (state) => ({
	loginReducer: state.loginReducer,
	siderMenuAuth: state.authorizationsReducers.siderMenuAuth,
	routing: state.routing.locationBeforeTransitions
})
const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({
		getUserLoginInfo, resetSiderAuth, getAuthorizations, getUserConfigKey,setSliderMenuCollapse
	}, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
