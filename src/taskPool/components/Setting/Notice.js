
import React, { } from 'react';
import { Table, Button } from 'antd';
const Notice = (props) => {
  const columns = [
    {
      title: '序号',
      dataIndex: 'name1',
      align: 'center',
      width: 100,
      key: 'name',
    },
    {
      title: '姓名',
      dataIndex: 'age2',
      align: 'center',
      width: 100,
      key: 'age',
    },
    {
      title: '部门',
      dataIndex: 'address3',
      align: 'center',
      width: 100,
      key: 'address',
    }, {
      title: '岗位名称',
      dataIndex: 'name4',
      align: 'center',
      width: 100,
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'age5',
      align: 'center',
      width: 100,
      key: 'age',
    },
    {
      title: '邮箱',
      dataIndex: 'address6',
      align: 'center',
      width: 100,
      key: 'address',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      key: 'action',
      render: () => {
        return <Button type="link">删除</Button>
      }
    },
  ];
  return (
    <div>
      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
        <h3 style={{ margin: '10px 0' }}>新建任务短信通知  <Button type="primary">添加人员</Button></h3>
        <Table dataSource={[{ "address6": 1 }, {}, {}, {}, {}, {}]} columns={columns} />
        <h3 style={{ margin: '10px 0' }}>质检异常短信通知 <Button type="primary">添加人员</Button></h3>
        <Table dataSource={[{ "address6": 2 }, {}, {}, {}, {}, {}]} columns={columns} />
      </div>
    </div>
  );
};

export default Notice;
