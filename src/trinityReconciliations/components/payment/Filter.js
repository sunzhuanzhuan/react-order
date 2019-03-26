import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, DatePicker, message, Icon, Input } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;
const dataFormat = 'YYYY-MM-DD'


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
				let params =  { ...values };
				const hide = message.loading('查询中，请稍候...');
				questAction({ ...params, page: 1, page_size }).then(() => {
					handlefilterParams({...params});
					hide();
				}).catch(() => {
					message.error('查询失败');
					hide();
				});
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
					<Col span={5}>
						<FormItem label='汇总单名称' {...formItemLayout}>
							{getFieldDecorator('summary_sheet_name')(
					<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
				
					<Col span={8} style={{textAlign:'left'}}>
						<FormItem label='生成时间' {...formItemLayout}>
            {getFieldDecorator('ttp_place_order_at_start')(
						<DatePicker format={dataFormat} placeholder='开始日期' style={{ width: 150 }} />
					)}
					~
						{getFieldDecorator('ttp_place_order_at_end')(
						<DatePicker format={dataFormat} placeholder='结束日期' style={{ width: 150 }} />
					)}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='下单时间' {...formItemLayout}>
            {getFieldDecorator('ttp_place_order_at_start')(
						<DatePicker format={dataFormat} placeholder='开始日期' style={{ width: 150 }} />
					)}
					~
						{getFieldDecorator('ttp_place_order_at_end')(
						<DatePicker format={dataFormat} placeholder='结束日期' style={{ width: 150 }} />
					)}
						</FormItem>
					</Col>
          <Col span={3}>
						<Button type="primary" htmlType="submit" className='left-gap' onClick={this.handleSearch}>查询</Button>
						{/* <Button style={{ marginLeft: '20px' }} className='left-gap' type="primary" onClick={() => {
							this.props.form.resetFields()
						}}>重置</Button> */}
					</Col>
				
          
				</Row>
			</Form>
    </div>;
  }
}
export default Form.create()(ListQuery);
