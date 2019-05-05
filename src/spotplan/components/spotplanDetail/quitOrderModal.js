import React from 'react';
import { Modal, Button, Table, Form, Input } from 'antd';
import { OrderCols } from '../../constants'

const FormItem = Form.Item;
const { TextArea } = Input;
class QuitModal extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit({ type: 3, reason: values.reason }).then(() => {
          this.props.onCancel();
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, dataSource } = this.props;
    return <Modal
      wrapClassName='quit-modal'
      key='quitModal'
      width={840}
      title='申请终止合作'
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
              <TextArea placeholder='请填写申请换号的原因，不超过200个字' autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
        </Form>
        <h4 style={{ padding: '10px 0' }}>当前订单信息</h4>
        <Table rowKey='order_id' bordered columns={OrderCols} dataSource={dataSource} pagination={false} />
      </>
    </Modal>
  }
}
export default Form.create()(QuitModal)