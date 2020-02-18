/*
 * @Descripttion:
 * @Author: wangxinyue
 * @Date: 2020-02-18 14:55:49
 */
import React from 'react'
import { WBYPlatformIcon } from 'wbyui';
export const Verified = ({ isVerified }) => {
  return isVerified == 1 ? <img src='http://img.weiboyi.com/vol1/1/102/124/x/u/1o9r365n521o11rn9p5o506o4op229o2/weixin_certified.png' width='14px' /> : ''
}
function AccountName({ platformId, snsName, isVerified }) {
  return (
    <div>
      <WBYPlatformIcon
        weibo_type={platformId}
        icon_type={'default'}
        widthSize={15}
      />
      <span style={{ paddingLeft: 4, paddingRight: 4 }}>
        {snsName}
      </span>
      <Verified isVerified={isVerified} />
    </div>
  )
}

export default AccountName
