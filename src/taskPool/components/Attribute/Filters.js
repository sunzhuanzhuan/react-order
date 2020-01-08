/**
 * tab 1 列表筛选组件
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState } from 'react';
import {
  Button, Row, Col, Form,
  Input, Tabs, Select, DatePicker, InputNumber
} from "antd";
import { platformTypes } from "../../constants/config";
import moment from 'moment';
import { useHistory } from 'react-router-dom'

const { Option } = Select;


const FilterForm = (props) => {

  const { getFieldDecorator } = props.form;
  return (
    <Row className="flex-form-layout">
      <Col span={8}>
        <Form.Item label="行业名称">
          {getFieldDecorator('industryName', {})(
            <Input placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="经营内容">
          {getFieldDecorator('scopeName', {})(
            <Input placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="行业分类ID">
          {getFieldDecorator('id', {})(
            <InputNumber precision={0}  style={{width: "100%"}} placeholder="请输入" allowClear />
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="行业类型">
          {getFieldDecorator('industryLevel', {})(
            <Select placeholder="请选择" allowClear>
              <Option value="1">一级行业</Option>
              <Option value="2">二级行业</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="分类状态">
          {getFieldDecorator('isOnline', {})(
            <Select placeholder="请选择" allowClear>
              <Option value="1">上线</Option>
              <Option value="2">下线</Option>
            </Select>
          )}
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item>
          <Button type="primary" ghost htmlType="submit" style={{ marginRight: 10 }}>查询</Button>
          <Button type="primary" ghost style={{ marginRight: 10 }} onClick={() => props.form.resetFields()}>重置</Button>
        </Form.Item>
      </Col>
    </Row>
  );
}

const Filters = (props) => {
  useEffect(() => {
    submit()
  }, [ ])


  const submit = e => {
    e && e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let filter = {
          page: { currentPage: 1 },
          form: values
        }
        props.search(filter)
      }
    });
  };

  return (
    <Form className="page-filter" onSubmit={submit} layout="inline">
      <FilterForm form={props.form} />
    </Form>
  );
};

export default Form.create()(Filters);
