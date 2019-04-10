import React from 'react'
import { Modal, Skeleton } from 'antd';

const ModalComponent = (props) => {
  const { modalParams, visible, handleCancel, record, orderDetail, getList,
    handleCancelWithConfirm
  } = props
  let Children = modalParams.children
  return Object.keys(orderDetail).length == 0 ?
    <Modal
      title={modalParams.modalTitle}
      visible={visible}
      onCancel={handleCancel}
      width={640}
      maskClosable={false}
      footer={null}
      centered={true}
    >
      <Skeleton active />
    </Modal> :
    <Modal
      title={`${modalParams.modalTitle} 
      【订单号：${orderDetail.id} 
      账号名称：${orderDetail.account.weibo_name}
      平台：${orderDetail.platform.platform_name} 
      微任务/WEIQ下单价：-
      】`}
      visible={visible}
      footer={null}
      onCancel={handleCancelWithConfirm}
      width={640}
      centered={true}
      maskClosable={false}
      bodyStyle={{ maxHeight: '500px', overflowY: 'auto' }}
    >
      <Children
        handleCancelWithConfirm={handleCancelWithConfirm}
        record={record}
        orderDetail={orderDetail}
        getList={getList}
      />
    </Modal>
}

export default ModalComponent
