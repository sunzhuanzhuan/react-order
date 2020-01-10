
import React, { } from 'react';
import { Table, Button, Modal } from 'antd';
const { confirm } = Modal;


const Notice = (props) => {
  const handleDelete = (record) => {
    confirm({
      title: '删除人员',
      content: `确定要在通知列表中${record.personnelName}删除么？`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        let params = {
          userId: record.id,
          isDelete: 1,
          notificationType: 11,
          platformId: 9
        }
        let config = {
          page: {
            currentPage: 1,
            pageSize: 100
          },
          form: {
            platformId: 9,
            notificationType: 11
          }
        }
        return props.TPDeleteNotice(params).then(() => {
          props.TPGetNotificationList(config)
        })

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const columns = [
    {
      title: '序号',
      align: 'center',
      width: 30,
      render: (val, record, index) => {
        return index + 1
      }
    },
    {
      title: '姓名',
      dataIndex: 'personnelName',
      align: 'center',
      width: 100,
      key: 'personnelName',
    }, {
      title: '岗位名称',
      dataIndex: 'jobType',
      align: 'center',
      width: 100,
      key: 'jobType',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      align: 'center',
      width: 100,
      key: 'mobile',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
      width: 100,
      key: 'email',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
      width: 100,
      key: 'action',
      render: (val, record) => {
        return <Button type="link" onClick={() => handleDelete(record)}>删除</Button>
      }
    },
  ];
  const { list = [] } = props.notificationList
  return (
    <div>
      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
        <h3 style={{ margin: '10px 0' }}>质检异常短信通知 <Button type="primary">添加人员</Button></h3>
        <Table dataSource={list} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default Notice;
