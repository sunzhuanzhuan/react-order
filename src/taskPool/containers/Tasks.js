/**
 * Created by lzb on 2019-12-03.
 */
import React, { useRef, useState } from 'react';
import { Alert, Divider, message, Modal, Table, Tabs, Typography } from 'antd';
import Filters from '../components/Task/Filters';
import { bindActionCreators } from 'redux';
import * as commonActions from '@/actions';
import * as actions from '@/taskPool/actions';
import { connect } from 'react-redux';
import { TaskBudgetConsumptions, TaskInfo, TaskStatus } from '@/taskPool/base/ColumnsDataGroup';
import { NavLink } from 'react-router-dom';
import Yuan from '@/base/Yuan';
import {
  AD_ORDER_STATE_END, AD_ORDER_STATE_FINISH,
  AD_ORDER_STATE_PROCESSING,
  AD_ORDER_STATE_WAIT_RELEASED
} from '@/taskPool/constants/config';

const { Title } = Typography;

function getColumns(active, operation) {
  let columns = []
  switch (active) {
    case "9":
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
          dataIndex: 'createdAt',
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
          title: '任务类型',
          dataIndex: 'taskPatternDesc',
          render: (text, record) => {
            return <div>
              {text}
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
          title: '领取数/申请数',
          dataIndex: 'mcnCount',
          align: "right",
          render: (mcnCount, record) => {
            return <>
              {mcnCount || '-'} / {record.mcnApplyCount || '-'}
            </>
          }
        },
        {
          title: '已用预算/可用预算',
          dataIndex: 'usedAmount',
          align: "right",
          render: (usedAmount, record) => {
            return <>
              <Yuan className='text-gray' value={usedAmount} format='0,0.00' />
              <br />
              <Yuan className='text-gray' value={record.availableAmount} format='0,0.00' />
            </>
          }
        },
        {
          title: '操作',
          dataIndex: 'id',
          align: 'center',
          width: 180,
          fixed: 'right',
          render: (id, record) => {
            return <div>
              <NavLink to={'/order/task/tasks-details/' + id}>详情</NavLink>
              {
                record.orderState === AD_ORDER_STATE_WAIT_RELEASED && <>
                  <Divider type="vertical" />
                  <NavLink to={'/order/task/tasks-update/' + id}>修改</NavLink>
                </>
              }
              {
                record.orderState === AD_ORDER_STATE_PROCESSING && <>
                  <Divider type="vertical" />
                  <a onClick={() => operation.offline(id, record)}>下线</a>
                </>
              }
              {
                record.orderState === AD_ORDER_STATE_WAIT_RELEASED && <>
                  <Divider type="vertical" />
                  <a onClick={() => operation.online(id, record)}>上线</a>
                </>
              }
              {
                record.orderState === AD_ORDER_STATE_WAIT_RELEASED && <>
                  <Divider type="vertical" />
                  <a onClick={() => operation.stop(id, record)}>终止</a>
                </>
              }
            </div>
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
            return name
          }
        },
        {
          title: '任务创建时间',
          dataIndex: 'createdAt',
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
          dataIndex: 'totalAmount',
          align: "right",
          render: (totalAmount, record) => {
            return <>
              <Yuan className='text-black' value={totalAmount} format='0,0.00' />
            </>
          }
        },
        {
          title: '任务类型',
          dataIndex: 'mediaType',
          render: (type, record) => {
            return <>
              {type === 3 && "视频+图"}
              {type === 4 && "图"}
            </>
          }
        },
        {
          title: '任务模式',
          dataIndex: 'putType',
          align: "right",
          render: (type, record) => {
            return <>
              {type === 1 && "按量投放"}
              {type === 2 && "按天数投放"}
            </>
          }
        },
        {
          title: '操作',
          dataIndex: 'id',
          align: 'center',
          width: 180,
          fixed: 'right',
          render: (id, record) => {
            return <div>
              <NavLink to={'/order/task/tasks-details/' + id}>详情</NavLink>
              {
                record.orderState === AD_ORDER_STATE_FINISH && <>
                  <Divider type="vertical" />
                  <a onClick={() => operation.stop(id, record)}>数据</a>
                </>
              }
            </div>
          }
        }
      ]
      break
  }
  return columns
}

const Tasks = (props) => {

  const [ searching, setSearching ] = useState(false)

  const that = useRef({
    search: {
      page: {
        currentPage: 1,
        pageSize: 20
      },
      form: {}
    },
    isOfflineRequest: false
  })


  // 下线任务
  const offline = (id, record) => {
    const { actions } = props
    Modal.confirm({
      title: '下线任务',
      content: `确认下线 ${record.companyName} —— “${record.orderName}” 的任务么？`,
      onOk: () => {
        return actions.TPOfflineTask({ id }).then(() => {
          message.success('下线成功')
          getList({page: { currentPage: 1 }})
        })
      }
    })
  }
  // 上线任务
  const online = (id, record) => {
    const { actions } = props
    Modal.confirm({
      title: '上线任务',
      content: `任务还未到上线时间，确定要立即上线该任务么？？`,
      onOk: () => {
        return actions.TPOnlineTask({ id }).then(() => {
          message.success('上线成功')
          getList({page: { currentPage: 1 }})
        })
      }
    })
  }
  // 终止任务
  const stop = (id, record) => {
    const { actions } = props
    Modal.confirm({
      title: '终止任务',
      content: `确认终止 ${record.companyName} —— “${record.orderName}” 的任务么？`,
      onOk: () => {
        return actions.TPOfflineTask({ id }).then(() => {
          message.success('任务已终止')
          getList({page: { currentPage: 1 }})
        })
      }
    })
  }

  const getList = (params = {}) => {
    let search = {
      page: Object.assign({}, that.current.search.page, params.page),
      form: Object.assign({}, that.current.search.form, params.form)
    }
    setSearching(true)
    that.current.search = search

    props.actions.TPTaskManageList(search).finally(() => {
      setSearching(false)
    })
  }

  const { actions, history, taskPoolData } = props
  const { taskManageList: { keys, source, total, pageNum, pageSize } } = taskPoolData

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

  const columns = getColumns(that.current.search.form.platformId, { offline, online, stop })

  return (
    <div className='task-pool-page-container tasks-page'>
      <Title level={4}>任务管理</Title>
      <Filters search={getList} />
      <Alert style={{ margin: '10px 0' }} message={`共有 ${total} 条记录`} />
      <Table
        locale={{ emptyText: "还没有任务可以展示" }}
        loading={searching}
        dataSource={dataSource}
        pagination={pagination}
        columns={columns}
        scroll={{ x: 1800 }}
      />
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
