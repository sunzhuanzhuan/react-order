import React from 'react'
import { Modal } from 'antd';

const ModalComponent = (props) => {
  const { modalParams, visible, handleCancel } = props
  return (
    <Modal
      title={modalParams.modalTitle}
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      width={600}
      centered={true}
    >
      {modalParams.children}
    </Modal>
  )
}

export default ModalComponent
