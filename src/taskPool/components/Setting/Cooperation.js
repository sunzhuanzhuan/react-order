
import React, { useState } from 'react';
import { Table, Input, Button, Form, Modal, Select, InputNumber } from 'antd';
const { Option } = Select;
const { confirm } = Modal;

const Cooperation = (props) => {
  const [selectWeiDu, setSelectWeiDu] = useState([])
  const [data, setData] = useState([{ name: 1 }, { name: 2 }, { name: 3 }])
  const [selectedRows, setSelectedRows] = useState([])

  const { getFieldDecorator, getFieldValue, setFieldsValue, validateFields } = props.form;
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  const handleSubmitTask = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  const handleSubmitXian = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  const handleChange = (value) => {
    setSelectWeiDu(value)
  }
  const handleSubmitBaotian = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  const columns = [
    {
      title: '定向维度',
      dataIndex: 'name',
      width: '30%',
      render: (val, record) => {
        console.log(val)
        return <Form.Item>
          {getFieldDecorator(`${record.name}.index`)(
            <Select mode="tags" style={{ width: '300px' }} onChange={handleChange} placeholder="添加维度">
              <Option value='1'>乘车日期</Option>
              <Option value='2'>目的地城市</Option>
              <Option value='3'>出发城市</Option>
              <Option value='4'>性别</Option>
              <Option value='5'>年龄</Option>
              <Option value='6'>车次字头</Option>
              <Option value='7'>坐席</Option>
            </Select>
          )
          }
        </Form.Item>

      }
    },
    {
      title: '图文形式折扣售价（元/条）',
      dataIndex: 'age1',
      render: (val, record) => {
        return <Form.Item>
          {getFieldDecorator(`${record.name}.age1`)(
            <Input />
          )
          }
        </Form.Item>
      }
    },
    {
      title: '视频形式折扣售价（元/条）',
      dataIndex: 'address2',
      render: (val, record) => {
        return <Form.Item>
          {getFieldDecorator(`${record.name}.address2`)(
            <Input />
          )
          }
        </Form.Item>
      }
    }, {
      title: '图文形式刊例价（元/条）',
      dataIndex: 'age3',
      render: (val, record) => {
        return <Form.Item>
          {getFieldDecorator(`${record.name}.age3`)(
            <Input />
          )
          }
        </Form.Item>
      }
    },
    {
      title: '视频形式刊例价（元/条）',
      dataIndex: 'address4',
      render: (val, record) => {
        return <Form.Item>
          {getFieldDecorator(`${record.name}.address4`)(
            <Input />
          )
          }
        </Form.Item>
      }
    }
  ];
  const columnsTian = [
    {
      title: '投放天数（天）',
      dataIndex: 'age1',
      render: (val, record) => {
        return <Form.Item>
          {getFieldDecorator(`${record.age1}.age1`)(
            <InputNumber />
          )
          }
        </Form.Item>
      }
    },
    {
      title: '对外售价（元）',
      dataIndex: 'age1',
      render: (val, record) => {
        return <Form.Item>
          {getFieldDecorator(`${record.age1}.age1`)(
            <InputNumber />
          )
          }
        </Form.Item>
      }
    },
  ]
  const columnsXian = [
    {
      title: '对外售价（元）',
      dataIndex: 'age1',
      render: (val, record) => {
        return <Form.Item>
          {getFieldDecorator(`${record.age1}.age1`)(
            <InputNumber />
          )
          }
        </Form.Item>
      }
    },
    {
      title: '返现金额（元）',
      dataIndex: 'age1',
      render: (val, record) => {
        return <Form.Item>
          {getFieldDecorator(`${record.age1}.age1`)(
            <InputNumber />
          )
          }
        </Form.Item>
      }
    },
  ]
  const handleDelete = () => {
    confirm({
      title: '删除',
      content: '是否删减维度',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        console.log(selectedRows)
      },
      onCancel() {

      },
    });
  }
  const handleAdd = () => {
    setData([...data, { name: new Date().getTime() }])
  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedRows(selectedRows)
    }
  };
  return (
    <div>
      <div>
        <h4>1、维度配置</h4>
        <Form onSubmit={handleSubmit}>
          <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
          <h3 style={{ marginLeft: '30px', marginBottom: '10px' }}>账号等级维度 单位：（元/阅读）</h3>
          <Table
            style={{ marginLeft: '30px' }}
            bordered
            dataSource={data}
            columns={columns}
            pagination={false}
            rowSelection={rowSelection}
          />
          <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button type="primary" onClick={handleAdd}>新增维度</Button>
            <Button type="primary" style={{ margin: '0 20px' }} onClick={handleDelete}>删除维度</Button>
            <Button type="primary" htmlType="submit">应用配置</Button>
          </Form.Item>
        </Form>
        <h4>2、任务要求</h4>
        <Form layout="inline" onSubmit={handleSubmitTask}>
          <Form.Item label="单条执行单起投量级（条）">
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入' }],
            })(
              <InputNumber precision={0} />,
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" >
              应用配置
          </Button>
          </Form.Item>
        </Form>
      </div>
      <h4>3、包天模式</h4>
      <Form onSubmit={handleSubmitBaotian}>
        <Table
          style={{ marginLeft: '30px' }}
          bordered
          dataSource={data}
          columns={columnsTian}
          pagination={false}
          rowSelection={rowSelection}
        />
        <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={handleAdd}>新增投放天数</Button>
          <Button type="primary" style={{ margin: '0 20px' }} onClick={handleDelete}>删除投放天数</Button>
          <Button type="primary" htmlType="submit">应用配置</Button>
        </Form.Item>
      </Form>
      <h4>4、返现优惠</h4>
      <Form onSubmit={handleSubmitXian}>
        <Table
          style={{ marginLeft: '30px' }}
          bordered
          dataSource={data}
          columns={columnsXian}
          pagination={false}
          rowSelection={rowSelection}
        />
        <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button type="primary" onClick={handleAdd}>新增返现优惠</Button>
          <Button type="primary" style={{ margin: '0 20px' }} onClick={handleDelete}>删除返现优惠</Button>
          <Button type="primary" htmlType="submit">应用配置</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Form.create()(Cooperation);
