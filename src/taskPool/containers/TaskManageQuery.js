import React from 'react'
import { Form, Input, Button, Select, InputNumber } from "antd";

const { Option } = Select;
const FormItem = Form.Item;

class TaskManageQuery extends React.Component {
	constructor() {
		super();
		this.state = {
		};
	}
	getSelectOption = (key, idKey, labelKey) => {
		const { queryOptions = {} } = this.props;

		if(!queryOptions[key] || !Array.isArray(queryOptions[key])) return null;
		return queryOptions[key].map(item => {
			return <Option key={item[idKey]} value={item[idKey]}>{item[labelKey]}</Option>
		})
	}
	getFormItem = item => {
		const { compType, optionKey, idKey, labelKey, showSearch } = item;
		switch(compType) {
			case 'input':
				return <Input placeholder="请输入" className='common_search_width' />;
			case 'select':
				return <Select 
						showSearch={showSearch}
						allowClear
						placeholder="请选择" 
						className='common_search_width'
						filterOption={(input, option) => (
							option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						)}
					>
							{ this.getSelectOption(optionKey, idKey, labelKey) }
					</Select>;
			case 'inputNumber':
				return <InputNumber placeholder="请输入" min={0} className='common_search_width' />;
			default:
				return <Input placeholder="请输入" className='common_search_width' />;
		}
	}
	getFormItemComp = queryItems => {
		const { form } = this.props;
		const { getFieldDecorator } = form;

		return queryItems.map(item => {
			const {label, compType, key} = item;
			if(compType === 'operate') {
				return (
					<FormItem key={key} className='operate-wrapper'>
						<Button type='primary' onClick={() => {this.handleSearch('search')}}>查询</Button>
						<Button type='ghost' onClick={() => {this.handleSearch('reset')}}>重置</Button>
					</FormItem>
				)
			}
				
			return (
				<FormItem key={key} label={label} >
					{getFieldDecorator(key)(
						this.getFormItem(item)
					)}
				</FormItem>
			)
		})
	}
	handleSearch = type => {
		const { form, handleSearch } = this.props;

		if(type === 'reset') {
			form.resetFields();
			handleSearch();
		}else if(type === 'search') {
			form.validateFields((errors, values) => {
				if(errors)
					return null;
				// Object.assign(values, {page: 1, page_size: 20});
				handleSearch(values);
			})
		}
	}

	getFormRowComp = () => {
		const { queryItems = [] } = this.props;
		return this.getFormItemComp(queryItems)
	}

	render() {
		return (
			<Form className='task-query-wrapper'>
				{this.getFormRowComp()}
			</Form>
		)
	}
}

export default Form.create()(TaskManageQuery)
