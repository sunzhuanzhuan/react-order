/**
 * 列表筛选组件, 包括tab和筛选表单
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState } from 'react';
import {
  Button, Row, Col, Form,
  Input, Tabs, Select, DatePicker
} from "antd";
import { cluePlatformTypes } from "../../constants/config";
import moment from 'moment';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker


const FilterForm = (props) => {
  const { getFieldDecorator } = props.form;
  return (
    <Row className="flex-form-layout">
      <Col span={4}>
        <Form.Item label="任务名称">
          {getFieldDecorator('snsName', {})(
            <Input placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item label="线索ID">
          {getFieldDecorator('isFa33mous', {})(
            <Input placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item label="客户名称">
          {getFieldDecorator('isFamous', {})(
            <Input placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      <Col span={4}>
        <Form.Item label="线索状态">
          {getFieldDecorator('isFamou22s', {})(
            <Select placeholder="请选择" allowClear>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      {props.active == 1 ? <Col span={4}>
        <Form.Item label="任务类型">
          {getFieldDecorator('isFamous2', {})(
            <Select placeholder="请选择" allowClear>
              <Option value="1">是</Option>
              <Option value="2">否</Option>
            </Select>
          )}
        </Form.Item>
      </Col> : <Col span={4}>
          <Form.Item label="任务模式">
            {getFieldDecorator('isFamous2', {})(
              <Select placeholder="请选择" allowClear>
                <Option value="1">是</Option>
                <Option value="2">否</Option>
              </Select>
            )}
          </Form.Item>
        </Col>}

      <Col span={9}>
        <Form.Item label="任务创建时间">
          {getFieldDecorator('platformId', {})(
            <RangePicker
              format="YYYY-MM-DD HH:mm"
              showTime={{
                format: "mm:ss",
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
              }}
              style={{ width: '100%' }}
            />
          )}
        </Form.Item>
      </Col>

      <Col span={9}>
        <Form.Item label="线索开始时间">
          {getFieldDecorator('platformId', {})(
            <RangePicker
              format="YYYY-MM-DD HH:mm"
              showTime={{
                format: "mm:ss",
                defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
              }}
              style={{ width: '100%' }}
            />
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
  const [active, setActive] = useState('1')
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
        let filter = Object.assign({ pageNum: 1, active }, values)
        props.search(filter)
      }
    });
  };

  return (
    <Form className="page-filter" onSubmit={submit} layout="inline">
      <Tabs activeKey={active} onChange={tabChange} animated={false}>
        {
          cluePlatformTypes.map(pane => (
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
