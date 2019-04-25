import React from 'react'
import { Row, Form, Select, Input, Button, DatePicker, message } from 'antd'
import SearchSelect from '../components/searchSelect'
import qs from 'qs'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const dateFormat = 'YYYY-MM-DD HH:mm:ss'
class ListQuery extends React.Component {
  constructor() {
    super();
    this.state = {}
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
    const settle_id = keys.spotplan_id || keys.po_code;
    if (keys.created_at) {
      keys['created_at'] = [moment(keys.created_at[0], dateFormat), moment(keys.created_at[1], dateFormat)]
    }
    if (settle_id) {
      keys['settle_id'] = settle_id.join(' ');
      delete keys['spotplan_id']
      delete keys['po_code']
    }
    setFieldsValue({ ...keys, ...obj });
  }
  handleReset = () => {
    this.props.form.resetFields();
  }
  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const keys = {}, labels = {};
        for (let key in values) {
          if (Object.prototype.toString.call(values[key]) === '[object Object]') {
            keys[key] = values[key].key;
            labels[key] = values[key].label;
          } else if (key == 'settle_id' && values[key]) {
            const array = values[key].trim().split(' ').reduce((data, current) => {
              return current ? [...data, current] : [...data]
            }, []);
            if (array.length > 200) {
              message.error('最多能输入200个订单', 3);
              return
            }
            values['settle_type'].key == 1 ? keys['spotplan_id'] = array : keys['po_code'] = array;
          } else if (key == 'created_at' && values[key] && values[key].length > 0) {
            keys[key] = [values[key][0].format(dateFormat), values[key][1].format(dateFormat)]
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
        this.props.queryData({ ...params.keys }).then(() => {
          this.props.history.replace({
            pathname: this.props.location.pathname,
            search: `?${qs.stringify(params)}`,
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
    const { spotplan_project, spotplan_brand, spotplan_creatorList } = this.props;
    return <Form className='spotplan-list-form'>
      <Row>
        <FormItem label='批量查询'>
          {getFieldDecorator('settle_type', {
            initialValue: { key: 1, label: 'spotplan ID' }
          })(
            <Select style={{ width: 120 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-list-form')}
              labelInValue
            >
              <Option value={1} key={1}>spotplan ID</Option>
              <Option value={2} key={2}>PO 单号</Option>
            </Select>
          )}
          {getFieldDecorator('settle_id')(
            <Input placeholder='请输入spotplan ID / PO 单号，多个空格隔开' className='left-little-gap' style={{ width: 280 }} allowClear />
          )}
        </FormItem>
        <FormItem label='Spotplan名称'>
          {getFieldDecorator('spotplan_name')(
            <Input placeholder='请输入spotplan名称' style={{ width: 240 }} allowClear />
          )}
        </FormItem>
        <FormItem label='所属项目'>
          {getFieldDecorator('project_id')(
            <SearchSelect
              className="multipleSelect"
              placeholder='请选择'
              mode='multiple'
              getPopupContainer={() => document.querySelector('.spotplan-list-form')}
              action={this.props.getProject}
              keyWord='name'
              dataToList={res => { return res.data }}
              item={['id', 'name']}
            />
          )}
        </FormItem>
      </Row>
      <Row>
        <FormItem label='所属品牌'>
          {getFieldDecorator('brand_id')(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-list-form')}
              labelInValue
              allowClear
              showSearch
              filterOption={(input, option) => (
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
            >
              {spotplan_brand && spotplan_brand.map(item => (<Option value={item.id} key={item.id}>{item.view_name}</Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem label='创建人'>
          {getFieldDecorator('creator_id')(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-list-form')}
              labelInValue
              allowClear
              showSearch
              filterOption={(input, option) => (
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              )}
            >
              {spotplan_creatorList && spotplan_creatorList.map(item => (<Option value={item.creator_id} key={item.creator_id}>{item.creator_name}</Option>))}
            </Select>
          )}
        </FormItem>
        <FormItem label='创建时间'>
          {getFieldDecorator('created_at')(
            <RangePicker showTime style={{ width: 320 }} format={dateFormat} />
          )}
        </FormItem>
        <FormItem label='是否存在更新请求被拒订单'>
          {getFieldDecorator('is_refused')(
            <Select style={{ width: 140 }}
              placeholder='请选择'
              getPopupContainer={() => document.querySelector('.spotplan-list-form')}
              labelInValue
            >
              <Option value={1}>是</Option>
              <Option value={2}>否</Option>
            </Select>
          )}
        </FormItem>
        <Button className='left-gap' onClick={this.handleReset}>重置</Button>
        <Button className='left-gap' type='primary' onClick={this.handleSearch}>搜索</Button>
      </Row>
    </Form>
  }
}
export default Form.create()(ListQuery)
