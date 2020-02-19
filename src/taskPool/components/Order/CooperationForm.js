/*
 * @Descripttion:
 * @Author: wangxinyue
 * @Date: 2020-02-10 18:07:19
 */

import React from 'react';
import { Form, Input, DatePicker, Select, Button } from 'antd';
import moment from 'moment';
import { otherOrderStateList } from '../../constants/orderConfig';
import { getDataByFormat } from '@/taskPool/constants/utils.js';
import SelectSearch from '../Account/SelectSearch';
const { RangePicker } = DatePicker;
function CooperationForm(props) {
  const { resetPlatform, form } = props;
  const { getFieldDecorator, validateFields, resetFields } = form;
  //搜索
  function searchForm(e) {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        if (values.orderStartDate) {
          values.form.orderStartDateStart = getDataByFormat(values.orderStartDate[0]);
          values.form.orderStartDateEnd = getDataByFormat(values.orderStartDate[1]);
          delete values.orderStartDate;
        }
        if (values.orderEndDate) {
          values.form.orderEndDateStart = getDataByFormat(values.orderEndDate[0]);
          values.form.orderEndDateEnd = getDataByFormat(values.orderEndDate[1]);
          delete values.orderEndDate;
        }
        if (values.salesman) {
          values.form.salesmanId = values.salesman.key;
          delete values.salesman;
        }
        props.searchAction(values);
      }
    });
  }
  return (
    <Form layout="inline">
      <Form.Item label="任务名称">
        {getFieldDecorator('form.adOrderName', {
          //rules: [{ required: true, message: 'Please input your username!' }],
        })(<Input placeholder="请输入" />)}
      </Form.Item>
      <Form.Item label="任务ID">
        {getFieldDecorator('form.adOrderNumber', {})(<Input placeholder="请输入" />)}
      </Form.Item>
      <Form.Item label="订单ID">
        {getFieldDecorator('form.orderNumber', {})(<Input placeholder="请输入" />)}
      </Form.Item>
      <Form.Item label="所属公司">
        {getFieldDecorator('form.companyName', {})(<Input placeholder="请输入" />)}
      </Form.Item>
      <Form.Item label="订单状态">
        {getFieldDecorator(
          'form.otherOrderState',
          {}
        )(
          <Select style={{ minWidth: 170 }} placeholder="请选择" allowClear>
            {otherOrderStateList.map(one => (
              <Select.Option key={one.key} value={one.key}>
                {one.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>
      <Form.Item label="投放开始时间">
        {getFieldDecorator('orderStartDate', {})(<RangePicker />)}
      </Form.Item>
      <Form.Item label="投放结束时间">
        {getFieldDecorator('orderEndDate', {})(<RangePicker />)}
      </Form.Item>
      <Form.Item label="销售经理">
        {getFieldDecorator(
          'salesman',
          {}
        )(
          <SelectSearch
            searchKey="mediaRealName"
            idKey="mediaId"
            searchProps={{ isMmediaReal: 1 }}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={searchForm}>
          查询
        </Button>
        <Button
          style={{ marginLeft: 20 }}
          onClick={() => {
            resetFields();
            resetPlatform();
          }}
        >
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create()(CooperationForm);
