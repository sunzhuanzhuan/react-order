import React, { Component } from "react"
import { Route, withRouter } from 'react-router-dom'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as action from '../actions/index'
import AddPageCommonContainer from './AddPageCommonContainer'
import { Form, Skeleton, Modal, Button } from 'antd'
import { platformToType } from '../constants/platform'
import { CommonAddChild } from '../containers/children/Common'
import qs from 'qs'
import { message } from 'antd'
import './AddPage.less'
import { uploadUrl, checkVal } from '../util'
import * as commonAction from "@/actions";

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

@Form.create()
class AddPage extends Component {
	state = {
		loading: true,
		submitLoading: false,
		visible: false,
		addQuoteData: {}
	}
	handlePrice = (price_now, moreKeys = {}) => {
		let { accountManage: { priceTypeList = [] } } = this.props;
		return priceTypeList.map(item => {
			let obj = { ...item, ...moreKeys}
			let key = obj['skuTypeId']
			obj['costPriceRaw'] = price_now[key]
			delete obj['skuTypeName']
			return obj
		})
	}
	handleSubmit = (e) => {
		e.preventDefault()
		const { actions: { saveAccountInfo }, accountManage: { accountInfo }, history: { push } } = this.props;
		const {
			userId,
		} = accountInfo
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.setState({
					submitLoading: true
				})
				if(values.base){
					values.base['isFamous'] = 2
					values.base['userId'] = userId
					values.base['platformId'] = this.pid
					values.base['avatarUrl'] = uploadUrl(values.base['avatarUrl'])
					values.base['qrCodeUrl'] = uploadUrl(values.base['qrCodeUrl'])
				}
				if(values.extend){
					values.extend['followerCountScreenshotUrl'] = uploadUrl(values.extend['followerCountScreenshotUrl'])
					values.extend['isOpen'] = checkVal(values.extend['isOpen'])
				}
				values['skuList'] = this.handlePrice(values['price_now'], {
					isAllowOrderStatus: values['skuList'].isAllowOrderStatus
				})
				delete values['price_now']
				saveAccountInfo(values).then((data) => {
					this.setState({
						submitLoading: false,
						addQuoteData: {}
					})
					message.success( '添加成功', () => {
						let accountId = data.data['id'] || 0
						push(`/account/manage/update/${this.pid}?account_id=${accountId}`)
					})
				}).catch((data) => {
					if (data.code == 110002) {
						this.setState({
							visible: true,
							addQuoteData: {
								platformId: this.pid,
								accountId: data.errorMsg || 0
							}
						});
					} else {
						message.error(data.errorMsg)
						this.setState({
							submitLoading: false
						})
					}
				})

			}
		});
	}


	componentWillMount() {
		let path = this.props.location.pathname.split('/')
		let userId = qs.parse(this.props.location.search.substring(1))['user_id']
		if (!userId) {
			console.error('参数错误: user_id 错误');
      this.setState({ loading: false, error: true, errorMsg: '参数错误: 主账号不存在或id无效' })
			return;
		}
		let pid = this.pid = path[path.length - 1]
		const { getPrimaryAccountInfo, getSkuTypeList, getPlatformInfo,getUserInvoiceInfo } = this.props.actions
		Promise.all([getPrimaryAccountInfo({
			userId: userId,
			platformId: pid
		}), getSkuTypeList({ platformId: pid, productLineId: 2 })]).then(() => {
			this.setState({ loading: false })
		})
		getPlatformInfo({ id: pid })
		getUserInvoiceInfo({ userIds: userId })
	}
	// 立即添加报价
	addQuote = () => {
		this.props.history.push(`/account/manage/update/${this.state.addQuoteData.platformId}?account_id=${this.state.addQuoteData.accountId}&addQuote=addQuote`)
	}
	render() {
		const { form, accountManage, actions } = this.props;
		const { loading, submitLoading } = this.state;
		const params = {
			...form,
			hasErrors,
			formItemLayout,
			halfWrapCol,
			data: accountManage,
			actions,
			submitLoading
		}
		return <Form onSubmit={this.handleSubmit}>
			{loading ? <Skeleton active /> : <AddPageCommonContainer params={params}>
				<Route path={'/account/manage/add/:pid'} render={() =>
					<RouteViewChild params={params} form={form} />} />
			</AddPageCommonContainer>}
			<Modal
				title="提醒"
				visible={this.state.visible}
				footer={null}
				maskClosable={false}
				closable={false}
				wrapClassName="addPage-tips-modal"
			>
				<p>账号报价添加失败，请重新填写报价！</p>
				<Button className="addPage-tips-modal-button" type="primary"
					onClick={this.addQuote}
				>立即添加报价</Button>
			</Modal>
		</Form>
	}
}


const ViewChild = props => {
	const { params, match, form } = props
	let { pid } = match.params
	let viewChildKey = platformToType[pid]
	if (viewChildKey) {
		let platformDiff = platformToType[pid]['diff']
		return <CommonAddChild params={{ ...params, pid }} platformDiff={platformDiff} form={form} />
	}
	return <p>没有此平台</p>
}
const RouteViewChild = withRouter(ViewChild)

const mapStateToProps = (state) => {
	return {
		accountManage: state.accountManageReducer
	}
}

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators({...commonAction,...action}, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(AddPage))
