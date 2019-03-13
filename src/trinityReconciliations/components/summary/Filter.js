import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, DatePicker, message, Icon, Input } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const dataFormat = 'YYYY-MM-DD'
const {  RangePicker } = DatePicker;

class SummaryFilter extends Component {
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
				<Row>
					<Col span={9}>
						<FormItem label='生成时间' {...formItemLayout}>
						{getFieldDecorator('created_at_start')(
						<DatePicker format={dataFormat} placeholder='开始日期' style={{ width: 150 }} />
					)}
					~
						{getFieldDecorator('created_at_end')(
						<DatePicker format={dataFormat} placeholder='结束日期' style={{ width: 150 }} />
					)}
						</FormItem>
					</Col>
				
					<Col span={8} style={{textAlign:'left'}}>
						<FormItem label='汇总单编号' {...formItemLayout}>
            {getFieldDecorator('ttp_place_order_at_start')(
						<Input style={{ width: 150 }} />
					)}
						</FormItem>
					</Col>
          <Col span={4} style={{textAlign:'left'}}>
						<FormItem>
              <Button type="primary" onClick={this.handleSearch} >搜索</Button>
						</FormItem>
            </Col>
				</Row>
			</Form>
    </div>;
  }
}
export default Form.create()(SummaryFilter);
