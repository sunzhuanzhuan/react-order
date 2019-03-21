import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, Popconfirm, message, Icon, Input } from "antd";
import './import.less'

import { OssUpload } from 'wbyui'
const FormItem = Form.Item;
const Option = Select.Option;
const dataFormat = 'YYYY-MM-DD'
function beforeUpload(file) {
	const reg = /^[.\w\u4E00-\u9FFF\s()（）#—~【】[\]-]+$/;
	const formateName = file.name.replace(/\.\w+$/, '');
	if (!reg.test(formateName)) {
		message.error('你上传的文件名包含不支持的特殊字符');
		return false;
	} else {
		return true;
	}
}

class ListQuery extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleTable:false,
      num:1,
      stateTotal:false
    };
  }
  handleSearch = (e) => {
		const { questAction, page_size, handlefilterParams } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
        console.log(values)
				// let params = values.month ? { ...values, month: values.month.format('YYYYMM') } : { ...values };
				// const hide = message.loading('查询中，请稍候...');
				// questAction({ ...params, page: 1, page_size }).then(() => {
				// 	handlefilterParams(params);
				// 	hide();
				// }).catch(() => {
				// 	message.error('查询失败');
				// 	hide();
				// });
			}
		});
	}
	handleClear = () => {
		this.props.form.resetFields();
	}

  componentWillMount() {}

  handleClick=()=>{
    this.props.form.setFieldsValue({public_order_id_1: '2' });
    this.setState({
      visibleTable:true,
      num:3
    })
  }
  handleChangeOption=(value)=>{
    if(value !=' '){
      this.setState({
        visibleTable:true,
        num:2
      })
    }else{
      this.setState({
        visibleTable:false
      })
    }
   
  }
  handleClickTotal=()=>{
    this.setState({
      stateTotal:true
    })
  }
  render() {
    let { getFieldDecorator } = this.props.form;
	
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};

    return <div>
     <Form>
				<Row>
					
					<Col span={11}>
						<FormItem label='请选择关联三方对账单' {...formItemLayout}>
							{getFieldDecorator('public_order_id_1', { initialValue:'1',rules: [{ required: true, message: '请选择' }], })(
								<Select
                style={{ width: '300px' }}
                onChange={this.handleChangeOption}
              >
               <Option key={' '} >请选择</Option>
               <Option key={'1'} >未对账</Option>
               <Option key={'2'}>对账完成</Option>
               <Option key={'3'}>部分对账</Option>
              </Select>
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<FormItem label='' {...formItemLayout}>
							{getFieldDecorator('payment_status', { initialValue: '' })(
                <Button type="primary" className='left-gap' onClick={this.handleClick}>上传三方对账单</Button>
              // <OssUpload tok={{ token: '', upload_url: '' }}  size={10} len={5} accept={".zip,.rar,.pdf"}
              // uploadText={'上传合同扫描件'} beforeUpload={beforeUpload}>
              // </OssUpload>
							)}
						</FormItem>
					</Col>

				</Row>
          <Row>
          { 
            this.state.visibleTable?<div style={{height:'200px',marginTop:'20px'}}>
            <OptionTable num={this.state.num}/></div>
            :<div style={{height:'200px'}}></div>
          }
       </Row>
          
        <Row style={{marginTop:'20px'}}>
        <Col span={11}>
						<FormItem label='请选择要上传的汇总单' {...formItemLayout}>
							{getFieldDecorator('payment_status', { initialValue: '' ,rules: [{ required: true, message: '请选择' }]})(
                <Button type="primary" className='left-gap' onClick={this.handleClickTotal}>请选择要上传的汇总单</Button>
              // <OssUpload tok={{ token: '', upload_url: '' }}  size={10} len={5} accept={".zip,.rar,.pdf"}
              // uploadText={'上传合同扫描件'} beforeUpload={beforeUpload}>
              // </OssUpload>
							)}
						</FormItem>
					</Col>
        </Row>
        {
        this.state.stateTotal?<div style={{height:'200px',marginTop:'20px'}}>
        <TotalTable/></div>:<div style={{height:'200px'}}>
        </div>
      }
        <Row>
        <Col span={8}></Col>
        <Col span={8}>
        
            <Button style={{marginRight:'20px'}} onClick={this.handleClickTotal}>取消</Button>
            <Popconfirm title="确认后将改变订单的对账状态，是否确认此操作？" onConfirm={this.handleSearch} okText="确定" cancelText="取消">
              <Button type="primary" className='left-gap'>确认对账</Button>
            </Popconfirm>
          
					</Col>
          <Col span={8}></Col>
        </Row>
			</Form>
     
     
    </div>;
  }
}
export default Form.create()(ListQuery);


// 对账单
export class OptionTable extends Component{
  state={

  }
  render(){
    return <div className='statementBox'>
      <Row className='title'>对账单信息</Row>
      <Row className='info'>
        <Col span={12}>
        三方对账单总数:{this.props.num}
        </Col>
        <Col span={12}>
        扣减订单:
        </Col>
      </Row>

      <Row className='info'>
        <Col span={12}>
        总金额(元):
        </Col>
        <Col span={12}>
        扣减总金额(元):
        </Col>
      </Row>

      <Row className='info'>
        <Col span={12}>
        本次应付订单:
        </Col>
        <Col span={12}>
        </Col>
      </Row>

       <Row className='info'>
        <Col span={12}>
        应付总金额(元):
        </Col>
        <Col span={12}>
        </Col>
      </Row>
    </div>
  }
}


//汇总单

export class TotalTable extends Component{
  state={

  }
  render(){
    return <div className="statementBox">
      <Row className='title'>汇总单信息</Row>
      <Row className='info'>
        <Col span={12}>
        订单总数:{this.props.num}
        </Col>
        <Col span={12}>
        总金额(元):
        </Col>
      </Row>

      <Row className='info'>
        <Col span={12}>
        本次应付订单:
        </Col>
        <Col span={12}>
        应付总金额(元):
        </Col>
      </Row>

      <Row className='info'>
        <Col span={12}>
        扣减订单:
        </Col>
        <Col span={12}>
        扣减总金额(元):
        </Col>
      </Row>

    </div>
  }
}
