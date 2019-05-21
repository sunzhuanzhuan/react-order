import React from 'react';
import { Modal, Button, Table, Form, Input, message } from 'antd';
import { AddOrderCols } from '../../constants'

import numeral from 'numeral'
const FormItem = Form.Item;
const { TextArea } = Input;
class AddModal extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedRowKeys: [],
      rows: []
    }
  }
  handleSelectChange = (selectedRowKeys, selectedRows) => {
    const rows = selectedRows.reduce((data, current) => {
      return [...data, current]
    }, []);

    this.setState({ selectedRowKeys, rows });
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { selectedRowKeys } = this.state;

        this.props.handleSubmit({ type: 4, after_order_ids: selectedRowKeys, reason: values.reason }).then((res) => {
          if (res.code == 200) {
            this.props.onCancel();
          } else {
            this.props.onCancel();
            message.error('该订单的更新申请已被他人优先发起了，请刷新后查看')
          }

        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedRowKeys, rows } = this.state;
    const { visible, onCancel, after_order } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectChange,
    }
    let tatalAmount = rows.reduce((pre, current) => {
      return (pre * 100 + current.costwithfee * 100) / 100
    }, 0);
    return <Modal
      wrapClassName='change-modal'
      key='changeModal'
      width={840}
      title='发起新增账号申请'
      visible={visible}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        [
          <Button key="back" onClick={onCancel}>关闭</Button>,
          <Button key="submit" type='primary' onClick={this.handleSubmit}>确认</Button>,
        ]}
    >
      <>
        <Form>
          <FormItem label='填写原因'>
            {getFieldDecorator('reason', {
              rules: [{ required: true, message: '请填写原因' },
              { max: 400, message: '不能超过400字' }]
            })(
              <TextArea placeholder='请填写发起新增账号申请的原因，不超过400个字' autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
        </Form>

        <h2 style={{ padding: '10px 0' }}>已勾选订单</h2>
        <h4 style={{ padding: '10px 0' }}>订单数量<span style={{ color: 'red', padding: '0 10px' }}>{rows.length}个</span>
          Costwithfee<span style={{ color: 'red', padding: '0 10px' }}>{numeral(tatalAmount).format('0,0.00')}元</span></h4>
        <Table rowKey='order_id' border columns={AddOrderCols} dataSource={after_order} rowSelection={rowSelection} pagination={{ pageSize: 10, total: after_order.length }} />
      </>
    </Modal>
  }
}
export default Form.create()(AddModal)
