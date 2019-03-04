import React, { Component } from "react"
import { Tabs, Badge, Skeleton } from 'antd'
import moment from 'moment'
import {
	AccountInfos,
	AudiencePortraitForm,
	AccountPriceForm,
	BaseInfoForm,
	AccountFeatureForm,
	CooperateInfoForm,
	FetchInfoForm,
	OnSaleInfoForm,
	OrderTakeStrategyfoForm,
	OtherInfoForm
} from '../UpdateForms'
import { Fans } from '../../../components/Fans'
import { FansCount } from '../../../components/FansCount'
import { WrapPanelForm } from "../../../components/index";
import AccountState from "../../../components/AccountState";
import { platformMap, platformView } from '../../../constants/platform'
import { fansColumnsKeys } from '../../../constants/index'
import { uploadUrl, date2moment } from '../../../util'

const TabPane = Tabs.TabPane;

// 红点逻辑
const hasRedDot = (now_end) => {
	if (!now_end) return true
	let nowDate = moment()
	let nowEnd = date2moment(now_end)
	// nowEnd 是个合法的时间对象
	return !nowEnd.isValid() || nowDate >= nowEnd.endOf('d')
}
export default class UpdateChild extends Component {
	state = {
		isLoading: false
	}
	saveFans = (values) => {
		const { data: { accountInfo } } = this.props.params;
		const {
			accountId,
		} = accountInfo
		values['id'] = accountId
		// values['userId'] = userId
		values.extend['followerCountScreenshotUrl'] = uploadUrl(values.extend['followerCountScreenshotUrl'])
		return values
	}

	getSkuActions = () => {
		const { params, platformId } = this.props
		const { actions: { getSkuList }, data: { accountInfo } } = params
		const {
			accountId,
			isFamous,
		} = accountInfo
		this.setState({ isLoading: true })
		return getSkuList({
			productLineId: isFamous,
			itemTypeId: 1,
			itemId: accountId,
			platformId
		}).then(() => {
			this.setState({ isLoading: false })
		}).catch(() => {
			this.setState({ isLoading: false })
		})
	}

	componentWillMount() {
		this.getSkuActions()
	}

	render() {
		const { params, addQuote, platformDiff } = this.props
		const { pid, data: { accountInfo, priceInfo }, actions: { updateAccountFans,getAccountOnShelfStatus } } = params;
		const {
			priceValidTo
		} = priceInfo
		const {
			isFamous,
			accountId,
			isOnline, offlineReason, aOnShelfStatus, aOffShelfReasonStringList, bOnShelfStatus, bOffShelfReasonStringList
		} = accountInfo
		const orderStatus = [
			{ code: isOnline, reason: offlineReason },
			{ code: aOnShelfStatus, reason: aOffShelfReasonStringList },
			{ code: bOnShelfStatus, reason: bOffShelfReasonStringList }
		]
		//FansCount 要展示的列；
		const columnsKeys = fansColumnsKeys[platformView[pid] || ''] || []
		const { fetch, base = {}, price } = platformDiff
		return (Object.keys(priceInfo).length) ?
			<Tabs defaultActiveKey={addQuote ? '2' : '1'} animated={false} tabBarExtraContent={
				// 是否下架 是否可接单 是否预约账号
				<AccountState status={orderStatus} action={getAccountOnShelfStatus} id={accountId}/>
			}>
				<TabPane tab="帐号信息" key="1">
					<AccountInfos params={params}>
						{fetch ? <FetchInfoForm params={params} diff={fetch} /> :
							<i style={{ display: 'none' }} />}
						<BaseInfoForm params={params} diff={base} />
						<WrapPanelForm onSave={this.saveFans} navId='fansInfos' header='粉丝信息' action={updateAccountFans}>
							<Fans {...params}
								isFansNumberImg={base.isFansNumberImg}
								isDisableFollowersCount={pid != platformMap.WECHAT}
							>
								<FansCount {...params} columnsKeys={columnsKeys} />
							</Fans>
						</WrapPanelForm>
						<AccountFeatureForm params={params} />
						<CooperateInfoForm params={params} />
						<OnSaleInfoForm params={params} />
						<OrderTakeStrategyfoForm params={params} />
						<OtherInfoForm params={params} />
					</AccountInfos>
				</TabPane>
				<TabPane key="2" tab={
					<span>报价信息{((isFamous == 1) && hasRedDot(priceValidTo)) ?
						<Badge dot><b style={{ visibility: 'hidden' }}>_</b></Badge> : null}</span>}>
					{!this.state.isLoading ?
						<AccountPriceForm params={params} diff={price} getSkuActions={this.getSkuActions} /> :
						<Skeleton active />}
				</TabPane>
				<TabPane tab="受众画像" key="3">
					<AudiencePortraitForm params={params} />
				</TabPane>
			</Tabs> : <Skeleton active />
	}
}


