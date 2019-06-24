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

    }
  }
  componentWillMount = () => {


  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let orders = []
        this.props.data.map((item) => {
          orders.push(item.order_id)
        })
        this.props.handleSubmit({ type: 4, after_order_ids: orders, reason: values.reason }).then((res) => {
          if (!res.data.type) {
            message.success('操作成功！', 2);
            this.props.onCancel();
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          } else {
            if (res.data.type != 3) {
              this.props.onCancel();
            }
          }

        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, data } = this.props;
    let tatalAmount = data.reduce((pre, current) => {
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
              { max: 120, message: '不能超过120汉字' }]
            })(
              <TextArea placeholder='请填写发起新增账号申请的原因，不能超过120汉字' autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
        </Form>

        <h2 style={{ padding: '10px 0' }}>已勾选订单信息</h2>
        <h4 style={{ padding: '10px 0' }}>订单数量<span style={{ color: 'red', padding: '0 10px' }}>{data.length}个</span>
          Costwithfee总计:<span style={{ color: 'red', padding: '0 10px' }}>{numeral(tatalAmount).format('0,0.00')}元</span></h4>
        <Table rowKey='order_id' border columns={AddOrderCols} dataSource={data} pagination={{ pageSize: 10, total: data.length }} />
      </>
    </Modal>
  }
}
export default Form.create()(AddModal)
