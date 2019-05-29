import React from 'react';
import { Modal, Button, Table, Form, Input, Row, Col, message } from 'antd';
import { UpdateCols } from '../../constants'
import numeral from 'numeral'
import debounce from 'lodash/debounce';

const FormItem = Form.Item;
const { TextArea } = Input;
class UpdateModal extends React.Component {
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
            costwithfee: this.state.costwithfee || dataSource[0].costwithfee,
            ...values
          }
        }).then(() => {
          message.success('操作成功！', 2);
          this.props.onCancel();
        })
      }
    })
  }
  handleValueChange = (e, dataSource, curName, otherName) => {
    const err = this.props.form.getFieldError('service_rate');
    if (!err) {
      const curValue = this.props.form.getFieldValue(curName);
      const otherValue = this.props.form.getFieldValue(otherName);
      if (curValue) {
        this.handleUpdate({ order_id: dataSource[0].order_id, price_id: dataSource[0].price_id, [curName]: curValue, [otherName]: otherValue })
      }
    }
  }
  handleUpdate = obj => {
    const { handleUpdate } = this.props;
    handleUpdate({ ...obj }).then(() => {
      this.setState({ costwithfee: this.props.serviceRateAmount.costwithfee })
      message.success('更新完成！', 1);
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, dataSource, serviceRateAmount } = this.props;
    return <Modal
      wrapClassName='change-modal'
      key='changeModal'
      width={840}
      title='申请更新信息'
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
            { max: 120, message: '不能超过120汉字' }]
          })(
            <TextArea placeholder='请填写更新信息的原因，不能超过120汉字' autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
        <h4 style={{ padding: '10px 0', fontWeight: 600 }}>当前订单信息</h4>
        <Table rowKey='order_id' columns={UpdateCols} dataSource={dataSource} pagination={false} bordered />
        <h4 style={{ padding: '10px 0', fontWeight: 600 }}>编辑需要修改的信息</h4>
        <Row style={{ lineHeight: '58px', padding: '8px 0' }} gutter={16}>
          <Col span={8}></Col>
          <Col span={8}>修改前值</Col>
          <Col span={8}>修改后值</Col>
        </Row>
        <Row style={{ lineHeight: '58px' }} gutter={16}>
          <Col span={2}></Col>
          <Col span={6}>价格名称：</Col>
          <Col span={8}>{dataSource && dataSource[0].price_name}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('price_name', {
                initialValue: dataSource && dataSource[0].price_name || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <Input />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ lineHeight: '58px' }} gutter={16}>
          <Col span={2}></Col>
          <Col span={6}>Cost（元）：</Col>
          <Col span={8}>{dataSource && numeral(dataSource[0].cost).format('0,0')}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('cost', {
                initialValue: dataSource && dataSource[0].cost || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <Input placeholder='' style={{ width: 200 }} onChange={e => {
                  this.handleChange(e, dataSource, 'service_rate', 'cost')
                }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ lineHeight: '58px' }} gutter={16}>
          <Col span={2}></Col>
          <Col span={6}>服务费率：</Col>
          <Col span={8}>{dataSource && dataSource[0].service_rate}%</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('service_rate', {
                initialValue: dataSource && dataSource[0].service_rate || '',
                rules: [
                  { required: true, message: '请填写值' },
                  { pattern: /^(([1-9][0-9]|[1-9])(\.\d{1,2})?|0\.\d{1,2}|100(\.00?)?|0)$/, message: '仅可输入0到100之间的数字，小数点最多到后两位' }
                ]
              })(
                <Input placeholder='' suffix='%' style={{ width: 200 }} onChange={e => {
                  this.handleChange(e, dataSource, 'cost', 'service_rate')
                }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{ lineHeight: '58px' }} gutter={16}>
          <Col span={2}></Col>
          <Col span={6}>Costwithfee（元）：</Col>
          <Col span={8}>{dataSource && numeral(dataSource[0].costwithfee).format('0,0')}</Col>
          <Col span={8}>{serviceRateAmount.costwithfee ? numeral(serviceRateAmount.costwithfee).format('0,0') : dataSource && numeral(dataSource[0].costwithfee).format('0,0')}</Col>
        </Row>
        <Row style={{ lineHeight: '58px' }} gutter={16}>
          <Col span={2}></Col>
          <Col span={6}>账号分类：</Col>
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
        <Row gutter={16}>
          <Col span={2}></Col>
          <Col span={6} style={{ lineHeight: '58px', paddingBottom: '12px' }}>位置/直发or转发：</Col>
          <Col span={8}>{dataSource && dataSource[0].release_form}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('release_form', {
                initialValue: dataSource && dataSource[0].release_form || '',
                rules: [{ required: true, message: '请填写值' }]
              })(
                <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={2}></Col>
          <Col span={6} style={{ lineHeight: '58px' }}>备注（非必填）：</Col>
          <Col span={8}>{dataSource && dataSource[0].content}</Col>
          <Col span={8}>
            <FormItem>
              {getFieldDecorator('content', {
                initialValue: dataSource && dataSource[0].content || '',
                rules: [{ max: 400, message: '不能超过400字' }]
              })(
                <TextArea placeholder='请填写申请换号的原因，不超过400个字' autosize={{ minRows: 2, maxRows: 6 }} />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  }
}
export default Form.create()(UpdateModal)
