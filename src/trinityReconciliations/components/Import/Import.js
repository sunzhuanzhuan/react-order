import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, Popconfirm, Upload, Icon, message, Steps } from "antd";
import NewUpload from '../newUpload';
import { withRouter } from 'react-router-dom'
import './import.less';
import qs from 'qs';
const Step = Steps.Step;

const FormItem = Form.Item;
const Option = Select.Option;

let file_name = ''

class ListQuery extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleTable: false,
      stateMentList: {},
      stateTotal: false,
      summaryList: {},
      fileList: [],
      currentStep: -1

    };
  }
  beforeUpload = (res) => {
    file_name = res.name

  }
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { search } = this.props;
        const hide = message.loading('上传中，请稍候...');
        let content = new window.FormData();
        content.append('file_path', this.state.file);
        content.append('commit', 2);
        content.append('statement_id', this.state.statement_id);
        this.props.importSummary(content).then((res) => {
          // handlefilterParams(params);
          hide();
          if (res.code == 1000) {
            message.success('上传成功，本次对账完成！');
            this.props.history.push({
              pathname: '/order/publicOrderList',
              search: `?${qs.stringify({ agent: search.agent })}`,
            });
          } else {
            message.error('双方的对账金额不符，请重新对账后再上传对账！');
            hide();
            // this.props.history.push({
            //   pathname: '/order/trinity/reconciliations/summary',
            //   search: `?${qs.stringify({ agent: search.agent})}`,
            // });
          }

        }).catch(() => {
          // this.props.history.push({
          //   pathname: '/order/trinity/reconciliations/summary',
          //   search: `?${qs.stringify({ agent: search.agent})}`,
          // });
          // message.error('双方的对账金额不符，请重新对账后再上传对账！');
          // hide();
        });

      }
    });
  }
  handleClear = () => {
    this.props.form.resetFields();
  }


  handleChangeOption = (value) => {
    console.log(value)
    const agent_id = qs.parse(this.props.location.search.substring(1)).agent_id

    this.props.addOrder({
      statement_name: file_name,
      attachment: value, agent_id: agent_id
    }).then((res) => {
      if (res.code == 1000) {
        this.props.getInputList({ agent_id: agent_id }).then(() => {
          this.props.form.setFieldsValue({ statement_id: res.data.statement_id });
          this.setState({
            visibleTable: true,
            stateMentList: res.data,
            statement_id: res.data.statement_id,
            currentStep: 0

          })
        })
        message.success('上传成功')
      } else {
        message.error(res.data.msg)
      }


    })


  }
  handleChangeSelect = (value) => {
    console.log(value)
    this.setState({
      visibleTable: true,
      statement_id: value,
      currentStep: 0
    })
    this.props.statementInputList.map((item) => {
      if (item.statement_id == value) {
        this.setState({
          stateMentList: item
        })
      }
    })
  }
  handleClickTotal = (value) => {
    this.props.importSummary(value).then((res) => {
      this.setState({
        stateTotal: true,
        summaryList: res.data
      })
    })
  }


  render() {
    let { getFieldDecorator } = this.props.form;
    let { getToken, statementInputList, search } = this.props;
    let { stateMentList, summaryList, statement_id } = this.state
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };
    const props = {
      // be
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      accept: ".xlsx,.xls",
      showUploadList: true,
      multiple: false,
      fileList: null,
      customRequest: obj => {
        const hide = message.loading("上传中，请稍候...");
        const { importSummary } = this.props;
        const { fileList } = this.state;
        let content = new window.FormData();
        content.append('file_path', obj.file);
        content.append('commit', 1);
        content.append('statement_id', this.state.statement_id);
        importSummary(content).then((res) => {

          let ary = [...fileList,
          {
            uid: obj.file.uid,
            name: '已导入' + obj.file.name,
            status: 'done',
            url: '',
          }];
          this.setState({
            fileList: ary,
            stateTotal: true,
            summaryList: res.data,
            file: obj.file,
            currentStep: 1
          });
          hide();
          message.success('上传成功！');

        }).catch(({ errorMsg }) => {
          hide();
          // message.error(errorMsg)
        });
      }
    };
    return <div>
      <div style={{ float: 'left', height: '100%', width: '15%' }}>
        <Steps direction="vertical" current={this.state.currentStep}>
          <Step style={{ height: '200px' }} title="对账单" description="选择或者导入对账单" />
          <Step style={{ height: '280px' }} title="汇总单" description="上传汇总单" />
          <Step style={{ height: '200px' }} title="对账" description="确认对账" />
        </Steps>
      </div>

      <div style={{ float: 'left', height: '100%', width: '80%' }}>
        <Form>
          <Row style={{ height: '200px' }}>
            <Col span={10}>
              <FormItem label='请关联三方对账单' {...formItemLayout}>
                {getFieldDecorator('statement_id', {
                  initialValue: '',
                  rules: [{ required: true, message: '请选择关联三方对账单' }],
                })(
                  <Select
                    style={{ width: '300px' }}
                    onChange={this.handleChangeSelect}
                    placeholder='请选择'
                  >
                    <Option key={' '} >请选择</Option>
                    {
                      statementInputList.length > 0 ? statementInputList.map((item) => {
                        return <Option key={item.statement_id} value={item.statement_id}>{item.statement_name}</Option>
                      })
                        : null}
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={5}>
              <FormItem label='' {...formItemLayout}>
                {getFieldDecorator('payment_status', {
                  initialValue: [],
                  rules: [{ required: false, message: '请上传的三方对账单' }],
                })(
                  <NewUpload
                    tok={getToken}
                    uploadUrl="/api/common-file/file/v1/uploadPubBucket"
                    len={1}
                    size={50}
                    listType="text"
                    beforeUpload={this.beforeUpload}
                    uploadText="导入三方对账单"
                    onChange={(file, originFile) => {
                      console.log(file[0].filepath);
                      console.log(originFile);
                      console.log(file);
                      this.handleChangeOption(file[0].filepath)
                    }}
                    accept=".xlsx,.xls"
                    btnProps={{
                      type: 'primary'
                    }}
                    bizzCode="ACCOUNT_STATEMENT_EXCEL_UPLOAD"
                  />
                )
                }
              </FormItem>

            </Col>
            <div>
              {
                this.state.visibleTable ? <div style={{ marginTop: '60px' }}>
                  <OptionTable stateMentList={stateMentList} /></div>
                  : <div></div>
              }
            </div>
          </Row>


          <Row style={{ height: '280px' }}>
            <Col span={10}>
              <FormItem label='请上传的汇总单' {...formItemLayout}>
                {getFieldDecorator('summary_sheet_name', {
                  initialValue: [],
                  rules: [{ required: true, message: '请上传的汇总单' }],
                })(
                  <Upload {...props}>
                    <Button type="primary" disabled={this.state.currentStep != 0}>
                      <Icon type="upload" />上传文件
                </Button>
                  </Upload>
                )}
              </FormItem>
            </Col>
            <div>
              {
                this.state.stateTotal ? <div>
                  <TotalTable summaryList={summaryList} /></div> : <div>
                  </div>
              }
            </div>
          </Row>


          <Row>
            <Col span={12}>

              <Button style={{ marginRight: '20px' }} onClik={this.props.history.push({
                pathname: '/order/publicOrderList',
                search: `?${qs.stringify({ agent: search.agent })}`,
              })}>取消</Button>
              {(stateMentList.total_pay_amount == summaryList.total_pay_amount) ? <Popconfirm title="确认后将改变订单的对账状态，是否确认此操作？" onConfirm={this.handleSearch} okText="确定" cancelText="取消">
                <Button type="primary" className='left-gap'>确认对账</Button>
              </Popconfirm> : <Button type="primary" className='left-gap'
                disabled={true}>确认对账</Button>}

            </Col>
          </Row>
        </Form>
      </div>

    </div >;
  }
}
export default Form.create()(withRouter(ListQuery));


// 对账单
export class OptionTable extends Component {
  state = {

  }
  render() {
    let { stateMentList } = this.props;
    console.log(stateMentList)
    return <div className='statementBox'>
      <Row className='title'>对账单信息</Row>
      {/* <Row className='info'>
        <Col span={12}>
        三方对账单总数:{stateMentList.total_statement}
        </Col>
        <Col span={12}>
        扣减订单:{stateMentList. deduction_order_count}
        </Col>
      </Row> */}

      <Row className='info'>
        <Col span={12}>
          总金额(元):{stateMentList.total_pay_amount}
        </Col>
        {/* <Col span={12}>
        扣减总金额(元):{stateMentList.deduction_amount}
        </Col> */}
      </Row>

      {/* <Row className='info'>
        <Col span={12}>
        待付订单:{stateMentList.wait_pay_order}
        </Col>
        <Col span={12}>
        </Col>
      </Row> */}

      {/* <Row className='info'>
        <Col span={12}>
        应付总金额(元):{stateMentList.total_pay_amount}
        </Col>
        <Col span={12}>
        </Col>
      </Row> */}
    </div>
  }
}


//汇总单

export class TotalTable extends Component {
  state = {

  }
  render() {
    let { summaryList } = this.props
    return <div className="statementBox">
      <div className='title'>汇总单信息</div>
      <Row className='info'>
        <Col span={12}>
          订单总数:{summaryList.total_order_count}
        </Col>
        <Col span={12}>
          总金额(元):{summaryList.total_pay_amount}
        </Col>
      </Row>

      <Row className='info'>
        <Col span={12}>
          待付订单:{summaryList.wait_pay_order_count}
        </Col>
        <Col span={12}>
          待付总金额(元):{summaryList.wait_pay_amount}
        </Col>
      </Row>

      <Row className='info'>
        <Col span={12}>
          扣减订单:{summaryList.deduction_order_count}
        </Col>
        <Col span={12}>
          扣减总金额(元):{summaryList.deduction_amount}
        </Col>
      </Row>

    </div>
  }
}
