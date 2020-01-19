
import React, { useEffect } from 'react';
import { Table, InputNumber, Button, Popconfirm, Form, message } from 'antd';
const Price = (props) => {
  const columns = [
    {
      title: '账号等级/发文位置',
      dataIndex: 'accountGarde',
      align: 'center',
      width: '50px',

    },
    {
      title: '多图文第一条',
      align: 'center',
      width: '100px',
      render: (val, record) => {
        if (record.offerTypes) {
          return record.offerTypes.map((item) => {
            if (item.offerPosition == 1) {
              return <Form.Item>{getFieldDecorator(`${record.accountGarde}.one`, {
                initialValue: item.unitPrice || 0
              })(
                <InputNumber precision={2} min={0} />,
              )}</Form.Item>
            }
          })
        } else {
          return <Form.Item>{getFieldDecorator(`${record.accountGarde}.one`, {
            initialValue: 0
          })(
            <InputNumber precision={2} min={0} />,
          )}</Form.Item>
        }

      }
    },
    {
      title: '多图文第二条',
      align: 'center',
      width: '100px',
      render: (val, record) => {
        if (record.offerTypes) {
          return record.offerTypes.map((item) => {
            if (item.offerPosition == 2) {
              return <Form.Item>{getFieldDecorator(`${record.accountGarde}.two`, {
                initialValue: item.unitPrice || 0
              })(
                <InputNumber precision={2} min={0} />,
              )}</Form.Item>
            }
          })
        } else {
          return <Form.Item>{getFieldDecorator(`${record.accountGarde}.two`, {
            initialValue: 0
          })(
            <InputNumber precision={2} min={0} />,
          )}</Form.Item>
        }

      }
    }, {
      title: '多图文3-N条',
      align: 'center',
      width: '100px',
      render: (val, record) => {
        if (record.offerTypes) {
          return record.offerTypes.map((item) => {
            if (item.offerPosition == 3) {
              return <Form.Item>{getFieldDecorator(`${record.accountGarde}.three`, {
                initialValue: item.unitPrice || 0
              })(
                <InputNumber precision={2} min={0} />,
              )}</Form.Item>
            }
          })
        } else {
          return <Form.Item>{getFieldDecorator(`${record.accountGarde}.three`, {
            initialValue: 0
          })(
            <InputNumber precision={2} min={0} />,
          )}</Form.Item>
        }

      }
    }]
  const { getFieldDecorator, getFieldValue, setFieldsValue, validateFields } = props.form;

  const handleSubmit = e => {
    e.preventDefault();
    let arr = [{}, {}, {}, {}, {}]
    let letter = ['A', 'B', 'C', 'D', 'E']
    let word = ['one', 'two', 'three']
    props.form.validateFields((err, values) => {
      if (!err) {
        for (let j = 0; j < 5; j++) {
          arr[j].accountGarde = letter[j];
          arr[j].offerTypes = [];
          let item = values[letter[j]]
          for (let i = 0; i < 3; i++) {
            arr[j].offerTypes.push({ offerPosition: i + 1, unitPrice: item[word[i]] || 0 })
          }
        }
        props.TPReadUnitPriceConfig({ accountGardes: arr }).then(() => {
          message.success('设置成功')
          props.TPGetReadUnitPriceConfig({})
        }).catch(({ errorMsg }) => {
          message.error(errorMsg || '操作失败，请重试！');
        })
        console.log(arr)

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
          rowKey={record => record.accountGarde}
          dataSource={props.readUnitPriceConfig}
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
