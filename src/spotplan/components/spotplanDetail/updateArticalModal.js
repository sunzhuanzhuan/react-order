import React from 'react';
import { Modal, Button, Table, Form, DatePicker, message } from 'antd';
import { ArticalCols } from '../../constants'
import debounce from 'lodash/debounce';

class UpdateArticalModal extends React.Component {
  constructor() {
    super();
    this.state = {
      costwithfee: undefined
    }
    this.handleChange = debounce(this.handleValueChange, 800);
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let orders = []
        this.props.dataSource.map((item) => {
          orders.push(item.order_id)
        })
        Modal.confirm({
          title: '更新发文时间',
          content: '发文时间提交成功之后，会同步到客户系统，是否确认提交？',
          onOk: () => {
            this.props.handleSubmit({
              order_id: orders,
              publish_articles_at: values.publish_articles_at

            }).then((res) => {
              if (res.code === 1000) {
                message.success('操作成功！', 2);
                this.props.onCancel();
                setTimeout(() => {
                  window.location.reload()
                }, 1000)
              } else {
                message.error('提交失败，请重试或者联系微播易的开发、产品查看问题', 2);
              }

            })
          }
        })

      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, dataSource } = this.props;
    return <Modal
      wrapClassName='change-modal'
      key='changeModal'
      width={840}
      title='更新发文时间'
      visible={visible}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        [
          <Button key="back" onClick={onCancel}>关闭</Button>,
          <Button key="submit" type='primary' onClick={this.handleSubmit}>确认</Button>,
        ]}
    >

      <h4 style={{ padding: '10px 0' }}>已选订单
      订单数量<span style={{ color: 'red', padding: '0 10px' }}>{dataSource.length}个</span></h4>
      <Table rowKey='order_id' bordered columns={ArticalCols} dataSource={dataSource} pagination={false} />
      <Form>
        <Form.Item label='填写原因'>
          {getFieldDecorator('publish_articles_at', {
            rules: [{ required: true, message: '请输入' }]
          })(
            <DatePicker showTime placeholder="请选择" />
          )}
        </Form.Item>
      </Form>
    </Modal>
  }
}
export default Form.create()(UpdateArticalModal)
