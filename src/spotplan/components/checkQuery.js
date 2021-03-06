import React from 'react'
import { Row, Form, Select, Input, Button, message } from 'antd'
import SearchSelect from './searchSelect'
import qs from 'qs'

const FormItem = Form.Item;
const Option = Select.Option;
class CheckQuery extends React.Component {
  constructor() {
    super();
    this.state = {
      resetFlag: false
    }
  }
  componentDidMount() {
    const search = qs.parse(this.props.location.search.substring(1));
    const { setFieldsValue } = this.props.form;
    const obj = {};
    const keys = search.keys || {};
    const labels = search.labels ? Object.keys(search.labels) : [];

    labels.length > 0 ? labels.forEach(item => {
      obj[item] = { key: search.keys[item], label: search.labels[item] }
    }) : null;
    const settle_id = keys.order_id || keys.po_code;
    if (keys.weibo_name) {
      keys['weibo_name'] = keys['weibo_name'].join(' ');
    }
    if (keys.platform_id || keys.project_id) {
      delete keys.platform_id;
      delete keys.project_id;
    }
    if (settle_id) {
      keys['settle_id'] = settle_id.join(' ');
      delete keys['order_id']
      delete keys['requirement_id']
    }
    setFieldsValue({ ...keys, ...obj });
  }
  handleReset = () => {
    this.setState({ resetFlag: true });
    this.props.form.resetFields();
  }
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const search = qs.parse(this.props.location.search.substring(1));
        const keys = {}, labels = {};
        for (let key in values) {
          if (Object.prototype.toString.call(values[key]) === '[object Object]') {
            keys[key] = values[key].key;
            labels[key] = values[key].label;
          } else if (key == 'settle_id' && values[key]) {
            const array = values[key].trim().split(' ').reduce((data, current) => {
              return current ? [...data, current] : [...data]
            }, []);
            const ary = array.reduce((data, current) => {
              const flag = /^[0-9]+$/.test(current);
              return flag ? [...data, current] : [...data]
            }, []);
            if (array.length > 200) {
              message.error('最多能输入200个订单', 3);
              return
            }
            values['settle_type'].key == 1 ? keys['order_id'] = ary : keys['requirement_id'] = ary;
          } else if (key == 'weibo_name' && values[key]) {
            const array = values[key].trim().split(' ').reduce((data, current) => {
              return current ? [...data, current] : [...data]
            }, []);
            keys['weibo_name'] = array
          } else if (key == 'project_id' && values[key]) {
            if (typeof values[key] == 'string') {
              keys[key] = [values[key]]
            } else {
              keys[key] = values[key]
            }
          } else {
            keys[key] = values[key]
          }
        }
        const params = {
          keys: { ...keys },
          labels: { ...labels }
        };
        Object.keys(params['keys']).forEach(item => { !params['keys'][item] && params['keys'][item] !== 0 ? delete params['keys'][item] : null });
        const hide = message.loading('查询中，请稍候...');
        this.props.queryData(2, { spotplan_id: search.spotplan_id, ...params.keys }).then(() => {
          this.props.history.replace({
            pathname: this.props.location.pathname,
            search: `?${qs.stringify({ step: 2, item_type: 2, spotplan_id: search.spotplan_id, ...params })}`,
          })
          hide();
        }).catch(({ errorMsg }) => {
          message.error(errorMsg || '查询失败');
          hide();
        });
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { customer_status, reservation_status, spotplan_executor, spotplan_platform, spotplan_project, project_id, project_name } = this.props;
    return <Form className='spotplan-check-form'>
      <Row>
        <FormItem label='批量查询'>
          {getFieldDecorator('settle_type', {
            initialValue: { key: 1, label: '订单ID' }
          })(
            <Select style={{ width: 100 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              labelInValue
            >
              <Option value={1} key={1}>订单ID</Option>
              <Option value={2} key={2}>需求ID</Option>
            </Select>
          )}
          {getFieldDecorator('settle_id')(
            <Input placeholder='请输入订单ID/需求ID，多个空格隔开' className='left-little-gap' style={{ width: 260 }} allowClear />
          )}
        </FormItem>
        <FormItem label='执行人'>
          {getFieldDecorator('executor_admin_id')(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              labelInValue
              allowClear
              showSearch
              filterOption={(input, option) => (
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
            >
              {spotplan_executor && spotplan_executor.map(item => (<Option value={item.owner_admin_id} key={item.owner_admin_id}>{item.real_name}</Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem label='平台'>
          {getFieldDecorator('platform_id')(
            <Select className="multipleSelect"
              placeholder='请选择'
              mode='multiple'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              allowClear
              showSearch
              filterOption={(input, option) => (
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
            >
              {spotplan_platform && spotplan_platform.map(item => (<Option value={item.platform_id} key={item.platform_id}>{item.platform_name}</Option>))}
            </Select>
          )}
        </FormItem>
      </Row>
      <Row>
        <FormItem label='账号名称'>
          {getFieldDecorator('weibo_name')(
            <Input placeholder='请输入账号名称，多个以空格隔开' style={{ width: 240 }} allowClear />
          )}
        </FormItem>
        <FormItem label='需求名称'>
          {getFieldDecorator('requirement_name')(
            <Input placeholder='请输入需求名称' style={{ width: 160 }} allowClear />
          )}
        </FormItem>
        {project_name && <FormItem label='所属项目'>
          {getFieldDecorator('project_id', {
            initialValue: project_id ? `${project_id}` : []
          })(
            <SearchSelect
              className="multipleSelect"
              placeholder='请选择'
              mode='multiple'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              action={this.props.getProject}
              keyWord='name'
              dataToList={res => { return res.data }}
              item={['id', 'name']}
              project_name={project_name}
              resetFlag={this.state.resetFlag}
              resetAction={() => { this.setState({ resetFlag: false }) }}
            />
          )}
        </FormItem>}
      </Row>
      <Row>
        <FormItem label='订单预约状态'>
          {getFieldDecorator('reservation_status', {
            initialValue: { key: 2, label: '应约' }
          })(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              labelInValue
              allowClear
              showSearch
              filterOption={(input, option) => (
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
            >
              {reservation_status && reservation_status.map(item => (<Option value={item.value} key={item.value}>{item.key}</Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem label='客户确认状态'>
          {getFieldDecorator('customer_confirmation_status')(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-check-form')}
              labelInValue
              allowClear
              showSearch
              filterOption={(input, option) => (
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
            >
              {customer_status && customer_status.map(item => (<Option value={item.value} key={item.value}>{item.key}</Option>))}
            </Select>
          )}
        </FormItem>
        <Button className='left-gap' onClick={this.handleReset}>重置</Button>
        <Button className='left-gap' type='primary' onClick={this.handleSearch}>查询</Button>
      </Row>
    </Form>
  }
}
export default Form.create()(CheckQuery)
