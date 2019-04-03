import React from 'react'
import { Modal, Skeleton } from 'antd';

const ModalComponent = (props) => {
  const { modalParams, visible, handleCancel, record, orderDetail, getList } = props
  let Children = modalParams.children
  return Object.keys(orderDetail).length == 0 ?
    <Modal
      title={modalParams.modalTitle}
      visible={visible}
      onCancel={handleCancel}
      width={630}
      maskClosable={false}
      footer={null}
      centered={true}
    >
      <Skeleton active />
    </Modal> :
    <Modal
      title={`${modalParams.modalTitle} 【订单号：${orderDetail.id} 平台：${orderDetail.platform.platform_name} 账号名称：${orderDetail.account.weibo_name}】`}
      visible={visible}
      footer={null}
      onCancel={handleCancel}
      width={630}
      centered={true}
      maskClosable={false}
      closable={false}
    >
      <Children
        handleCancel={handleCancel}
        record={record}
        orderDetail={orderDetail}
        getList={getList}
      />
    </Modal>
}

export default ModalComponent
