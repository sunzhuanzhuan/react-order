import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../../actions";
import { Modal, Button, Select, Input, Form, message, DatePicker } from 'antd';
import moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class EditOrderModal extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { data, spotplan_id } = this.props;
        console.log(!values.publish_articles_at);
        console.log(data)
        if (!values.publish_articles_address) {
          values.publish_articles_address = data[0].publish_articles_at
        }
        values.publish_articles_at = moment(values.publish_articles_at).format('YYYY-MM-DD HH:mm:ss')
        this.props.actions.postUpdateSpotplanOrder({ ...values, spotplan_id, order_id: data[0].order_id }).then((res) => {
          if (!res.data.type) {
            message.success('操作成功！', 2);
            this.props.onCancel();
            setTimeout(() => {
              window.location.reload()
            }, 1000)
          } else {
            this.props.onCancel();
          }
        })
      } else {
        Modal.error({
          title: '错误提示',
          content: '请先将该订单必填项填写完整后再提交，该弹窗需要人工触发“X”，才能关闭'
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, data } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };
    return <Modal
      wrapClassName='edit-order-modal'
      key='historyModal'
      width={640}
      title='编辑订单信息'
      visible={visible}
      maskClosable={false}
      onCancel={onCancel}
      footer={
        [
          <Button key="back" type='primary' onClick={this.handleSubmit}>确认</Button>,
        ]}
    >
      <Form>
        <FormItem label='订单ID' {...formItemLayout}>{data && data[0].order_id}</FormItem>
        <FormItem label='需求名称' {...formItemLayout}>{data && data[0].requirement_name}</FormItem>
        <FormItem label='平台' {...formItemLayout}>{data && data[0].weibo_type_name}</FormItem>
        <FormItem label='账号名称' {...formItemLayout}>{data && data[0].weibo_name}</FormItem>
        <FormItem label='价格名称' {...formItemLayout}>
          {getFieldDecorator('price_name', {
            initialValue: data && data[0].price_name || '',
            rules: [{ required: true, message: '请填写名称' }]
          })(
            <Input style={{ width: 240 }} />
          )}
        </FormItem>
        <FormItem label='账号分类' {...formItemLayout}>
          {getFieldDecorator('account_category_name', {
            initialValue: data && data[0].account_category_name || '',
            rules: [{ required: true, message: '请填写分类' }]
          })(
            <Input style={{ width: 140 }} />
          )}
        </FormItem>
        <FormItem label='位置/直发or转发' {...formItemLayout}>
          {getFieldDecorator('release_form', {
            initialValue: data && data[0].release_form || '',
            rules: [{ required: true, message: '请填写位置' }]
          })(
            <TextArea autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </FormItem>
        <FormItem label='发文位置（非必填）' {...formItemLayout}>
          {getFieldDecorator('publish_articles_address', {
            initialValue: data && data[0].publish_articles_address || '',
          })(
            <Select placeholder="请选择" style={{ width: 120 }} allowClear>
              <Option value={1}>头条</Option>
              <Option value={2}>次条</Option>
              <Option value={3}>三条</Option>
              <Option value={4}>四条</Option>
              <Option value={5}>五条</Option>
              <Option value={6}>六条</Option>
              <Option value={7}>七条</Option>
              <Option value={8}>八条</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label='发文时间（非必填）' {...formItemLayout}>
          {getFieldDecorator('publish_articles_at', {
            initialValue: data ? moment(data[0].publish_articles_at).isValid() ? moment(data[0].publish_articles_at) : undefined : ''
          })(
            <DatePicker format="YYYY-MM-DD HH:mm:ss" showTime placeholder="请输入"
              onBlur={() => {
                if (!this.props.form.getFieldValue('publish_articles_at')) {
                  if (data[0].publish_articles_at) {
                    this.props.form.setFieldsValue({ 'publish_articles_at': moment(data[0].publish_articles_at) })
                  }

                }
              }}
              style={{ width: 150 }} allowClear={moment(data[0].publish_articles_at).isValid() ? false : true} />
          )}
        </FormItem>
        <FormItem label='备注信息（非必填)' {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: data && data[0].content || '',
            rules: [{ max: 120, message: '不能超过120个汉字' }]
          })(
            <TextArea placeholder='填写备注信息' autosize={{ minRows: 4, maxRows: 6 }} />
          )}
        </FormItem>
      </Form>
    </Modal>
  }
}
const mapStateToProps = (state) => {
  return {
    basicSpotplanOrderInfo: state.spotplanReducers.basicSpotplanOrderInfo,
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...spotplanAction }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(EditOrderModal))
