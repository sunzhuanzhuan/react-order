import React from 'react'
import { Icon } from 'antd'

function BreadCrumbs({ link, text }) {

  return (
    <div style={{ display: 'flex' }}>
      <a href={link}>
        <Icon type="arrow-left" style={{ paddingRight: 6, fontSize: 16, paddingTop: 6 }} />
      </a>
      {text}
    </div>
  )
}

export default BreadCrumbs
