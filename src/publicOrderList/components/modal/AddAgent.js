/*

*这是添加代理商组件。对外开放2个参数：1.媒介平台id  2.添加成功后，代理商列表重新加载后的回调

*/
import React, { Component } from 'react'
import api from '../../../api/index'
import { Form, Button, Modal, Select, Input, Radio, message } from 'antd';
import * as modalActions from '../../actions/modalActions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const confirm = Modal.confirm;

class AddAgent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      cooperationType: '1',
      paymentType: '1',
      cooperationPlatform: [],
      bankList: [],
      cooperationPlatformId: ''
    }
  }
  //点击出现弹框
  showModal = () => {
    this.setState({
      visible: true
    })
    api.get("/operator-gateway/trinityPlatform/v1/getCooperationPlatform", {
      params: {
        platformId: this.props.platformId,
        cooperationPlatformStatus: 1
      }
    }).then((response) => {
      let data = response.data
      this.setState({
        cooperationPlatform: [...data]
      })
    }).catch((error) => {
      message.error("下单列表获取失败")
    });
    api.get("/finance/payment/paymentTypeList").then((response) => {
      let data = response.data.payment_type_list
      this.setState({
        bankList: [...data]
      })
    }).catch((error) => {
      message.error("开户行列表获取失败")
    });
  }
  //关闭弹框
  handleCancel = () => {
    confirm({
      title: '取消后您的信息将无法保存，是否确认此操作？',
      onOk: () => {
        this.setState({
          visible: false
        })
      }
    });
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
        values.agentStatus = 1
        this.props.actions.addAgent({ ...values }).then((res) => {
          this.setState({
            visible: false
          })
          if (this.props.type == "multi") {
            if (this.props.applyPrepayment != '' && values.settleType == 2) {
              this.props.actions.getAgent({ platformId: this.props.platformId })
            } else {
              this.props.addAgentSuccessCallback({
                cooperationPlatformId: this.state.cooperationPlatformId,
                agentId: res.data
              })
            }
          } else {
            this.props.actions.getAgent({ platformId: this.props.platformId })
          }
        })
      }
    });
  }
  isExistAgentName = (rule, value, callback) => {
    let cooperationPlatformCode = this.props.form.getFieldValue("cooperationPlatformCode")
    if (cooperationPlatformCode) {
      this.props.actions.existsAgentName({
        cooperationPlatformCode: cooperationPlatformCode,
        agentName: value
      }).then(() => {
        if (this.props.existsAgentName.data) {
          //重复
          callback('代理商名称重复！')
        } else {
          callback()
        }
      })
    } else {
      message.error("请先选择下单平台")
    }
  }
  //获取下单平台id
  getCooperationPlatformId = (value, option) => {
    this.setState({
      cooperationPlatformId: option.props.id
    })
  }
  render() {
    const { form, platformName } = this.props
    const { getFieldDecorator } = form
    const formLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    return <div style={{ position: 'absolute', right: '0', top: '2px' }}>
      <Button type="primary"
        onClick={this.showModal}
      >添加代理商</Button>
      <Modal
        title={`新增代理商 所属媒体平台：${platformName}`}
        visible={this.state.visible}
        onCancel={this.handleCancel}
        footer={null}
        destroyOnClose={true}
        width={600}
        bodyStyle={{ height: '500px', overflowY: 'auto' }}
        centered={true}
      >
        <Form layout="horizontal">
          <FormItem
            label="下单平台"
            {...formLayout}
          >
            {getFieldDecorator("cooperationPlatformCode", {
              rules: [{
                required: true, message: '本项为必选项，请选择！',
              }]
            })(
              <Select style={{ width: '350px' }}
                onChange={this.getCooperationPlatformId}
              >
                {
                  this.state.cooperationPlatform.map(v => {
                    return <Option
                      key={v.cooperationPlatformCode}
                      value={v.cooperationPlatformCode}
                      id={v.id}
                    >{v.cooperationPlatformName}</Option>
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            label="代理商名称"
            {...formLayout}
          >
            {getFieldDecorator("agentName", {
              rules: [{
                required: true, message: '本项为必填项，请输入！',
              }, {
                pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,40}$/, message: '最多可输入40个以内的中英文及数字！'
              }, {
                validator: this.isExistAgentName
              }]
            })(
              <Input
                style={{ width: '350px' }}
                placeholder="请输入代理商名称"
              />
            )}
          </FormItem>
          <FormItem
            label="合作方式"
            {...formLayout}
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
                {...formLayout}
              >
                {getFieldDecorator("refundRate", {
                  rules: [{
                    required: true, message: '本项为必填项，请输入！',
                  }, {
                    pattern: /^([1-9][0-9]{0,1}(\.[0-9]{1,2})?|100|100.0|100.00|[0]\.[0-9]{1,2}|0)$/, message: "仅可输入100以内的数字，您可保留两位小数"
                  }]
                })(
                  <Input style={{ width: '350px' }} addonAfter="%" />
                )}
              </FormItem> :
              <FormItem
                label="说明"
                {...formLayout}
              >
                {getFieldDecorator("cooperationRemark", {
                  rules: [{
                    pattern: /^.{0,50}$/, message: "最多可输入50个字"
                  }]
                })(
                  <TextArea
                    style={{ width: '350px' }}
                    placeholder="请输入说明"
                    autosize={{ minRows: 2, maxRows: 6 }} />
                )}
              </FormItem>
          }
          <FormItem
            label="付款公司"
            {...formLayout}
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
            {...formLayout}
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
            {...formLayout}
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
            {...formLayout}
          >
            {getFieldDecorator("beneficiaryCompany", {
              rules: [{
                required: true, message: '本项为必填项，请输入！',
              }, {
                pattern: /^.{0,50}$/, message: "最多可输入50个字"
              }]
            })(
              <TextArea
                style={{ width: '350px' }}
                placeholder="请输入发票开具方"
                autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
          <FormItem
            label="结算方式"
            {...formLayout}
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
                  {...formLayout}
                >
                  {getFieldDecorator("bank", {
                    rules: [{
                      required: true, message: '本项为必选项，请选择！',
                    }]
                  })(
                    <Select style={{ width: '350px' }}>
                      {
                        this.state.bankList.map(v => {
                          return <Option
                            key={v.payment_type_id}
                            value={v.name}>{v.name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
                <FormItem
                  label="开户支行"
                  {...formLayout}
                >
                  {getFieldDecorator("bankAgency", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^[\u4e00-\u9fa50-9]{0,60}$/, message: "仅可输入汉字及数字，长度不超过60"
                    }]
                  })(
                    <TextArea
                      style={{ width: '350px' }}
                      placeholder="请输入开户支行"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
                <FormItem
                  label="开户行所在省"
                  {...formLayout}
                >
                  {getFieldDecorator("bankAgencyProvince", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^[\u4e00-\u9fa5]{0,30}$/, message: "仅可输入30字以内的汉字！"
                    }]
                  })(
                    <TextArea
                      style={{ width: '350px' }}
                      placeholder="请输入开户行所在省"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
                <FormItem
                  label="开户行所在市"
                  {...formLayout}
                >
                  {getFieldDecorator("bankAgencyCity", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^[\u4e00-\u9fa5]{0,50}$/, message: "仅可输入50字以内的汉字！"
                    }]
                  })(
                    <TextArea
                      style={{ width: '350px' }}
                      placeholder="请输入开户行所在市"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
                <FormItem
                  label="帐号"
                  {...formLayout}
                >
                  {getFieldDecorator("cardNumber", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^[0-9]{16,19}$/, message: '仅可输入16-19位数字'
                    }]
                  })(
                    <Input style={{ width: '350px' }} placeholder="请输入帐号" />
                  )}
                </FormItem>
                <FormItem
                  label="户名"
                  {...formLayout}
                >
                  {getFieldDecorator("realName", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^[\u4e00-\u9fa5]{0,50}$/, message: "仅可输入50字以内的汉字！"
                    }]
                  })(
                    <TextArea
                      style={{ width: '350px' }}
                      placeholder="请输入户名"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </div> :
              <div>
                <FormItem
                  label="帐号"
                  {...formLayout}
                >
                  {getFieldDecorator("alipayAccount", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^.{1,80}$/, message: "最多可输入80位"
                    }]
                  })(
                    <TextArea
                      style={{ width: '350px' }}
                      placeholder="请输入帐号"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
                <FormItem
                  label="收款方名称"
                  {...formLayout}
                >
                  {getFieldDecorator("alipayAccountName", {
                    rules: [{
                      required: true, message: '本项为必填项，请输入！',
                    }, {
                      pattern: /^.{0,50}$/, message: "最多可以输入50个字"
                    }]
                  })(
                    <TextArea
                      style={{ width: '350px' }}
                      placeholder="请输入收款方名称"
                      autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </div>
          }
          <FormItem
            label="备注"
            {...formLayout}
          >
            {getFieldDecorator("agentRemark", {
              rules: [{
                pattern: /^.{0,100}$/, message: "最多可以输入100个字"
              }]
            })(
              <TextArea
                style={{ width: '350px' }}
                placeholder="请输入备注"
                autosize={{ minRows: 2, maxRows: 6 }} />
            )}
          </FormItem>
          <div style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            <Button type="primary" onClick={this.submit}>提交</Button>
            <Button type="primary" style={{ marginLeft: '10px' }}
              onClick={this.handleCancel}
            >取消</Button>
          </div>
        </Form>
      </Modal>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    existsAgentName: state.publicOrderListReducer.existsAgentName
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


