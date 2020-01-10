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

import { Link } from "react-router-dom";

const { Title } = Typography;

function getColumns(active, clickModal) {
  console.log(active)
  let columns = []
  switch (active) {
    case "9":
      columns = [
        {
          title: '任务ID',
          dataIndex: 'id',
          align: 'center'
        },
        {
          title: '线索提交时间',
          dataIndex: 'createdAt',
          align: 'center',
          width: 220,
        },
        {
          title: '任务起止时间',
          align: 'center',
          render: (date, record) => {
            return record.extensionStartTime - record.extensionEndTime
          }
        },
        {
          title: '客户名称',
          dataIndex: 'createdName',
          align: 'center'
        },
        {
          title: '任务状态',
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
          fixed: 'right',
          align: 'center',
          width: 150,
          dataIndex: 'actions',
          render: (val, record) => {
            return <p><Link target="_blank" to={`/order/task/clues-details?platform=weixin&id=${record.id}`}>
              详情
          </Link>{record.clueState == 1 ? <a onClick={() => { clickModal(true, record) }}>/确定处理</a> : null}</p>
          }
        }
      ]
      break;
    case "1000":
      columns = [
        {
          title: '任务ID',
          dataIndex: 'adOrderNumber',
        },
        {
          title: '任务名称',
          dataIndex: 'orderName',
          width: 220,
          render: (name, record) => {
            return <TaskInfo platformId={record.platformId} name={name} />
          }
        },
        {
          title: '任务创建时间',
          dataIndex: 'createAt',
          render: (date, record) => {
            return <div>
              {date}
            </div>
          }
        },
        {
          title: '任务起止时间',
          dataIndex: 'orderStartDate',
          width: 170,
          render: (date, record) => {
            return <div>
              {date}
              <br />
              {record.orderEndDate}
            </div>
          }
        },
        {
          title: '创建人',
          dataIndex: 'createdName',
          render: (name, record) => {
            return <div>
              {name}
            </div>
          }
        },
        {
          title: '客户名称',
          dataIndex: 'companyName',
          render: (companyName, record) => {
            return <div>
              {companyName}
            </div>
          }
        },
        {
          title: '任务状态',
          dataIndex: 'orderState',
          render: (state, record) => {
            return <TaskStatus status={state} />
          }
        },
        {
          title: '预算金额',
          dataIndex: 'availableAmount',
        },
        {
          title: '任务类型',
          dataIndex: 'taskPattern',
          render: (taskPattern, record) => {
            return <div>
              {taskPattern}
            </div>
          }
        },
        {
          title: '操作',
          dataIndex: 'id',
          align: 'center',
          render: (id, record) => {
            return <div>
              {record.orderState === 1 && <span>
                <Divider type="vertical" />
                <a onClick={() => this.offline(id)}>下线</a>
              </span>}
            </div>
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
    setVisible(false)
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
      <Table
        loading={false}
        dataSource={dataSource}
        scroll={{ x: 1800 }}
        pagination={pagination}
        columns={columns}
      />
      {
        visible ? <Modal
          title="线索处理"
          visible={true}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>确认已经处理{'"' + record.createdName + '"'}的线索么？</p>
        </Modal> : null
      }
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

