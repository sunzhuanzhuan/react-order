import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, Input, message, Icon, Tooltip } from 'antd';
import * as actions from '@/taskPool/actions';
import * as commonActions from '@/actions';
import AddForm from '../components/Platform/Add'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment'
const { confirm } = Modal;
const { TextArea } = Input;

const Platform = (props) => {
  const [visible, setVisible] = useState(false)
  const [visibleQuit, setVisibleQuit] = useState(false)
  const [listLoading, setListLoading] = useState(false)
  const [row, setRow] = useState([])
  const [type, setType] = useState('add')
  const [authToken, setAuthToken] = useState('null')

  useEffect(() => {
    let search = {
      page: {
        currentPage: 1,
        pageSize: 50
      }
    }
    getList(search)
  }, [])

  async function getList(params) {
    setListLoading(true)
    await props.actions.TPGetPlatformList(params)
    props.actions.getNewToken().then(({ data: authToken }) => {
      setAuthToken({ authToken })
    })
    props.actions.TPAllProvince()
    setListLoading(false)
  }
  const handleEdit = (record, type) => {
    setRow(record)
    props.actions.TPPlatformDetail({ id: record.id }).then(() => {
      setVisible(true)
      setType(type);
    })
  }
  const handleDelete = (record) => {
    confirm({
      title: '删除?',
      content: '是否删除，删除后数据不可恢复',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        props.actions.TPPUpdatePlatform({ id: record.id, operationFlag: 1 }).then(() => {
          message.success('删除成功')
          let search = {
            page: {
              currentPage: 1,
              pageSize: 50
            }
          }
          getList(search)
        })
      },
      onCancel() { },
    });
  }
  const handleStop = (record) => {
    setVisibleQuit(true)
    setRow(record)
  }
  const status = {
    '0': '-',
    '1': '合作中',
    '2': '合作结束',
    '3': '合作终止'
  }
  const columns = [
    {
      title: '合作平台ID',
      dataIndex: 'id',
      align: 'center',
      width: '50px',

    }, {
      title: '合作平台名称',
      dataIndex: 'platformName',
      align: 'center',
      width: '50px',

    }, {
      title: '联系人',
      dataIndex: 'contacts',
      align: 'center',
      width: '50px',

    }, {
      title: '联系电话',
      dataIndex: 'mobile',
      align: 'center',
      width: '80px',

    }, {
      title: '邮箱',
      dataIndex: 'mailbox',
      align: 'center',
      width: '100px',

    }, {
      title: '添加时间',
      dataIndex: 'createdAt',
      align: 'center',
      width: '50px',
      render: (val) => {
        return moment(val).format('YYYY-MM-DD')
      }

    }, {
      title: '合作状态',
      dataIndex: 'contractState',
      align: 'center',
      width: '50px',
      render: (val, record) => {
        return val != 3 ? status[val] : <span>{status[val]}<Tooltip placement="topLeft" title={record.terminationReason}>
          <Icon type="exclamation-circle" /> </Tooltip></span>
      }

    }, {
      title: '媒介负责人',
      dataIndex: 'mediumLeader',
      align: 'center',
      width: '50px',

    }, {
      title: '操作',
      align: 'center',
      width: '100px',
      render: (val, record) => {
        return <div>
          {record.contractState == 1 ?
            <Button type="link" onClick={() => handleEdit(record, 'edit')}>编辑</Button>
            : null}
          {(record.contractState == 3 || record.contractState == 2) ? <Button type="link" onClick={() => handleEdit(record, 'query')}>查看</Button> : null}
          {(record.contractState == 3 || record.contractState == 2) ? <Button type="link" onClick={() => handleDelete(record)}>删除</Button> : null}
          {record.contractState == 1 ? <Button type="link" onClick={() => handleStop(record)}>合作终止</Button> : null}
        </div>
      },

    },
  ]


  const handleCancel = () => {
    setVisible(false)
  }
  const { platformList: { list, pageNum, pageSize, total }, allProvince } = props.platformReducers
  const pagination = {
    total: total,
    pageSize: 50,
    current: pageNum,
    onChange: (current) => {
      let search = {
        page: {
          currentPage: 1,
          pageSize: 50
        }
      }
      getList(search)
    },
    showQuickJumper: true
  }
  const lei = {
    "add": '新增',
    "edit": '编辑',
    "query": '查看'
  }
  return <div>
    <h2>合作平台管理</h2>
    <Button type="primary" onClick={() => {
      setVisible(true)
      setType('add');
    }}>添加合作平台</Button>
    {authToken && <Modal
      title={`${lei[type]}合作平台`}
      visible={visible}
      footer={null}
      destroyOnClose={true}
      forceRender={true}
      maskClosable={false}
      onCancel={() => setVisible(false)}
    >
      <AddForm
        type={type}
        setVisible={setVisible}
        platformReducers={props.platformReducers}
        data={authToken}
        getList={getList}
        allProvince={allProvince}
        TPSavePlatform={props.actions.TPSavePlatform} />
    </Modal>}
    <h3 style={{ margin: '20px 0' }}>合计<a>{total}</a>个</h3>
    <Table loading={listLoading} columns={columns} dataSource={list} pagination={pagination} />
    {visibleQuit ? <Quit
      getList={getList}
      row={row}
      TPPUpdatePlatform={props.actions.TPPUpdatePlatform}
      setVisibleQuit={setVisibleQuit}
      visibleQuit={visibleQuit} /> : null}
  </div>
}


const mapStateToProps = (state) => ({
  platformReducers: state.taskPoolReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Platform)
class Quit extends React.Component {

  handleCancel = e => {
    this.props.setVisibleQuit(false)
  };
  handleOk = e => {
    const { row } = this.props
    let val = document.getElementById('areaValue').innerHTML;
    if (val == '' || val.length > 50) {
      message.error('填写终止原因，50字以内')
    } else {
      this.props.TPPUpdatePlatform({ id: row.id, operationFlag: 2, terminationReason: val }).then(() => {
        this.props.setVisibleQuit(false)
        let search = {
          page: {
            currentPage: 1,
            pageSize: 50
          }
        }
        this.props.getList(search)
      })

    }

  };
  render() {
    return (
      <Modal
        title="终止原因"
        width={500}
        visible={this.props.visibleQuit}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <h3>填写终止原因,确定后结果不可更改（50字以内）</h3>
        <TextArea rows={4} id='areaValue' />
      </Modal>
    );
  }
}
