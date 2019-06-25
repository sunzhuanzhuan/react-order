import React, { Component } from 'react';
import { Row, Col, Form, Button, DatePicker, message, Icon, Input } from "antd";
import qs from 'qs';
const FormItem = Form.Item;

const dataFormat = 'YYYY-MM-DD'

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
        // this.props.history.replace({
        //   pathname: '/order/trinity/reconciliations/exportOrder',
        //   search: `?${qs.stringify(params)}`,
        // })
        // handlefilterParams(...params.keys);
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

  componentDidMount=()=> {
    this.props.onRef(this)
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
