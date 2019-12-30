
import React, { } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
const Price = (props) => {
  const columns = [
    {
      title: '账号等级/发文位置',
      dataIndex: 'name',
      align: 'center',
      width: '50px',

    },
    {
      title: '多图文第一条',
      dataIndex: 'age',
      align: 'center',
      width: '100px',
      render: (val, record) => {
        return <Form.Item>{getFieldDecorator(`${record.name}.one`, {
          rules: [{ required: true, message: 'Please input your username!' }],
          initialValue: 0
        })(
          <Input
            placeholder="Username"
          />,
        )}</Form.Item>
      }
    },
    {
      title: '多图文第二条',
      dataIndex: 'address',
      align: 'center',
      width: '100px',
      render: (val, record) => {
        return <Form.Item>{getFieldDecorator(`${record.name}.two`, {
          rules: [{ required: true, message: 'Please input your username!' }],
          initialValue: 0
        })(
          <Input
            placeholder="Username"
          />,
        )}</Form.Item>
      }
    }, {
      title: '多图文3-N条',
      dataIndex: 'oo',
      align: 'center',
      width: '100px',
      render: (val, record) => {
        return <Form.Item>{getFieldDecorator(`${record.name}.three`, {
          rules: [{ required: true, message: 'Please input your username!' }],
          initialValue: 0
        })(
          <Input
            placeholder="Username"
          />,
        )}</Form.Item>
      }
    }]
  const { getFieldDecorator, getFieldValue, setFieldsValue, validateFields } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
        <h3 style={{ marginLeft: '30px', marginBottom: '10px' }}>账号等级维度 单位：（元/阅读）</h3>
        <Table
          style={{ marginLeft: '30px' }}
          bordered
          dataSource={[{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }, { name: 'E' }]}
          columns={columns}
          pagination={false}
        />
        <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" htmlType="submit">应用配置</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(Price);
