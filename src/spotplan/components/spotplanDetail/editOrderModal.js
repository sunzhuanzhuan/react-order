import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../../actions";
import { Modal, Button, Select, Input, Form, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class EditOrderModal extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { data, spotplan_id } = this.props;
        this.props.actions.postUpdateSpotplanOrder({ ...values, spotplan_id, order_id: data[0].order_id }).then(() => {
          message.success('操作成功！', 2);
          this.props.onCancel();
          this.props.handleClose();
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
        <FormItem label='是否备选号' {...formItemLayout}>
          {getFieldDecorator('is_replace', {
            initialValue: data && data[0].is_replace || undefined,
            rules: [{ required: true, message: '请选择是否备选' }]
          })(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.edit-order-modal')}
              allowClear
            >
              <Option value={1}>是</Option>
              <Option value={2}>否</Option>
            </Select>
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
        <FormItem label='备注信息（非必填）' {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: data && data[0].content || '',
            rules: [{ max: 400, message: '不能超过400字' }]
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
