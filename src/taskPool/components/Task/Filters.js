/**
 * 列表筛选组件, 包括tab和筛选表单
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState } from 'react';
import {
  Button, Row, Col, Form,
  Input, Tabs, Select, DatePicker
} from "antd";
import {
  AD_ORDER_STATE_END,
  AD_ORDER_STATE_EXPIRY,
  AD_ORDER_STATE_FINISH,
  AD_ORDER_STATE_OFFLINE,
  AD_ORDER_STATE_PROCESSING,
  AD_ORDER_STATE_UNPAID,
  AD_ORDER_STATE_WAIT_RELEASED, MEDIA_TASK_PATTERN_BIDDING, MEDIA_TASK_PATTERN_RUSH,
  platformTypes
} from "../../constants/config";
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom'

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
        {props.active === "9" && <Form.Item label="任务类型">
          {getFieldDecorator('taskPattern', {})(
            <Select placeholder="请选择" allowClear>
              <Option value={MEDIA_TASK_PATTERN_RUSH}>抢单</Option>
              <Option value={MEDIA_TASK_PATTERN_BIDDING}>竞标</Option>
            </Select>
          )}
        </Form.Item>}
        {props.active === "1000" && <Form.Item label="内容类型">
          {getFieldDecorator('mediaType', {})(
            <Select placeholder="请选择" allowClear>
              <Option value={4}>图文</Option>
              <Option value={3}>图文 + 视频</Option>
            </Select>
          )}
        </Form.Item>}
      </Col>
      <Col span={5}>
        <Form.Item label="创建人">
          {getFieldDecorator('createName', {})(
            <Input placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label="任务名称">
          {getFieldDecorator('orderName', {})(
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
          {getFieldDecorator('orderState', {})(
            <Select placeholder="请选择" allowClear>
              <Option value={AD_ORDER_STATE_WAIT_RELEASED}>待发布</Option>
              <Option value={AD_ORDER_STATE_PROCESSING}>进行中</Option>
              <Option value={AD_ORDER_STATE_OFFLINE}>已下线</Option>
              <Option value={AD_ORDER_STATE_FINISH}>已结束</Option>
              <Option value={AD_ORDER_STATE_EXPIRY}>已过期</Option>
              <Option value={AD_ORDER_STATE_END}>已终止</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={5}>
        <Form.Item label="任务ID">
          {getFieldDecorator('adOrderNumber', {})(
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
  const history = useHistory()
  let { active } = useParams()
  if(!platformTypes.map(item => item.id).includes(active)){
    active = platformTypes[0].id
  }

  useEffect(() => {
    submit()
  }, [ active ])

  const tabChange = (key) => {
    props.form.resetFields()
    history.push('/order/task/tasks-manage/' + key)
  }

  const submit = e => {
    e && e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let allValue = { ...values }
        if (values.createdAt) {
          allValue.createdAtBegin = values.createdAt[0]
          allValue.createdAtEnd = values.createdAt[1]
          delete allValue.createdAt
        }else {
          allValue.createdAtBegin = undefined
          allValue.createdAtEnd = undefined
        }
        if (values.startAt) {
          allValue.orderStartDateBegin = values.startAt[0]
          allValue.orderStartDateEnd = values.startAt[1]
          delete allValue.startAt
        }else {
          allValue.orderStartDateBegin = undefined
          allValue.orderStartDateEnd = undefined
        }
        allValue.taskPattern = values.taskPattern
        allValue.mediaType = values.mediaType

        let filter = {
          page: { currentPage: 1 },
          form: { ...allValue, platformId: active }
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
        active={active}
      />
    </Form>
  );
};

export default Form.create()(Filters);
