import React from 'react';
import { Modal, Button, Table, Form, DatePicker, message, Input, Select } from 'antd';
import { ArticalCols } from '../../constants'
import debounce from 'lodash/debounce';
import moment from 'moment'
import './updateArtical.less'

const Option = Select.Option;
const { TextArea } = Input;
class UpdateArticalModal extends React.Component {
  constructor() {
    super();
    this.state = {
      costwithfee: undefined
    }
    // this.handleChange = debounce(this.handleValueChange, 800);
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let orders = []
        Object.values(values).map((item) => {
          if (item) {
            this.props.dataSource.map((item) => {
              orders.push(item.order_id)
            })
            Modal.confirm({
              title: '修改订单信息',
              content: '发文时间提交成功之后，会同步到客户系统，是否确认提交？',
              onOk: () => {
                this.props.handleSubmitArticalTime({
                  ...values,
                  publish_articles_at: values.publish_articles_at ? values.publish_articles_at.format("YYYY-MM-DD HH:mm:ss") : ''

                }).then((res) => {
                  if (res.code === 200) {
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
          } else {
            this.props.onCancel();
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
      width={1100}
      title='修改订单信息'
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
      <div className="spArticalUpdate"><Table scroll={{ y: 400 }} rowKey='order_id' bordered columns={ArticalCols} dataSource={dataSource} pagination={false} /></div>
      <Form>
        <Form.Item label='账号ID'>
          {getFieldDecorator('weibo_id', {
            rules: [{
              validator: (rule, value, callback) => {
                let reg = /^[^\u4e00-\u9fa5]{0,255}$/
                if (!reg.test(value)) {
                  callback('请输入中文除外的，最多255个字符')
                } else {
                  callback()
                }
              }
            }]
          })(
            <Input style={{ width: 240 }} />
          )
          }
        </Form.Item>

        <Form.Item label='修改已选订单的发文时间'>
          {getFieldDecorator('publish_articles_at')(
            <DatePicker placeholder="请输入" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }} />
          )}
        </Form.Item>
        <Form.Item label='Client'>
          {getFieldDecorator('client')(
            <Select placeholder="请选择" style={{ width: 120 }} allowClear>
              <Option value={1}>天猫</Option>
              <Option value={2}>京东</Option>
              <Option value={3}>唯品会</Option>
              <Option value={4}>考拉</Option>
              <Option value={5}>苏宁易购</Option>
              <Option value={6}>线上（其他）</Option>
              <Option value={7}>线下</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label='content type'>
          {getFieldDecorator('content_type', {
            rules: [{ max: 255, message: '不能超过255个汉字' }]
          })(
            <TextArea placeholder='请填写内容类型' autosize={{ minRows: 4, maxRows: 6 }} />
          )}
        </Form.Item>
      </Form>
    </Modal>
  }
}
export default Form.create()(UpdateArticalModal)
