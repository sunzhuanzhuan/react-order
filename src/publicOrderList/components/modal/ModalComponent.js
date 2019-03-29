import React from 'react'
import { Modal } from 'antd';

const ModalComponent = (props) => {
  const { modalParams, visible, handleCancel, record } = props
  let Children = modalParams.children
  return (
    <Modal
      title={`${modalParams.modalTitle} 【订单号： 平台： 账号名称：${record.account.account_name}】`}
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      width={600}
      centered={true}
      maskClosable={false}
      closable={false}
    >
      <Children
        handleCancel={handleCancel}
        record={record}
      />
    </Modal>
  )
}

export default ModalComponent
