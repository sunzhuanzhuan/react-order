import React from 'react'
import './Avatar.less'

let defaultPic ="http://pri-static.weiboyi.com/bentley/daily_0.0.30/static/media/default.7a2b9e74.jpg"
export const Avatar = ({ id, src = defaultPic, name = '' }) => {

    return <div id={id} data-src={src ? `http://api-webroot.api.weiboyi.com/pic.php?picurl=${src}` : ''} className='account-avatar-wrapper'>
        <div className='pic'>
            <img src={src ? `http://api-webroot.api.weiboyi.com/pic.php?picurl=${src}` : defaultPic} alt={name} onError={(e) => e.target.src = defaultPic} />
        </div>
    </div>
}

export default Avatar
