import React from 'react'
import { Modal } from 'antd'

const viewPic = (url) => (e) => {
  e.preventDefault && e.preventDefault()
  Modal.info({
    className: 'closing-report-modal-pages check-demo',
    width: 600,
    maskClosable: true,
    icon: <i />,
    content: (
      <a href={e.url || url} target="_blank" className='check-demo-pic-wrapper'>
        <img src={e.url || url} alt="" />
      </a>
    ),
    onOk() {}
  })
}
export default viewPic
