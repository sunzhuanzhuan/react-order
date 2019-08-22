import React from 'react'
import { WBYPlatformIcon } from 'wbyui'

const IconInfoBlock = (props) => {
  return (
    <div className='platform-icon-infos'>
      <div className='left'>
        <WBYPlatformIcon weibo_type={props.platformId} widthSize={28} />
      </div>
      <div className='right'>
        {props.children}
      </div>
    </div>
  )
}

export default IconInfoBlock
