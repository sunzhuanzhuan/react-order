import React from 'react'
import { Modal } from 'antd';

const ModalComponent = (props) => {
  const { modalParams, visible, handleCancel } = props
  let Children = modalParams.children
  return (
    <Modal
      title={modalParams.modalTitle}
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      width={600}
      centered={true}
    >
      <Children
        handleCancel={handleCancel}
      />
    </Modal>
  )
}

export default ModalComponent
