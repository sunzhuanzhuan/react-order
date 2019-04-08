import React, { Component } from 'react';
import { Row, Col, Form, Select, Button, DatePicker, message, Spin, Input } from "antd";
import qs from 'qs';
const FormItem = Form.Item;
const Option = Select.Option;
const dataFormat = 'YYYY-MM-DD'


class ListQuery extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fetching: false,
      typeValue:[]
    };
  }
  handleSearch = (e) => {
		const { questAction, page_size, handlefilterParams } = this.props;
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				// let keys = {}, labels = {};
				// for (let key in values) {
				// 	if (Object.prototype.toString.call(values[key]) === '[object Object]') {
				// 		if (values[key].key) {
				// 			keys[key] = values[key].key;
				// 			labels[key] = values[key].label;
				// 		}
				// 	} else {
				// 		keys[key] = values[key]
				// 	}
				// }
				
				// let params = {
				// 	keys: { ...keys },
				// 	labels: { ...labels }
				// };
				// Object.keys(params['keys']).forEach(item => { !params['keys'][item] && params['keys'][item] !== 0 ? delete params['keys'][item] : null });
				
        const hide = message.loading('查询中，请稍候...');
        // this.props.history.replace({
        //   pathname: '/order/trinity/reconciliations/exportOrder',
        //   search: `?${qs.stringify(params)}`,
        // })
        // handlefilterParams({...values});
				questAction({ ...values, page: 1, page_size }).then(() => {
          handlefilterParams({...values});
          // this.props.history.replace({
					// 	pathname: '/order/trinity/reconciliations/exportOrder',
					// 	search: `?${qs.stringify(params)}`,
					// })
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
  fetchUser = (value) => {
    this.setState({  fetching: true });
    this.props.search().then(() => {
        
        this.setState({fetching: false });
      });
  }
  componentWillMount() {}

  render() {
    let { getFieldDecorator } = this.props.form;
    let {fetching}=this.state;
    let {accountName:{list=[]}}=this.props;
    // console.log()
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};

    return <div>
     <Form>
				<Row>
					<Col span={4}>
						<FormItem label='订单号' {...formItemLayout}>
							{getFieldDecorator('wby_order_id')(
					<Input style={{ width: 140 }} />
							)}
						</FormItem>
					</Col>
					<Col span={4}>
						<FormItem label="账号名称" {...formItemLayout} >
							{getFieldDecorator('account_ids')(
								<Select
                mode="multiple"
                labelInValue
                placeholder="请搜索"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                filterOption={false}
                onSearch={this.fetchUser}
                onChange={this.handleChange}
                style={{ width: '200px' }}
              >
                {list.length>0?
                  list.map(d => <Option key={d.statement_id}>{d.statement_name}</Option>):null}
              </Select>
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
					
					
					<Col span={6}>
						<FormItem label='三方订单号' {...formItemLayout}>
							{getFieldDecorator('public_order_ids', { initialValue: '' })(
								<Input style={{ width: 240 }} />
							)}
						</FormItem>
					</Col>
					<Col span={8}>
						<FormItem label='对账状态' {...formItemLayout}>
							{getFieldDecorator('statement_status', { initialValue: ['1', '4'] })(
								<Select
                mode="multiple"
                style={{ width: '300px' }}
              >
               <Option key={'1'} >未对账</Option>
               <Option key={'3'}>对账完成</Option>
               <Option key={'4'}>部分对账</Option>
              </Select>
							)}
						</FormItem>
					</Col>
					<Col span={6}>
						<FormItem label='是否可扣减' {...formItemLayout}>
							{getFieldDecorator('is_can_deduction', { initialValue: ' ' })(
								<Select
              >
               <Option key={' '} >请选择</Option>
               <Option key={'1'}>是</Option>
               <Option key={'2'}>否</Option>
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
