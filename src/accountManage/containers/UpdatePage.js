import React, { Component } from "react"
import { Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { message, Skeleton } from 'antd'
import { connect } from "react-redux";
import * as action from '../actions/index'
import * as commonAction from '@/actions/index'
import UpdatePageCommonContainer from './UpdatePageCommonContainer'
import { platformToType } from '../constants/platform'
import { accountTypes } from '../constants'
import { CommonUpdateChild } from '../containers/children/Common'
import qs from 'qs'

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}
const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 6 },
		md: { span: 4 },
		lg: { span: 3 }
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 18 },
		md: { span: 20 },
		lg: { span: 21 }
	}
};
const halfWrapCol = {
	xs: { span: 12 },
	sm: { span: 9 },
	md: { span: 10 },
	lg: { span: 10 }
}

class UpdatePage extends Component {
	state = {
		loading: true,
		error: false,
		errorMsg: ''
	}

	componentWillMount() {
		window.allSubmit = {
			store: {},
			data: {}
		}
		window.updateForms = {}
	}

	componentDidMount() {
		let path = this.props.location.pathname.split('/')
		let accountId = this.accountId = qs.parse(this.props.location.search.substring(1))['account_id']
		if (!accountId) {
			console.error('参数错误: account_id 错误');
      this.setState({ loading: false, error: true, errorMsg: '参数错误: 账号不存在或id无效' })
			return
		}
		if (qs.parse(this.props.location.search.substring(1))['addQuote']) {
			this.addQuote = qs.parse(this.props.location.search.substring(1))['addQuote']
		}
		let pid = this.pid = path[path.length - 1]
		const { getAccountInfo, getPlatformInfo, getPrimaryAccountInfo, getIndustryListForAccount, getAudiencePortrait, getUserInvoiceInfo } = this.props.actions
		getAccountInfo({ accountId: accountId }).then(({ data }) => {
			let { userId } = data.base
			if (userId) {
				getPrimaryAccountInfo({ userId })
				getUserInvoiceInfo({ userIds: userId })
			}
			this.setState({ loading: false })
		}).catch(({ errorMsg }) => {
			this.setState({ loading: false, error: true, errorMsg })
		})
		getPlatformInfo({ id: pid })

		getAudiencePortrait({ accountId: accountId })
		getIndustryListForAccount();
	}

	render() {
		const { accountManage, actions, auth } = this.props;
		const { loading, error, errorMsg } = this.state;
		const params = {
			hasErrors, formItemLayout, halfWrapCol, accountTypes, data: accountManage, actions, auth
		}
		let { platformId } = accountManage.accountInfo
		if (platformId && this.pid) {
			if (platformId != this.pid) {
				window.location.replace('/account/manage/update/' + platformId + '?account_id=' + this.accountId)
				// window.reload()
			}
		}
		return loading ? <Skeleton active /> : (!error ? <UpdatePageCommonContainer params={params}>
			<Route path={'/account/manage/update/:pid'} render={() =>
				<RouteViewChild platformId={this.pid} params={params} addQuote={this.addQuote ? this.addQuote : undefined} />} />
		</UpdatePageCommonContainer> : <h2>{errorMsg}</h2>)
	}
}

const ViewChild = props => {
	const { params, match, addQuote, platformId } = props
	let { pid } = match.params
	let viewChildKey = platformToType[pid]
	if (viewChildKey) {
		let diff = platformToType[pid]['diff']
		return <CommonUpdateChild platformId={platformId} platformDiff={diff} addQuote={addQuote} params={{
			...params,
			pid,
			isUpdate: true
		}} />
	}
	return <p>没有此平台</p>
}
const RouteViewChild = withRouter(ViewChild)

const mapStateToProps = (state) => {
	return {
		accountManage: state.accountManageReducer,
		auth: state.authorizationsReducers.authVisibleList
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({ ...commonAction, ...action }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(UpdatePage))
