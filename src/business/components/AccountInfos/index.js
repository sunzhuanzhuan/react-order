import './index.less'

import React from "react"

const AccountInfos = ({ props, children }) => {

	return <div className='account-infos'>
		{children}
	</div>
}

export default AccountInfos

export { default as Avatar } from './Avatar'
export { default as Name } from './Name'
export { default as ImgType, WeiboVip, PlatformVerified } from './ImgType'
export { default as QRCode } from './QRCode'
