
import React, { useState } from 'react';
import { Table, Button, Modal, Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
const { confirm } = Modal;
const { Option } = Select;
const Notice = (props) => {
  const [fetching, setFetching] = useState(false)
  const [userData, setUserData] = useState([])
  const [selectedUser, setSelectedUser] = useState([])
  let fetchData = (value) => {
    if (!value) {
      return
    }
    let { TPQueryUserInfo } = props
    const { userLoginInfo: { user_info } } = props.login
    let search = {
      page: {
        currentPage: 1,
        pageSize: 30
      },
      form: {
        userName: user_info.username,
        realName: value
      }
    }
    setFetching(true)
    TPQueryUserInfo(search).then((res) => {
      setFetching(false)
      setUserData(res.data.list)
    })
  }
  fetchData = debounce(fetchData, 800);
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
        return props.TPUpdateNotice(params).then(() => {
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
  const handleChange = (value) => {
    setSelectedUser(value)
  }
  const handleApply = () => {
    props.TPUpdateNotice(selectedUser).then(() => {
      let params = {
        page: {
          currentPage: 1,
          pageSize: 100
        },
        form: {
          platformId: 9,
          notificationType: 11
        }
      }
      props.TPGetNotificationList(params)
    })
    console.log(selectedUser);

  }
  const { list = [], } = props.notificationList;
  const { list: searchList = [] } = props.tpUserInfo

  return (
    <div>
      <h2 style={{ marginTop: '20px' }}>微信公众号</h2>
      <div style={{ marginLeft: '30px' }}>
        <h3 style={{ margin: '10px 0' }}>质检异常短信通知
        <div style={{ margin: '30px 0' }}>
            <span style={{ fontSize: '12px', marginRight: '10px' }}>请搜索需要通知的人员:</span>
            <Select
              style={{ width: '500px' }}
              mode="multiple"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              placeholder="请搜索需要通知的人员"
              onSearch={fetchData}
              onChange={handleChange}
            >
              {userData.map((item, index) => {
                return <Option value={item.userId} key={index}>{item.realName}({item.jobTypes})</Option>
              })}

            </Select>
          </div>
        </h3>
        <Table dataSource={list} columns={columns} pagination={false} />
        <p style={{ marginTop: '50px', textAlign: 'center' }}>
          <Button type="primary" onClick={handleApply}>应用配置</Button>
        </p>
      </div>
    </div>
  );
};

export default Notice;
