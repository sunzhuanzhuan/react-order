import React, { Component } from "react"
import { Row, Col } from 'antd'

export default class MainAccountInfos extends Component {
	componentWillMount() {}

	render() {
		const { identityName, userId, ownerAdminRealName, volAdminRealName} = this.props.accountInfo
		const { babysitter_host = {} } = window.bentleyConfig || {}
		const babysitterHost = babysitter_host.value || 'http://toufang.weiboyi.com'
		return <article className='account-info-module main-account-infos'>
			<section className='common-infos'>
				<Row>
					<Col span={6}>主账号名称：<a target={'_blank'} href={`${babysitterHost}/user/update/user_id/${userId}`}>{identityName}</a></Col>
					<Col span={6}>user_id：{userId}</Col>
					<Col span={6}>资源媒介：{ownerAdminRealName || '--'}</Col>
					<Col span={6}>项目媒介：{volAdminRealName || '--'}</Col>
				</Row>
			</section>
			{/*<section className='custom-infos'>
			</section>*/}
		</article>
	}
}
