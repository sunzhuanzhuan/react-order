import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as spotplanAction from "../../actions";
import { Modal, Button, Select, Input, Form, message, DatePicker, InputNumber,Alert,Icon,Tooltip } from 'antd';
import moment from 'moment'
import './editOrderModal.less'
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class EditOrderModal extends React.Component {
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { data, spotplan_id } = this.props;
        if (!values.publish_articles_at) {
          values.publish_articles_at = null
        } else {
          values.publish_articles_at = moment(values.publish_articles_at).format('YYYY-MM-DD HH:mm:ss')
        }
        if (!values.publish_articles_address) {
          values.publish_articles_address = ''
        }
        this.props.actions.postUpdateSpotplanOrder({ ...values, spotplan_id, order_id: data[0].order_id, flag: 2 }).then((res) => {
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
  checkCost = (rule, value, callback) => {
    if (value.toString().split('.')[0].length > 8) {
      callback('最多输入8位数')
      return
    } else if (value <= 0) {
      callback('请输入大于0的数')
      return
    } else {
      callback()
    }

  }
  checkCostfee = (rule, value1, callback) => {
    if (value1.toString().split('.')[0].length > 9) {
      callback('最多输入9位数')
      return
    } else if (value1 <= 0) {
      callback('请输入大于0的数')
      return
    } else {
      callback()
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible, onCancel, data, handleUpdate } = this.props;
    console.log(data);
    
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
      <Alert message="若包含返税订单，返税订单的Costwithfee请输入（返税金额/1.06），Cost请输入（Costwithfee金额/1.04）" type="warning" showIcon/>
        <FormItem label='订单ID' {...formItemLayout}>{data && data[0].order_id}</FormItem>
        <FormItem label='需求名称' {...formItemLayout}>{data && data[0].requirement_name}</FormItem>
        <FormItem label='平台' {...formItemLayout}>{data && data[0].weibo_type_name}</FormItem>
        <FormItem label='账号名称' {...formItemLayout}>{data && data[0].weibo_name}</FormItem>
        <FormItem label='账号ID（必填）' {...formItemLayout}>
          {getFieldDecorator('weibo_id', {
            initialValue: data && data[0].weibo_type == 23 ? '-' : data && data[0].weibo_id || '',
            rules: [{ required: true, message: '请填写账号ID' }, {
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
        </FormItem>
        <FormItem label='价格名称' {...formItemLayout}>
          {getFieldDecorator('price_name', {
            initialValue: data && data[0].price_name || '',
            rules: [{ required: true, message: '请填写名称' }]
          })(
            <Input style={{ width: 240 }} />
          )}
        </FormItem>
        {data[0].is_tax_rebate_account == 2&& <FormItem label='cost' {...formItemLayout}>
          {getFieldDecorator('cost', {
            initialValue: data && data[0].cost || '',
            validateTrigger: ['onChange'],
            validateFirst: true,
            rules: [{ required: true, message: '请填cost金额' },
            {
              validator: this.checkCost
            }
          ]
          })(<InputNumber precision={2} style={{ width: 200 }} onChange={(value) => {
            if (value != data && data[0].cost) {
              if (data && data[0].service_rate) {
                let num = Number(value) * (1 + (Number(data[0].service_rate) / 100)).toString()
                this.props.form.setFieldsValue({
                  'costwithfee': num.toFixed(2)
                })
                this.props.form.validateFields(['costwithfee'])
              }

            }
          }} />
          )}
        </FormItem>}
        {data[0].is_tax_rebate_account == 2 && <FormItem label='costwithfee' {...formItemLayout}>
          {getFieldDecorator('costwithfee', {
            initialValue: data && data[0].costwithfee || '',
            validateTrigger: ['onChange'],
            validateFirst: true,
            rules: [{ required: true, message: '请填costwithfee金额' },
            {
              validator: this.checkCostfee
            }
          ]
          })(<InputNumber precision={2} style={{ width: 200 }} />
          )}
        </FormItem>}
        {data[0].is_tax_rebate_account == 1 && <FormItem label='cost' {...formItemLayout}>
          {getFieldDecorator('cost', {
            initialValue: data && data[0].cost || '',
            validateTrigger: ['onChange'],
            validateFirst: true,
            rules: [{ required: true, message: '请填cost金额' }]
          })(<InputNumber precision={2} style={{ width: 200 }} onChange={(value) => {
            if (value != data && data[0].cost) {
              if (data && data[0].service_rate) {
                let num = Number(value) * (1 + (Number(data[0].service_rate) / 100)).toString()
                this.props.form.setFieldsValue({
                  'costwithfee': num.toFixed(2)
                })
                this.props.form.validateFields(['costwithfee'])
              }

            }
          }}/>
          )}
        </FormItem>}
        {data[0].is_tax_rebate_account == 1 && <FormItem label='costwithfee' {...formItemLayout} style={{float:'left',marginLeft:'100px'}}>
          {getFieldDecorator('costwithfee', {
            initialValue: data && data[0].costwithfee || '',
            rules: [{ required: true, message: '请填costwithfee金额' }]
          })(<InputNumber precision={2}
            style={{ width: 200 ,backgroundColor:'#fffce4'}}  onChange={(value) => {
            if (value != data && data[0].costwithfee) {
                let num =(Number(value)/(1 + Number(data[0].service_rate) ))
                this.props.form.setFieldsValue({
                  'cost': num.toFixed(2)
                })
            }
          }}/>
          )}
        </FormItem>}
        {data[0].is_tax_rebate_account == 1 ?<Tooltip title="若为返税订单，请输入负值且返税金额÷1.06"><div className='edit-icon'><Icon type="question-circle" /></div></Tooltip>:null}
        <FormItem label='账号分类' {...formItemLayout} style={{clear:'both'}}>
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
        <FormItem label='发文位置（微信必填）' {...formItemLayout}>
          {getFieldDecorator('publish_articles_address', {
            initialValue: data && data[0].publish_articles_address || '',
            rules: [{ required: data && data[0].weibo_type == 9 ? true : false, message: '请填写发文位置' }]
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
        <FormItem label='发文时间（微信必填）' {...formItemLayout}>
          {getFieldDecorator('publish_articles_at', {
            initialValue: data ? moment(data[0].publish_articles_at).isValid() ? moment(data[0].publish_articles_at) : undefined : '',
            rules: [{ required: data && data[0].weibo_type == 9 ? true : false, message: '请填写发文时间' }]
          })(
            <DatePicker format="YYYY-MM-DD HH:mm:ss" placeholder="请输入" showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
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
        <FormItem label='Client（非必填）' {...formItemLayout}>
          {getFieldDecorator('client', {
            initialValue: data && data[0].client || '',
          })(
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
        </FormItem>
        <FormItem label='content type（非必填）' {...formItemLayout}>
          {getFieldDecorator('content_type', {
            initialValue: data && data[0].content_type || '',
            rules: [{ max: 255, message: '不能超过255个汉字' }]
          })(
            <TextArea placeholder='请填写内容类型' autosize={{ minRows: 4, maxRows: 6 }} />
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
