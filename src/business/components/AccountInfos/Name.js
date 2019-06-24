import React from "react"
import { Tooltip } from 'antd'
import './Name.less'
import { WBYPlatformIcon } from 'wbyui';

const Name = ({ name = '', platformId = 9 }) => {
	const content = name.length > 10 ?
		<Tooltip title={name}><a href="">{name}</a></Tooltip>
		: <a href="">{name}</a>
	return <div className='account-name-wrapper'>
        <WBYPlatformIcon weibo_type={platformId} />
		{content}
	</div>
}

export default Name
