
import React, { } from 'react';
import { Table, Button, Modal, Select } from 'antd';
// import debounce from 'lodash/debounce';
const { confirm } = Modal;
const { Option } = Select;
const Notice = (props) => {
  // const handleSearch = debounce(fetchData, 800);

  // const fetchData = (value) => {
  //   if (!value) {
  //     return
  //   }
  //   let { TPQueryUserInfo } = props
  //   let search = {
  //     page: {
  //       currentPage: 1,
  //       pageSize: 30
  //     },
  //     form: {
  //       userName: 1,
  //       realName: 1
  //     }
  //   }
  //   const { user_info } = props.login
  //   console.log(user_info)
  //   // TPQueryUserInfo()
  // }
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
  const handleChange = () => {

  }
  const { list = [], } = props.notificationList

  return (
    <div>
      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
        <h3 style={{ margin: '10px 0' }}>质检异常短信通知
        <div style={{ margin: '30px 0' }}>
            <span style={{ fontSize: '12px', marginRight: '10px' }}>选择需要通知的人员:</span>
            <Select
              style={{ width: '200px' }}
              mode="multiple"
              placeholder="Please select"
              defaultValue={['a10', 'c12']}
            // onChange={handleSearch}
            >
              <Option value="jack">Jack</Option>
            </Select>
          </div>
        </h3>
        <Table dataSource={list} columns={columns} pagination={false} />
      </div>
    </div>
  );
};

export default Notice;
