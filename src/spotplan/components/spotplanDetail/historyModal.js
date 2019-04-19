import React from 'react';
import { Modal, Button, Table } from 'antd';
import { HistoryCols } from '../../constants'

export default class HistoryModal extends React.Component {
  render() {
    const { visible, onCancel, dataSource } = this.props;
    return <Modal
      wrapClassName='history-modal'
      key='historyModal'
      width={1100}
      title='查看历史更新申请记录'
      visible={visible}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        [
          <Button key="back" type='primary' onClick={onCancel}>确认</Button>,
        ]}
    >
      <Table border columns={HistoryCols} dataSource={dataSource} pagination={false} />
    </Modal>
  }
}
