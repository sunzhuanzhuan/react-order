/*

*这是添加代理商组件。对外开放2个参数：1.媒介平台id  2.添加成功后，代理商列表重新加载后的回调

*/
import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Modal, Select, Input, Radio, message } from 'antd';
import * as modalActions from '../../actions/modalActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

class AddAgent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      cooperationType: '1',
      paymentType: '1',
      cooperationPlatform: [],
      bankList: []
    }
  }
  //点击出现弹框
  showModal = () => {
    this.setState({
      visible: true
    })
    axios.get("/api/operator-gateway/trinityPlatform/v1/getCooperationPlatform", {
      params: {
        platformId: this.props.platformId,
        cooperationPlatformStatus: 1
      }
    }).then((response) => {
      let data = response.data.data
      this.setState({
        cooperationPlatform: [...data]
      })
    }).catch((error) => {
      message.error("下单列表获取失败")
    });
    axios.get("/api/finance/payment/paymentTypeList").then((response) => {
      let data = response.data.data.payment_type_list
      this.setState({
        bankList: [...data]
      })
    }).catch((error) => {
      message.error("开户行列表获取失败")
    });
  }
  //关闭弹框
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  //选择合作方式
  changeCooperationType = (e) => {
    this.setState({
      cooperationType: e.target.value
    })
  }
  //切换结算方式
  changePaymentType = (e) => {
    this.setState({
      paymentType: e.target.value
    })
  }
  //添加代理商
  submit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.paymentCompanyCode == "ZF0002") {
          values.paymentCompanyName = "微播易"
        } else if (values.paymentCompanyCode == "ZF0001") {
          values.paymentCompanyName = "布谷鸟"
        }
        this.props.actions.addAgent({ ...values }).then(() => {
          this.setState({
            visible: false
          })
          this.props.actions.getAgent({ platformId: this.props.platformId })
        })
      }
    });
  }
  render() {
    const { form } = this.props
    const { getFieldDecorator } = form
    return <div style={{ float: 'right', marginTop: '4px' }}>
      <Button type="primary"
        onClick={this.showModal}
      >添加代理商</Button>
      <Modal
        title="新增代理商"
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={null}
        destroyOnClose={true}
        width={500}
        bodyStyle={{ height: '500px', overflowY: 'auto' }}
        centered={true}
      >
        <Form layout="inline">
          <FormItem
            label="下单平台"
            layout={{
              labelCol: { span: 7 },
              wrapperCol: { span: 17 }
            }}
            style={{ width: '400px' }}
          >
            {getFieldDecorator("cooperationPlatformCode", {
              rules: [{
                required: true, message: '本项为必选项，请选择！',
              }]
            })(
              <Select style={{ width: '250px' }}>
                {
                  this.state.cooperationPlatform.map(v => {
                    return <Option
                      key={v.cooperationPlatformCode}
                      value={v.cooperationPlatformCode}>{v.cooperationPlatformName}</Option>
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            label="代理商名称"
            layout={{
              labelCol: { span: 7 },
              wrapperCol: { span: 17 }
            }}
            style={{ width: '400px' }}
          >
            {getFieldDecorator("agentName", {
              rules: [{
                required: true, message: '本项为必填项，请输入！',
              }, {
                pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,40}$/, message: '最多可输入40个以内的中英文及数字！'
              }]
            })(
              <Input
                style={{ width: '250px' }}
                placeholder="请输入代理商名称" />
            )}
          </FormItem>
          <FormItem
            label="合作方式"
            layout={{
              labelCol: { span: 7 },
              wrapperCol: { span: 17 }
            }}
            style={{ width: '400px' }}
          >
            {getFieldDecorator("cooperationType", {
              rules: [{
                required: true, message: '本项为必选项，请选择！',
              }],
              initialValue: '1'
            })(
              <RadioGroup onChange={this.changeCooperationType}>
                <Radio value='1'>周期付款</Radio>
                <Radio value='2'>其他</Radio>
              </RadioGroup>
            )}
          </FormItem>
          {
            this.state.cooperationType == "1" ?
              <FormItem
                label="返款比例"
                layout={{
                  labelCol: { span: 7 },
                  wrapperCol: { span: 17 }
                }}
                style={{ width: '400px' }}
              >
                {getFieldDecorator("refundRate", {
                  rules: [{
                    required: true, message: '本项为必填项，请输入！',
                  }, {
                    pattern: /^([1-9][0-9]{0,1}(\.[0-9]{1,2})?|100|100.0|100.00|[0]\.[0-9]{1,2}|0)$/, message: "仅可输入100以内的数字，仅可保留两位小数"
                  }]
                })(
                  <Input style={{ width: '250px' }} addonAfter="%" />
                )}
              </FormItem> :
              <FormItem
                label="说明"
                layout={{
                  labelCol: { span: 9 },
                  wrapperCol: { span: 15 }
                }}
                style={{ width: '400px' }}
              >
                {getFieldDecorator("cooperationRemark", {
                  rules: [{
                    pattern: /^.{0,50}$/, message: "最多可输入50个字"
                  }]
                })(
                  <TextArea
                    style={{ width: '300px' }}
                    placeholder="请输入说明"
                    autosize={{ minRows: 2, maxRows: 6 }} />
                )}
              </FormItem>
          }
          <FormItem
            label="付款公司"
            layout={{
              labelCol: { span: 7 },
              wrapperCol: { span: 17 }
            }}
            style={{ width: '400px' }}
          >
            {getFieldDecorator("paymentCompanyCode", {
              rules: [{
                required: true, message: '本项为必选项，请选择！',
              }]
            })(
              <RadioGroup>
                <Radio value='ZF0002'>微播易</Radio>
                <Radio value='ZF0001'>布谷鸟</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="结算方式"
            layout={{
              labelCol: { span: 7 },
              wrapperCol: { span: 17 }
            }}
            style={{ width: '400px' }}
          >
            {getFieldDecorator("settleType", {
              rules: [{
                required: true, message: '本项为必选项，请选择！',
              }]
            })(
              <RadioGroup>
                <Radio value='1'>预付</Radio>
                <Radio value='2'>周期付款</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="回票方式"
            layout={{
              labelCol: { span: 8 },
              wrapperCol: { span: 16 }
            }}
            style={{ width: '400px' }}
          >
            {getFieldDecorator("returnInvoiceType", {
              initialValue: '1'
            })(
              <RadioGroup>
                <Radio value='1' disabled={true}>全部回款</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="发票开具方"
            layout={{
              labelCol: { span: 7 },
              wrapperCol: { span: 17 }
            }}
            style={{ width: '400px' }}
          >
            {getFieldDecorator("beneficiaryCompany", {
              rules: [{
                required: true, message: '本项为必填项，请输入！',
              }, {
                pattern: /^.{0,50}$/, message: "最多可输入50个字"
              }]
            })(
              <TextArea
                style={{ width: '250px' }}
                placeholder="请输入发票开具方"
                autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
          <FormItem
            label="结算方式"
            layout={{
              labelCol: { span: 7 },
              wrapperCol: { span: 17 }
            }}
            style={{ width: '400px' }}
          >
            {getFieldDecorator("paymentType", {
              rules: [{
                required: true, message: '本项为必选项，请选择！',
              }],
              initialValue: '1'
            })(
              <RadioGroup onChange={this.changePaymentType}>
                <Radio value='1'>银行转账</Radio>
                <Radio value='2'>支付宝</Radio>
              </RadioGroup>
            )}
          </FormItem>
          {
            this.state.paymentType == "1" ?
              <div>
                <FormItem
                  label="开户行"
                  layout={{
                    labelCol: { span: 7 },
                    wrapperCol: { span: 17 }
                  }}
                  style={{ width: '400px' }}
                >
                  {getFieldDecorator("bank", {
                    rules: [{
                      required: true, message: '本项为必选项，请选择！',
                    }]
                  })(
                    <Select style={{ width: '250px' }}>
                      {
                        this.state.bankList.map(v => {
                          return <Option
                            key={v.payment_type_id}
                            value={v.payment_type_id}>{v.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  label="开户支行"
                  layout={{
                    labelCol: { span: 7 },
                    wrapperCol: { span: 17 }
                  }}
                  style={{ width: '400px' }}
                >
                  {getFieldDecorator("bankAgency", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^[\u4e00-\u9fa50-9]{0,60}$/, message: "仅可输入汉字及数字，长度不超过60"
                    }]
                  })(
                    <TextArea
                      style={{ width: '250px' }}
                      placeholder="请输入开户支行"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
                <FormItem
                  label="开户行所在省"
                  layout={{
                    labelCol: { span: 7 },
                    wrapperCol: { span: 17 }
                  }}
                  style={{ width: '400px' }}
                >
                  {getFieldDecorator("bankAgencyProvince", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^[\u4e00-\u9fa5]{0,30}$/, message: "仅可输入30字以内的汉字！"
                    }]
                  })(
                    <TextArea
                      style={{ width: '250px' }}
                      placeholder="请输入开户行所在省"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
                <FormItem
                  label="开户行所在市"
                  layout={{
                    labelCol: { span: 7 },
                    wrapperCol: { span: 17 }
                  }}
                  style={{ width: '400px' }}
                >
                  {getFieldDecorator("bankAgencyCity", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^[\u4e00-\u9fa5]{0,50}$/, message: "仅可输入50字以内的汉字！"
                    }]
                  })(
                    <TextArea
                      style={{ width: '250px' }}
                      placeholder="请输入开户行所在市"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
                <FormItem
                  label="帐号"
                  layout={{
                    labelCol: { span: 7 },
                    wrapperCol: { span: 17 }
                  }}
                  style={{ width: '400px' }}
                >
                  {getFieldDecorator("cardNumber", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^[0-9]{16,19}$/, message: '仅可输入16-19位数字'
                    }]
                  })(
                    <Input style={{ width: '250px' }} placeholder="请输入帐号" />
                  )}
                </FormItem>
                <FormItem
                  label="户名"
                  layout={{
                    labelCol: { span: 7 },
                    wrapperCol: { span: 17 }
                  }}
                  style={{ width: '400px' }}
                >
                  {getFieldDecorator("realName", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^[\u4e00-\u9fa5]{0,50}$/, message: "仅可输入50字以内的汉字！"
                    }]
                  })(
                    <TextArea
                      style={{ width: '250px' }}
                      placeholder="请输入户名"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </div> :
              <div>
                <FormItem
                  label="帐号"
                  layout={{
                    labelCol: { span: 7 },
                    wrapperCol: { span: 17 }
                  }}
                  style={{ width: '400px' }}
                >
                  {getFieldDecorator("alipayAccount", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^.{1,80}$/, message: "最多可输入80位"
                    }]
                  })(
                    <TextArea
                      style={{ width: '250px' }}
                      placeholder="请输入帐号"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
                <FormItem
                  label="收款方名称"
                  layout={{
                    labelCol: { span: 7 },
                    wrapperCol: { span: 17 }
                  }}
                  style={{ width: '400px' }}
                >
                  {getFieldDecorator("alipayAccountName", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^.{0,50}$/, message: "最多可以输入50个字"
                    }]
                  })(
                    <TextArea
                      style={{ width: '250px' }}
                      placeholder="请输入收款方名称"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </div>
          }
          <FormItem
            label="备注"
            layout={{
              labelCol: { span: 7 },
              wrapperCol: { span: 17 }
            }}
            style={{ width: '400px' }}
          >
            {getFieldDecorator("agentRemark", {
              rules: [{
                pattern: /^.{0,100}$/, message: "最多可以输入100个字"
              }]
            })(
              <TextArea
                style={{ width: '250px' }}
                placeholder="请输入备注"
                autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
          <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            <Button type="primary" onClick={this.submit}>提交</Button>
            <Button type="primary" style={{ marginLeft: '10px' }}>取消</Button>
          </div>
        </Form>
      </Modal>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...modalActions
  }, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddAgent))


