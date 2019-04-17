import React from 'react';
import { Modal, Button, Table, Form, Input, Row, Col } from 'antd';
import { UpdateCols } from '../../constants'

const FormItem = Form.Item;
const { TextArea } = Input;
class UpdateModal extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit({ type: 2, reason: values.reason }).then(() => {
          this.props.onCancel();
        })
      }
    })
  }
  handleUpdate = obj => {

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
        <h4 style={{ padding: '10px 0' }}>当前订单信息</h4>
        <Table rowKey='order_id' border columns={UpdateCols} dataSource={dataSource} pagination={false} bordered />
        <h4 style={{ padding: '10px 0' }}>编辑需要修改的信息</h4>
        <Row style={{ lineHeight: '48px', padding: '8px 0' }} gutter={16}>
          <Col span={8}></Col>
          <Col span={8}>修改前值</Col>
          <Col span={8}>修改后值</Col>
        </Row>
        <Row style={{ padding: '8px 0' }} gutter={16}>
          <Col span={8}>价格名称：</Col>
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
        <Row style={{ padding: '8px 0' }} gutter={16}>
          <Col span={8}>Cost（元）：</Col>
          <Col span={8}>{dataSource && dataSource[0].cost}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('cost', {
                initialValue: dataSource && dataSource[0].cost || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <Input placeholder='' style={{ width: 200 }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ padding: '8px 0' }} gutter={16}>
          <Col span={8}>服务费率：</Col>
          <Col span={8}>4.5%</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('price_name', {
                rules: [{ required: true, message: '请填写值' }]
              })(
                <Input placeholder='' suffix='%' style={{ width: 200 }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ lineHeight: '48px', padding: '8px 0' }} gutter={16}>
          <Col span={8}>Costwithfee（元）：</Col>
          <Col span={8}>188,545.00</Col>
          <Col span={8}>188,545.00</Col>
        </Row>
        <Row style={{ padding: '8px 0' }} gutter={16}>
          <Col span={8}>账号分类：</Col>
          <Col span={8}>{dataSource && dataSource[0].account_category_name}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('account_category_name', {
                initialValue: dataSource && dataSource[0].account_category_name || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <Input placeholder='' style={{ width: 200 }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ padding: '8px 0' }} gutter={16}>
          <Col span={8}>位置/直发or转发：</Col>
          <Col span={8}>{dataSource && dataSource[0].release_form}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('release_form', {
                initialValue: dataSource && dataSource[0].release_form || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <Input placeholder='' style={{ width: 200 }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ padding: '8px 0' }} gutter={16}>
          <Col span={8}>备注（非必填）：</Col>
          <Col span={8}>{dataSource && dataSource[0].content}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('content', {
                initialValue: dataSource && dataSource[0].content || '',
              })(
                <TextArea placeholder='请填写申请换号的原因，不超过200个字' autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  }
}
export default Form.create()(UpdateModal)
