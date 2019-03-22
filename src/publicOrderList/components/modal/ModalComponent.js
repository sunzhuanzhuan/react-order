import React from 'react'
import { Modal } from 'antd';

const ModalComponent = (props) => {
  const { modalParams, visible, handleCancel, record } = props
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
        record={record}
      />
    </Modal>
  )
}

export default ModalComponent
