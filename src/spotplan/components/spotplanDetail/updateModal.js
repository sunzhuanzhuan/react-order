import React from 'react';
import { Modal, Button, Table, Form, Input, Row, Col, message } from 'antd';
import { UpdateCols } from '../../constants'
import numeral from 'numeral'

const FormItem = Form.Item;
const { TextArea } = Input;
class UpdateModal extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dataSource } = this.props;
        this.props.handleSubmit({
          type: 2,
          reason: values.reason,
          before_order: {
            price_name: dataSource[0].price_name,
            cost: dataSource[0].cost,
            service_rate: dataSource[0].service_rate,
            costwithfee: dataSource[0].costwithfee,
            account_category_name: dataSource[0].account_category_name,
            release_form: dataSource[0].release_form,
            content: dataSource[0].content,
          },
          after_order: {
            costwithfee: dataSource[0].costwithfee,
            ...values
          }
        }).then(() => {
          message.success('操作成功！', 2);
          this.props.handleClose().then(() => {
            this.props.onCancel();
          })
        })
      }
    })
  }
  handleUpdate = obj => {
    const { handleUpdate } = this.props;
    handleUpdate({ ...obj }).then(() => {
      message.success('更新完成！', 1);
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, dataSource } = this.props;
    return <Modal
      wrapClassName='change-modal'
      key='changeModal'
      width={840}
      title='申请换号'
      visible={visible}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        [
          <Button key="back" onClick={onCancel}>关闭</Button>,
          <Button key="submit" type='primary' onClick={this.handleSubmit}>确认</Button>,
        ]}
    >
      <Form>
        <FormItem label='填写原因'>
          {getFieldDecorator('reason', {
            rules: [{ required: true, message: '请填写原因' },
            { max: 200, message: '不能超过200字' }]
          })(
            <TextArea placeholder='请填写申请换号的原因，不超过200个字' autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
        <h4 style={{ padding: '10px 0', fontWeight: 600 }}>当前订单信息</h4>
        <Table rowKey='order_id' columns={UpdateCols} dataSource={dataSource} pagination={false} bordered />
        <h4 style={{ padding: '10px 0', fontWeight: 600 }}>编辑需要修改的信息</h4>
        <Row style={{ lineHeight: '48px', padding: '8px 0' }} gutter={16}>
          <Col span={8}></Col>
          <Col span={8}>修改前值</Col>
          <Col span={8}>修改后值</Col>
        </Row>
        <Row style={{ lineHeight: '48px' }} gutter={16}>
          <Col span={2}></Col>
          <Col span={6}>价格名称：</Col>
          <Col span={8}>{dataSource && dataSource[0].price_name}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('price_name', {
                initialValue: dataSource && dataSource[0].price_name || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <Input onBlur={(e) => {
                  if (e.target.value != dataSource[0].price_name) {
                    this.handleUpdate({ order_id: dataSource[0].order_id, price_id: dataSource[0].price_id, price_name: e.target.value })
                  }
                }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ lineHeight: '48px' }} gutter={16}>
          <Col span={2}></Col>
          <Col span={6}>Cost（元）：</Col>
          <Col span={8}>{dataSource && numeral(dataSource[0].cost).format('0,0')}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('cost', {
                initialValue: dataSource && dataSource[0].cost || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <Input placeholder='' style={{ width: 200 }} onBlur={(e) => {
                  if (e.target.value != dataSource[0].cost) {
                    this.handleUpdate({ order_id: dataSource[0].order_id, price_id: dataSource[0].price_id, cost: e.target.value })
                  }
                }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ lineHeight: '48px' }} gutter={16}>
          <Col span={2}></Col>
          <Col span={6}>服务费率：</Col>
          <Col span={8}>{dataSource && dataSource[0].service_rate}%</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('service_rate', {
                initialValue: dataSource && dataSource[0].service_rate || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <Input placeholder='' suffix='%' style={{ width: 200 }} onBlur={(e) => {
                  if (e.target.value != dataSource[0].service_rate) {
                    this.handleUpdate({ order_id: dataSource[0].order_id, price_id: dataSource[0].price_id, service_rate: e.target.value })
                  }
                }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ lineHeight: '48px' }} gutter={16}>
          <Col span={2}></Col>
          <Col span={6}>Costwithfee（元）：</Col>
          <Col span={8}>{dataSource && numeral(dataSource[0].costwithfee).format('0,0')}</Col>
          <Col span={8}>{dataSource && numeral(dataSource[0].costwithfee).format('0,0')}</Col>
        </Row>
        <Row style={{ lineHeight: '48px' }} gutter={16}>
          <Col span={2}></Col>
          <Col span={6}>账号分类：</Col>
          <Col span={8}>{dataSource && dataSource[0].account_category_name}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('account_category_name', {
                initialValue: dataSource && dataSource[0].account_category_name || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <Input placeholder='' style={{ width: 200 }} onBlur={(e) => {
                  if (e.target.value != dataSource[0].account_category_name) {
                    this.handleUpdate({ order_id: dataSource[0].order_id, price_id: dataSource[0].price_id, account_category_name: e.target.value })
                  }
                }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={2}></Col>
          <Col span={6} style={{ lineHeight: '48px' }}>位置/直发or转发：</Col>
          <Col span={8}>{dataSource && dataSource[0].release_form}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('release_form', {
                initialValue: dataSource && dataSource[0].release_form || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <TextArea autosize={{ minRows: 2, maxRows: 6 }} onBlur={(e) => {
                  if (e.target.value != dataSource[0].release_form) {
                    this.handleUpdate({ order_id: dataSource[0].order_id, price_id: dataSource[0].price_id, release_form: e.target.value })
                  }
                }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={2}></Col>
          <Col span={6} style={{ lineHeight: '48px' }}>备注（非必填）：</Col>
          <Col span={8}>{dataSource && dataSource[0].content}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('content', {
                initialValue: dataSource && dataSource[0].content || '',
              })(
                <TextArea placeholder='请填写申请换号的原因，不超过200个字' autosize={{ minRows: 2, maxRows: 6 }} onBlur={(e) => {
                  if (e.target.value != dataSource[0].content) {
                    this.handleUpdate({ order_id: dataSource[0].order_id, price_id: dataSource[0].price_id, content: e.target.value })
                  }
                }} />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  }
}
export default Form.create()(UpdateModal)
