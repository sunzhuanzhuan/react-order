/**
 * 列表筛选组件, 包括tab和筛选表单
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState } from 'react';
import {
  Button, Row, Col, Form,
  Input, Tabs, Select, DatePicker
} from "antd";
import { platformTypes } from "../../constants/config";
import moment from 'moment';
import { useHistory } from 'react-router-dom'

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker


const FilterForm = (props) => {

  const { getFieldDecorator } = props.form;
  return (
    <Row className="flex-form-layout">
      <Col span={9}>
        <Form.Item label="任务创建时间">
          {getFieldDecorator('createdAt', {})(
            <RangePicker
              format="YYYY-MM-DD HH:mm"
              showTime={{
                format: "mm:ss",
                defaultValue: [ moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss') ]
              }}
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label="任务类型">
          {getFieldDecorator('isFamous2', {})(
            <Select placeholder="请选择" allowClear>
              <Option value="1">抢单</Option>
              <Option value="2">竞标</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label="创建人">
          {getFieldDecorator('isFamous', {})(
            <Input placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label="任务名称">
          {getFieldDecorator('snsName', {})(
            <Input placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      <Col span={9}>
        <Form.Item label="任务开始时间">
          {getFieldDecorator('startAt', {})(
            <RangePicker
              format="YYYY-MM-DD HH:mm"
              showTime={{
                format: "mm:ss",
                defaultValue: [ moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss') ]
              }}
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label="任务状态">
          {getFieldDecorator('type', {})(
            <Select placeholder="请选择" allowClear>
              <Option value="1">待发布</Option>
              <Option value="2">进行中</Option>
              <Option value="3">已下线</Option>
              <Option value="4">已结束</Option>
              <Option value="5">已过期</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label="任务ID">
          {getFieldDecorator('id', {})(
            <Input placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>查询</Button>
          <Button type="primary" ghost onClick={() => props.form.resetFields()}>重置</Button>
        </Form.Item>
      </Col>
    </Row>
  );
}

const Filters = (props) => {
  const [ active, setActive ] = useState(platformTypes[0].id)
  const history = useHistory()

  useEffect(() => {
    submit()
  }, [ active ])

  const tabChange = (key) => {
    props.form.resetFields()
    setActive(key)
  }

  const submit = e => {
    e && e.preventDefault();
    props.form.validateFields((err, values) => {
      console.log(values, '_____');
      if (!err) {
        let filter = {
          page: { currentPage: 1 },
          form: { ...values, active }
        }
        props.search(filter)
      }
    });
  };

  return (
    <Form className="page-filter" onSubmit={submit} layout="inline">
      <Tabs activeKey={active} onChange={tabChange} animated={false} tabBarExtraContent={
        <Button type="primary" icon="plus" onClick={() => {
          history.push(`/order/task/tasks-create?platform=${active}`)
        }}>
          创建新任务
        </Button>
      }>
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
        key={"filter-" + active}
      />
    </Form>
  );
};

export default Form.create()(Filters);
