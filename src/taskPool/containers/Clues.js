/**
 * Created by lzb on 2019-12-03.
 */
/**
 * Created by lzb on 2019-12-03.
 */
import React, { useEffect, useState, useRef } from 'react';
import { Table, Tabs, Typography, Modal, Divider, Badge } from 'antd';
import Filters from '../components/Clue/Filters';
import { bindActionCreators } from 'redux';
import * as commonActions from '@/actions';
import * as actions from '@/taskPool/actions';
import { TaskBudgetConsumptions, TaskInfo, TaskStatus } from '@/taskPool/base/ColumnsDataGroup';
import { connect } from 'react-redux';
import numeral from 'numeral'
import Scolltable from '@/components/Scolltable';

import { Link } from "react-router-dom";

const { Title } = Typography;

function getColumns(active, clickModal) {
  let columns = [];
  switch (active) {
    case "9":
      columns = [
        {
          title: '线索ID',
          dataIndex: 'id',
          align: 'center'
        },
        {
          title: '平台名称',
          dataIndex: 'platformName',
          align: 'center'
        },
        {
          title: '线索提交时间',
          dataIndex: 'createdAt',
          align: 'center',
          width: 220
        },
        {
          title: '任务起止时间',
          dataIndex: 'extensionStartTime',
          align: 'center',
          width: 350,
          render: (date, record) => {
            return <span>{record.extensionStartTime} - {record.extensionEndTime}</span>
          }
        },
        {
          title: '客户名称',
          dataIndex: 'createdName',
          align: 'center'
        },
        {
          title: '线索状态',
          dataIndex: 'clueState',
          align: 'center',
          render: (val, record) => {
            return val == 2 ? <Badge status="success" text="已处理" /> : <Badge status="processing" text="未处理" />
          }
        },
        {
          title: '任务预算',
          dataIndex: 'extensionBudget',
          align: 'center',
          render: (val) => {
            return numeral(val).format('0,0.00')
          }
        },
        {
          title: '操作',
          align: 'center',
          width: 150,
          fixed: 'right',
          dataIndex: 'actions',
          render: (val, record) => {
            return <div>{record.clueState == 1 ? <div><Link target="_blank" to={`/order/task/clues-details?platform=weixin&id=${record.id}`}>
              详情
        </Link> <a onClick={() => { clickModal(true, record) }}>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;确定处理</a></div> : null}</div>
          }
        }
      ]
      break;
    case "1000":
      columns = [
        {
          title: '线索ID',
          dataIndex: 'id',
          align: 'center',
        },
        {
          title: '线索提交时间',
          dataIndex: 'createAt',
          width: 240,
          align: 'center',
          render: (date, record) => {
            return <div>
              {record.createdAt}
            </div>
          }
        },
        {
          title: '任务起止时间',
          align: 'center',
          dataIndex: 'extensionStartTime',
          width: 380,
          render: (date, record) => {
            return <div>
              {date}-{record.extensionEndTime}
            </div>
          }
        },
        {
          title: '客户名称',
          align: 'center',
          dataIndex: 'createdName',
          render: (name, record) => {
            return <div>
              {name}
            </div>
          }
        },
        {
          title: '预算金额',
          align: 'center',
          dataIndex: 'extensionBudget',
          render: (extensionBudget, record) => {
            return <div>
              {extensionBudget}
            </div>
          }
        },
        {
          title: '任务类型',
          align: 'center',
          dataIndex: 'extensionTypeDesc'
        },
        {
          title: '线索状态',
          align: 'center',
          dataIndex: 'clueState',
          render: (val, record) => {
            return val == 2 ? <Badge status="success" text="已处理" /> : <Badge status="processing" text="未处理" />
          }
        },
        {
          title: '操作',
          fixed: 'right',
          width: 150,
          align: 'center',
          render: (val, record) => {
            return <div>
              {record.clueState == 1 ? <div><Link target="_blank" to={`/order/task/clues-details?platform=cooper&id=${record.id}`}>
                详情
        </Link> <a onClick={() => { clickModal(true, record) }}>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;确定处理</a> </div> : null
              }</div>
          }
        }
      ]
      break
  }
  return columns
}


const Clues = (props) => {
  const [visible, setVisible] = useState(false)
  const [record, setRecord] = useState({})
  const [searching, setSearching] = useState(false)

  const that = useRef({
    search: {
      page: {
        currentPage: 1,
        pageSize: 20
      },
      form: {}
    }
  })

  const getList = (params = {}) => {
    let search = {
      page: Object.assign({}, that.current.search.page, params.page),
      form: Object.assign({}, that.current.search.form, params.form)
    }
    setSearching(true)
    that.current.search = search

    props.actions.TPPostClueList(search).finally(() => {
      setSearching(false)
    })
  }

  const clickModal = (value, record) => {
    setRecord(record)
    setVisible(value)
  }
  const handleOk = () => {
    props.actions.TPClueConfirm({ id: record.id, clueState: 2 }).then(() => {
      getList()
      setVisible(false)
    })
  };

  const handleCancel = () => {
    setVisible(false)
  };

  const columns = getColumns(that.current.search.form.platformId, clickModal)
  const { actions, history, taskPoolData } = props
  const { clueManageList: { keys, source, total, pageNum, pageSize } } = taskPoolData

  const dataSource = keys.map(key => source[key])
  const pagination = {
    total,
    pageSize,
    current: pageNum,
    showQuickJumper: true,
    showSizeChanger: true,
    onChange: (currentPage) => {
      getList({
        page: { currentPage }
      })
    },
    onShowSizeChange: (currentPage, pageSize) => {
      getList({
        page: { pageSize, currentPage: 1 }
      })
    }
  }

  return (
    < div className='task-pool-page-container tasks-page' >
      <Title level={4}>线索管理</Title>
      <Filters search={getList} />
      <div style={{ height: '30px' }}></div>
      <Scolltable scrollClassName='.ant-table-body' widthScroll={2100}>
        <Table
          loading={false}
          dataSource={dataSource}
          pagination={pagination}
          columns={columns}
          scroll={{ x: 2000 }}
          rowKey={record => record.id}
        />
        {
          visible ? <Modal
            title="线索处理"
            visible={true}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>确认已经处理{record.createdName}的该条线索么？</p>
          </Modal> : null
        }
      </Scolltable>
    </div >
  );
};



const mapStateToProps = (state) => ({
  common: state.commonReducers,
  taskPoolData: state.taskPoolReducers
})
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...commonActions,
    ...actions
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Clues)

