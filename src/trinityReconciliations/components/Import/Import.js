import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, Popconfirm, Upload, Icon, message } from "antd";
import NewUpload from '../newUpload';
import { withRouter } from 'react-router-dom'
import './import.less';
import qs from 'qs';

const FormItem = Form.Item;
const Option = Select.Option;

let file_name=''

class ListQuery extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      visibleTable:false,
      stateMentList:{},
      stateTotal:false,
      summaryList:{},
      fileList:[]

    };
  }
  beforeUpload=(res)=>{
    file_name=res.name
    
  }
  handleSearch = (e) => {
		// const { questAction, page_size, handlefilterParams } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
        let {search }=this.props;
				const hide = message.loading('上传中，请稍候...');
				this.props.importSummary( ...this.state.fileList,{ commit: 2 }).then((res) => {
					// handlefilterParams(params);
          hide();
          if(res.data.code == 1000){
            message.success('上传成功，本次对账完成！');
            this.props.history.push({
              pathname: '/order/trinity/reconciliations/summary',
              search: `?${qs.stringify({ agent: search.agent})}`,
            });
          }else{
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

 
  handleChangeOption=(value)=>{
    console.log(value)
    const agent_id  =qs.parse(this.props.location.search.substring(1)).agent_id
    
    this.props.addOrder({statement_name:file_name,
      attachment:value,agent_id:agent_id}).then((res)=>{
      if(res.data == 1000){
          this.props.getInputList({agent_id:agent_id}).then(()=>{
            this.props.form.setFieldsValue({statement_id: res.data.statement_id });
            this.setState({
              visibleTable:true,
              stateMentList:res.data
            })
          })
      }
      
    })
   
   
  }
  handleChangeSelect=(value)=>{
    console.log(value)
    this.setState({
      visibleTable:true,
      statement_id:value
    })
  }
  handleClickTotal=(value)=>{
    this.props.importSummary(value).then((res)=>{
        this.setState({
          stateTotal:true,
          summaryList:res.data
        })
      })
    }
   
  
  render() {
    let { getFieldDecorator } = this.props.form;
    let { getToken,statementInputList} =this.props;
    let {stateMentList,summaryList} = this.state
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};
    const props = {
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
            stateTotal:true,
           summaryList:res.data
           });
					hide();
          message.success('上传成功！');
          
				}).catch(({ errorMsg }) => {
					hide();
					message.error(errorMsg || '当前导入文件已存在，请勿重复导入！')
				});
			}
		};
    return <div>
     <Form>
				<Row>
					
					<Col span={11}>
						<FormItem label='请选择关联三方对账单' {...formItemLayout}>
              {getFieldDecorator('statement_id', { initialValue:'',
              rules: [{ required: true, message: '请选择关联三方对账单' }],
             })(
								<Select
                style={{ width: '300px' }}
                onChange={this.handleChangeSelect}
              >
               <Option key={' '} >请选择</Option>
              {
                statementInputList.length>0?statementInputList.map((item)=>{
                  return   <Option key={item.statement_id} value={item.statement_id}>{item.statement_name}</Option>
                })
              :null}
              </Select>
							)}
						</FormItem>
					</Col>
					<Col span={13}>
						<FormItem label='' {...formItemLayout}>
              {getFieldDecorator('payment_status', { initialValue: [] ,
               rules: [{ required: true, message: '请选择要上传的三方对账单' }],
              })(
                <NewUpload
                tok={getToken}
                uploadUrl="/api/common-file/file/v1/uploadPubBucket"
                len={1}
                size={50}
                listType="text"
                beforeUpload={this.beforeUpload}
                uploadText="请选择要上传的三方对账单"
                onChange={(file, originFile) =>{
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

				</Row>
          <Row>
          { 
            this.state.visibleTable?<div style={{height:'200px',marginTop:'20px'}}>
            <OptionTable stateMentList={stateMentList}/></div>
            :<div style={{height:'200px'}}></div>
          }
       </Row>
          
        <Row style={{marginTop:'20px'}}>
        <Col span={11}>
						<FormItem label='' {...formItemLayout}>
              {getFieldDecorator('payment_status_1', { initialValue: [],
               rules: [{ required: true, message: '请选择要上传的汇总单' }],
            })(
              <Upload {...props}>
              <Button type="primary" >
                <Icon type="upload" />请选择要上传的汇总单
              </Button>
            </Upload>
							)}
						</FormItem>
					</Col>
        </Row>
        {
        this.state.stateTotal?<div style={{height:'200px',marginTop:'20px'}}>
        <TotalTable summaryList={summaryList}/></div>:<div style={{height:'200px'}}>
        </div>
      }
        <Row>
        <Col span={10}></Col>
        <Col span={6}>
        
            <Button style={{marginRight:'20px'}}>取消</Button>
            <Popconfirm title="确认后将改变订单的对账状态，是否确认此操作？" onConfirm={this.handleSearch} okText="确定" cancelText="取消">
              <Button type="primary" className='left-gap'
               disabled={!(stateMentList.total_pay_amount ==summaryList.total_pay_amount )}>确认对账</Button>
            </Popconfirm>
          
					</Col>
          <Col span={8}></Col>
        </Row>
			</Form>
     
     
    </div>;
  }
}
export default Form.create()(withRouter(ListQuery));


// 对账单
export class OptionTable extends Component{
  state={

  }
  render(){
    let {stateMentList}= this.props
    return <div className='statementBox'>
      <Row className='title'>对账单信息</Row>
      <Row className='info'>
        <Col span={12}>
        三方对账单总数:{stateMentList.total_statement}
        </Col>
        <Col span={12}>
        扣减订单:{stateMentList. deduction_order_count}
        </Col>
      </Row>

      <Row className='info'>
        <Col span={12}>
        总金额(元):{stateMentList.total_pay_amount }
        </Col>
        <Col span={12}>
        扣减总金额(元):{stateMentList.deduction_amount}
        </Col>
      </Row>

      <Row className='info'>
        <Col span={12}>
        待付订单:{stateMentList.wait_pay_order}
        </Col>
        <Col span={12}>
        </Col>
      </Row>

       <Row className='info'>
        <Col span={12}>
        应付总金额(元):{stateMentList.total_pay_amount}
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
    let {summaryList}= this.props
    return <div className="statementBox">
      <Row className='title'>汇总单信息</Row>
      <Row className='info'>
        <Col span={12}>
        订单总数:{summaryList.total_order}
        </Col>
        <Col span={12}>
        总金额(元):{summaryList.total_pay_amount }
        </Col>
      </Row>

      <Row className='info'>
        <Col span={12}>
        待付订单:{summaryList.wait_pay_order}
        </Col>
        <Col span={12}>
        应付总金额(元):{summaryList.total_pay_amount}
        </Col>
      </Row>

      <Row className='info'>
        <Col span={12}>
        扣减订单:{summaryList. deduction_order_count}
        </Col>
        <Col span={12}>
        扣减总金额(元):{summaryList.deduction_amount} 
        </Col>
      </Row>

    </div>
  }
}
