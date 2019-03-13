import React, { Component } from 'react';
import { Row, Col, Form, Radio, Input,Button } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;


class ListQuery extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    
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
							{getFieldDecorator('summary_sheet_name',{
                rules:[{required:true,message:'请输入回票方式'}]
              })(
                <RadioGroup onChange={this.onChange} value={this.state.value}>
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
            {getFieldDecorator('ttp_place_order_at_start',{
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
						<FormItem>
             <Button onClick={this.handleSearch}>取消</Button>
             <Button type="primary" htmlType="submit" style={{marginLeft:'20px'}} onClick={this.handleSearch}>确认申请</Button>
						</FormItem>
					</Col>
          <Col span={7}></Col>
          </Row>
          
			</Form>
    </div>;
  }
}
export default Form.create()(ListQuery);
