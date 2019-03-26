import React, { Component } from 'react';
import { Row, Col, Form, Radio, Input,Button,message} from "antd";
import ColumnGroup from 'antd/lib/table/ColumnGroup';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class ListQuery extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    
    };
  }
  handleSearch = (e) => {
		const { confirmApply, summary_sheet_id,queryData,filterParams,page_size} = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
       
        if(summary_sheet_id !=''){
          let params =  { summary_sheet_id:summary_sheet_id,...values };
            confirmApply({...params}).then((res)=>{
              if(res.code == 1000 ){
                queryData({...filterParams,page:1,page_size:page_size})
                this.props.handleSelectDetail({summary_sheet_id:''});
                this.props.form.resetFields();
                message.success('申请成功')
              }else{
                message.error('申请失败');
                this.props.handleSelectDetail({summary_sheet_id:''});
                this.props.form.resetFields();
              }
          })
        }else{
          message.error('请选择汇款单名称')
        }
        
			}
		});
	}
	handleClear = () => {
    this.props.form.resetFields();
    this.props.handleSelectDetail({summary_sheet_id:''})
  }
  

  componentWillMount() {}

  render() {
    let { getFieldDecorator } = this.props.form;
    
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};

    return <div>
     <Form>
				<Row style={{textAlign:'center'}}>
        <Col span={7}></Col>
        
					<Col span={10}>
						<FormItem label='回汇票方式' {...formItemLayout}>
							{getFieldDecorator('return_invoice_type',{
                rules:[{required:true,message:'请输入回票方式'}]
              })(
                <RadioGroup>
                  <Radio value={1}>全部回票</Radio>
                  <Radio value={2}>部分回票</Radio>
                  <Radio value={3}>不回票</Radio>
              </RadioGroup>
							)}
						</FormItem>
					</Col>
          <Col span={7}></Col>
					</Row>
          <Row style={{textAlign:'center'}}>
          <Col span={7}></Col>
          <Col span={10} style={{textAlign:'left'}}>
						<FormItem label='回票金额(元)' {...formItemLayout}>
            {getFieldDecorator('return_invoice_amount',{
               rules:[{required:true,message:'请输入回票金额'}]
            })(
				<Input style={{ width: 140 }} />
					)}
						</FormItem>
					</Col>
          <Col span={7}></Col>
          </Row>
          <Row style={{textAlign:'center'}}>
          <Col span={10}></Col>
          <Col span={7} style={{textAlign:'left'}}>
             <Button onClick={this.handleClear}>取消</Button>
             <Button type="primary" style={{marginLeft:'20px'}}
              onClick={this.handleSearch}>确认申请</Button>
					</Col>
          <Col span={7}></Col>
          </Row>
          
			</Form>
    </div>;
  }
}
export default Form.create()(ListQuery);
