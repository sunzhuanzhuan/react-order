import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, DatePicker, message, Icon, Input } from "antd";
import qs from 'qs';
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
				let keys = {}, labels = {};
				for (let key in values) {
					if (Object.prototype.toString.call(values[key]) === '[object Object]') {
						if (values[key].key) {
							keys[key] = values[key].key;
							labels[key] = values[key].label;
						}
					} else {
						keys[key] = values[key]
					}
				}
				
				let params = {
					keys: { ...keys },
					labels: { ...labels }
				};
				Object.keys(params['keys']).forEach(item => { !params['keys'][item] && params['keys'][item] !== 0 ? delete params['keys'][item] : null });
				
        const hide = message.loading('查询中，请稍候...');
        this.props.history.replace({
          pathname: '/order/trinity/reconciliations/exportOrder',
          search: `?${qs.stringify(params)}`,
        })
        handlefilterParams(...params.keys);
				questAction({ ...params.keys, page: 1, page_size }).then(() => {
          handlefilterParams(...params.keys);
          this.props.history.replace({
						pathname: '/order/trinity/reconciliations/exportOrder',
						search: `?${qs.stringify(params)}`,
					})
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
					<Col span={4}>
						<FormItem label='订单号' {...formItemLayout}>
							{getFieldDecorator('order_id')(
					<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<FormItem label="账号名称" {...formItemLayout} >
							{getFieldDecorator('weibo_name')(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={8} style={{textAlign:'left'}}>
						<FormItem label='下单价' {...formItemLayout}>
						{getFieldDecorator('public_order_price_start')(
						<Input style={{ width: 150 }} />
					)}
					~
						{getFieldDecorator('public_order_price_end')(
						<Input style={{ width: 150 }} />
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
					</Row>
					<Row type="flex" justify="space-between">
					
					
					<Col span={4}>
						<FormItem label='三方订单号' {...formItemLayout}>
							{getFieldDecorator('public_order_id', { initialValue: '' })(
								<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={10}>
						<FormItem label='对账状态' {...formItemLayout}>
							{getFieldDecorator('public_order_id_1', { initialValue: ['1', '2'] })(
								<Select
                mode="multiple"
                style={{ width: '300px' }}
              >
               <Option key={'1'} >未对账</Option>
               <Option key={'2'}>对账完成</Option>
               <Option key={'3'}>部分对账</Option>
              </Select>
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<FormItem label='打款状态' {...formItemLayout}>
							{getFieldDecorator('payment_status', { initialValue: '' })(
								<Select
              >
               <Option key={'1'} >打款成功</Option>
               <Option key={'2'}>打款失败</Option>
               <Option key={'3'}>未打款</Option>
               <Option key={'4'}>打款撤销</Option>
              </Select>
							)}
						</FormItem>
					</Col>
          <Col span={3}>
						<Button type="primary" className='left-gap' onClick={this.handleSearch}>查询</Button>
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
