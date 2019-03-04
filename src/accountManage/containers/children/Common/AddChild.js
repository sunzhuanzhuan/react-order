import React, { Component } from "react"
import PropTypes from 'prop-types'
import { BaseInfo } from '../../../components/BaseInfo'
import { FetchInfo } from '../../../components/FetchInfo'
import {
	AccountDesc,
	AccountIsNameless,
	AccountType,
	Orderable,
	QCCodeUpload
} from '../../../components/Unique'
import { Fans } from '../../../components/Fans'
import { WrapPanel } from '../../../components/index'
import { NamelessPrice } from "../../../components/AccountPrice";
import { OnSaleInfoForAdd } from "../../../components/OnSaleInfo";

export default class AddChild extends Component {
	static contextTypes = {
		refresh: PropTypes.func
	}

	componentWillMount() {
		const { platformDiff, params } = this.props
		const { fetch } = platformDiff
		const { actions: { setAddSubmit } } = params;
		if (!fetch) setAddSubmit()
	}

	render() {
		const { params, form, platformDiff } = this.props
		const { refresh } = this.context
		let { data: { priceTypeList = [], accountInfo } } = params;
		const { platformName, platformIcon } = accountInfo
		params.refresh = refresh
		//price_item_list
		const priceKeys = priceTypeList.map(({ skuTypeId, skuTypeName }) => ({
			key: skuTypeId, name: skuTypeName
		}))
		const baseInfoLeft = <div className='wrap-panel-left-content'>
			<img style={{
				position: "relative",
				top: '-3px'
			}} src={platformIcon} alt={platformName} />
			<span>{platformName}</span>
		</div>
		const { fetch, base = {} } = platformDiff
		return <div>
			{fetch ? <WrapPanel header='信息自动抓取' navId='getAccountInfos'>
				<FetchInfo {...params} defaultKeys={fetch.defaultKeys} form={form} />
			</WrapPanel> : null}
			<WrapPanel header='账号基本信息' navId='baseInfos' left={baseInfoLeft}>
				<BaseInfo {...params} hideUniqueId={base.hideUniqueId} hideLink={base.hideLink}>
					{base.qcCode ? <QCCodeUpload {...params} /> : <i style={{display: 'none'}}/>}
					<Fans {...params}
						isFansNumberImg={base.isFansNumberImg}
						isDisableFollowersCount={!(true)}
					/>
					<AccountType {...params} />
					<AccountDesc {...params} />
					<AccountIsNameless {...params} />
				</BaseInfo>
			</WrapPanel>
			<WrapPanel header='上下架信息' navId='shelfInfos'>
				<OnSaleInfoForAdd {...params} />
			</WrapPanel>
			<WrapPanel header='账号报价' navId='priceInfos'>
				<NamelessPrice {...params} {...form} priceKeys={priceKeys}>
					<Orderable {...params} {...form} />
				</NamelessPrice>
			</WrapPanel>
		</div>
	}
}
