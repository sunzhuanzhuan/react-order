/**
 * 列表筛选组件, 包括tab和筛选表单
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState } from 'react';
import {
  Button, Row, Col, Form,
  Input, Tabs, Select, DatePicker, InputNumber
} from "antd";
import { platformTypes } from "../../constants/config";
import { useHistory } from 'react-router-dom'
import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker


const FilterForm = (props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Row className="flex-form-layout">
      <Col span={4}>
        <Form.Item label="线索ID">
          {getFieldDecorator('id', {})(
            <InputNumber placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      {props.active == 9 ? <Col span={4}>
        <Form.Item label="客户名称">
          {getFieldDecorator('createdName', {
            rules: [{
              validator: (rule, value, callback) => {
                let regEx = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
                if (!regEx.test(value)) {
                  callback('只能支持英文中文和数字')
                } else {
                  callback()
                }
              }
            }]
          })(
            <Input placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col> :
        <Col span={4}>
          <Form.Item label="任务类型">
            {getFieldDecorator('extensionType', {})(
              <Select placeholder="请选择" allowClear>
                <Option value="4">图文</Option>
                <Option value="3">图文+视频</Option>
              </Select>
            )}
          </Form.Item>
        </Col>}
      <Col span={4}>
        <Form.Item label="线索状态">
          {getFieldDecorator('clueState', {})(
            <Select placeholder="请选择" allowClear>
              <Option value="1">未处理</Option>
              <Option value="2">已处理</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="线索提交时间">
          {getFieldDecorator('createdAtBegin')(
            <DatePicker format="YYYY-MM-DD HH:mm:ss"
              showTime={{
                defaultValue: moment('00:00:00', 'HH:mm:ss')
              }} placeholder='开始日期' />
          )}
          ~
						{getFieldDecorator('createdAtEnd')(
            <DatePicker format="YYYY-MM-DD HH:mm:ss"
              showTime={{
                defaultValue: moment("23:59:59", 'HH:mm:ss')
              }} placeholder='结束日期' />
          )}
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="任务创建时间">
          {getFieldDecorator('extensionStartTimeBegin')(
            <DatePicker format="YYYY-MM-DD HH:mm:ss"
              showTime={{
                defaultValue: moment('00:00:00', 'HH:mm:ss')
              }} placeholder='开始日期' />
          )}
          ~
						{getFieldDecorator('extensionStartTimeEnd')(
            <DatePicker format="YYYY-MM-DD HH:mm:ss"
              showTime={{
                defaultValue: moment("23:59:59", 'HH:mm:ss')
              }} placeholder='结束日期' />
          )}
        </Form.Item>
      </Col>
      <Col span={3}>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>查询</Button>
          <Button type="primary" ghost onClick={() => props.form.resetFields()}>重置</Button>
        </Form.Item>
      </Col>
    </Row>
  );
}

const Filters = (props) => {
  const [active, setActive] = useState(platformTypes[0].id)
  const history = useHistory()
  useEffect(() => {
    submit()
  }, [active])

  const tabChange = (key) => {
    props.form.resetFields()
    setActive(key)
  }

  const submit = e => {
    e && e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        for (let key in values) {
          if (values[key] == '') {
            values[key] = undefined
          }

        }
        console.log(values, '_____');
        if (values.createdAtBegin) {
          values.createdAtBegin = moment(values.createdAtBegin)._d
        }
        if (values.createdAtEnd) {
          values.createdAtEnd = moment(values.createdAtEnd)._d
        }
        if (values.extensionStartTime) {
          values.extensionStartTime = moment(values.extensionStartTime)._d
        }
        if (values.extensionEndTime) {
          values.extensionEndTime = moment(values.extensionEndTime)._d
        }
        let filter = {
          page: { currentPage: 1 },
          form: { ...values, platformId: active }
        }

        props.search(filter)
      }
    });
  };

  return (
    <Form className="page-filter" onSubmit={submit} layout="inline">
      <Tabs activeKey={active} onChange={tabChange} animated={false}>
        {
          platformTypes.map(pane => (
            <TabPane key={pane.id} tab={
              <span>
                {pane.title}
              </span>} />
          ))
        }
      </Tabs>
      <FilterForm
        form={props.form}
        active={active}
        key={"filter-" + active}
      />
    </Form>
  );
};

export default Form.create()(Filters);
