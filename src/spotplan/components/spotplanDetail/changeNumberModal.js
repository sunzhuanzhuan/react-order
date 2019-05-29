import React from 'react';
import { Modal, Button, Table, Form, Input, message } from 'antd';
import { OrderCols } from '../../constants'

import numeral from 'numeral'
const FormItem = Form.Item;
const { TextArea } = Input;
class ChangeModal extends React.Component {
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
        if (selectedRowKeys.length == 0) {
          message.error('请勾选需要替换的订单', 3);
          return
        }
        this.props.handleSubmit({ type: 1, after_order_ids: selectedRowKeys, reason: values.reason }).then(() => {
          this.props.onCancel();
          setTimeout(() => {
            window.location.reload()
          }, 1000)

        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { selectedRowKeys, rows } = this.state;
    const { visible, onCancel, before_order, after_order } = this.props;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelectChange,
    }
    let tatalAmountBefore = before_order.reduce((pre, current) => {
      return (pre * 100 + current.costwithfee * 100) / 100
    }, 0);
    let tatalAmount = rows.reduce((pre, current) => {
      return (pre * 100 + current.costwithfee * 100) / 100
    }, 0);
    return <Modal
      wrapClassName='change-modal'
      key='changeModal'
      width={840}
      title='申请换号'
      visible={visible}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        after_order && after_order.length == 0 ? [
          <Button key="back" onClick={onCancel}>关闭</Button>,
        ] :
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
              { max: 120, message: '不能超过120个汉字' }]
            })(
              <TextArea placeholder='请填写申请换号的原因，不超过120个字' autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
        </Form>
        <h4 style={{ padding: '10px 0' }}>当前订单信息</h4>
        <h4 style={{ padding: '10px 0' }}>订单数量<span style={{ color: 'red', padding: '0 10px' }}>{before_order.length}个</span>
          Costwithfee总计:<span style={{ color: 'red', padding: '0 10px' }}>{numeral(tatalAmountBefore).format('0,0.00')}元</span></h4>
        <Table rowKey='order_id' columns={OrderCols} dataSource={before_order} pagination={false} bordered />
        <h4 style={{ padding: '10px 0' }}>勾选替换后的订单</h4>
        <h4 style={{ padding: '10px 0' }}>勾选订单数量<span style={{ color: 'red', padding: '0 10px' }}>{rows.length}个</span>
          Costwithfee总计:<span style={{ color: 'red', padding: '0 10px' }}>{numeral(tatalAmount).format('0,0.00')}元</span></h4>
        {after_order && after_order.length == 0 ? <div style={{ color: 'red' }}>本Spotplan中没有可以用于替换的订单</div> : <Table rowKey='order_id' scroll={{ y: 440 }} border columns={OrderCols} dataSource={after_order} rowSelection={rowSelection} pagination={false} />}
      </>
    </Modal>
  }
}
export default Form.create()(ChangeModal)
